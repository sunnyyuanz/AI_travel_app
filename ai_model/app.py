from flask import Flask, request, jsonify
from langchain_openai import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json

# Initialize Flask app
app = Flask(__name__)

load_dotenv()

# Enable CORS
CORS(app)

# Configure LangChain with OpenAI API key
chat_model = ChatOpenAI(
    model="gpt-4",
    temperature=0.7,  # Increased for more creative responses
    openai_api_key=os.getenv("OPENAI_API_KEY")
)

def create_initial_itinerary_structure(origin, days, destinations, budget, currency="USD", groupSize=2, 
                    comfortLevel="moderate", theme="general", additionalInfo=""):
    return {
        "title": f"{days}-Day Trip from {origin} to {destinations}",
        "details": {
            "budget": budget,
            "currency": currency,
            "groupSize": groupSize,
            "comfortLevel": comfortLevel,
            "theme": theme,
            "additionalInfo": additionalInfo
        }
    }

def populate_daily_activities(trip_details):
    """Generate detailed daily activities using the LLM"""
    days = trip_details["details"].get("days", 5)
    prompt = f"""
    Create a detailed day-by-day itinerary for a {days}-day trip:
    - From: {trip_details['details'].get('origin')}
    - To: {trip_details['details'].get('destinations')}
    - Budget: {trip_details['details'].get('budget')} {trip_details['details'].get('currency')}
    - Group Size: {trip_details['details'].get('groupSize')}
    - Comfort Level: {trip_details['details'].get('comfortLevel')}
    - Theme: {trip_details['details'].get('theme')}
    - Additional Info: {trip_details['details'].get('additionalInfo')}

    For each day, provide:
    1. Morning activities
    2. Afternoon activities
    3. Evening activities
    4. Recommended restaurants/meals
    5. Transportation details
    6. Estimated costs

    Return the response as a JSON array where each element has 'day' and 'details' keys.
    """

    messages = [
        SystemMessage(content="You are a knowledgeable travel planner. Create detailed, realistic daily itineraries that fit the budget and preferences specified."),
        HumanMessage(content=prompt)
    ]

    functions = [{
        "name": "create_daily_itinerary",
        "description": "Create detailed daily itinerary",
        "parameters": {
            "type": "object",
            "properties": {
                "itinerary": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "day": {"type": "string"},
                            "details": {
                                "type": "object",
                                "properties": {
                                    "morning": {"type": "string"},
                                    "afternoon": {"type": "string"},
                                    "evening": {"type": "string"},
                                    "meals": {"type": "string"},
                                    "transportation": {"type": "string"},
                                    "estimated_costs": {"type": "string"}
                                }
                            }
                        }
                    }
                }
            },
            "required": ["itinerary"]
        }
    }]

    response = chat_model.invoke(
        messages,
        functions=functions,
        function_call={"name": "create_daily_itinerary"}
    )

    if response.additional_kwargs.get("function_call"):
        print(response)
        function_args = json.loads(response.additional_kwargs["function_call"]["arguments"])
        return function_args["itinerary"]
    
    return []

@app.route("/generate_itinerary", methods=["POST"])
def generate_itinerary():
    try:
        data = request.get_json()
        print("Received data:", data)

        destinations = ";".join(data.get("destinations", [])) if len(data.get("destinations", []))>0 else ""
        # Create initial structure
        trip_details = {
            "details": {
                "origin": data.get("origin", ""),
                "destinations": destinations,
                "budget": data.get("budget", ""),
                "days": int(data.get("days", 5)),
                "currency": data.get("currency", "USD"),
                "groupSize": int(data.get("groupSize", 2)),
                "comfortLevel": data.get("comfortLevel", "moderate"),
                "theme": data.get("theme", "general"),
                "additionalInfo": data.get("additionalInfo", "")
            }
        }

        # Generate initial structure
        itinerary = create_initial_itinerary_structure(
            origin=trip_details["details"]["origin"],
            days=trip_details["details"]["days"],
            destinations=trip_details["details"]["destinations"],
            budget=trip_details["details"]["budget"],
            currency=trip_details["details"]["currency"],
            groupSize=trip_details["details"]["groupSize"],
            comfortLevel=trip_details["details"]["comfortLevel"],
            theme=trip_details["details"]["theme"],
            additionalInfo=trip_details["details"]["additionalInfo"]
        )

        # Populate daily activities
        itinerary["itinerary"] = populate_daily_activities(trip_details)
        
        return jsonify(itinerary)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/update_itinerary", methods=["POST"])
def update_itinerary():
    try:
        data = request.get_json()
        current_itinerary = data.get("current_itinerary", {})
        user_suggestion = data.get("user_suggestion", "")

        prompt = f"""
        Update this itinerary based on the following suggestion: {user_suggestion}
        
        Current itinerary:
        {json.dumps(current_itinerary, indent=2)}
        
        Please maintain the same JSON structure but modify the activities and details according to the suggestion.
        """

        messages = [
            SystemMessage(content="You are a travel assistant. Update the provided itinerary based on user suggestions while maintaining the same structure."),
            HumanMessage(content=prompt)
        ]

        functions = [{
            "name": "update_daily_itinerary",
            "description": "Update the daily itinerary",
            "parameters": {
                "type": "object",
                "properties": {
                    "itinerary": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "day": {"type": "string"},
                                "details": {
                                    "type": "object",
                                    "properties": {
                                        "morning": {"type": "string"},
                                        "afternoon": {"type": "string"},
                                        "evening": {"type": "string"},
                                        "meals": {"type": "string"},
                                        "transportation": {"type": "string"},
                                        "estimated_costs": {"type": "string"}
                                    }
                                }
                            }
                        }
                    }
                },
                "required": ["itinerary"]
            }
        }]

        response = chat_model.invoke(
            messages,
            functions=functions,
            function_call={"name": "update_daily_itinerary"}
        )

        if response.additional_kwargs.get("function_call"):
            function_args = json.loads(response.additional_kwargs["function_call"]["arguments"])
            current_itinerary["itinerary"] = function_args["itinerary"]
            return jsonify(current_itinerary)

        return jsonify({"error": "Failed to update itinerary"}), 400

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)