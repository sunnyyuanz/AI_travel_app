# **AI Travel Agent App Documentation**

## **Url**
http://ufytravelappui.s3-website.us-east-2.amazonaws.com/

## **1. Overview**
The AI Travel Agent App is a full-stack application designed to help users plan and manage travel itineraries using advanced AI technologies. It leverages AI for personalized travel recommendations and integrates user management and data storage features. The app consists of the following components:

- **Frontend**: Built with React, hosted on AWS S3.
- **Backend**: Node.js with MongoDB for user login, registration, and data management, hosted on AWS EC2.
- **AI Model APIs**: Flask-based APIs powered by LangChain and OpenAI, also hosted on AWS EC2.
- **Database**: MongoDB Atlas for secure data storage.

---

## **2. Architecture**

### **High-Level Architecture**
1. **Frontend** (React): Provides the user interface for interacting with the application.
2. **Backend** (Node.js): Manages user authentication, data storage, and communication with the AI Model APIs.
3. **AI Model APIs** (Flask): Generates travel recommendations based on user preferences and input.
4. **Database** (MongoDB Atlas): Stores user data securely in the cloud.

### **Deployment Architecture**
- **Frontend**: Deployed on AWS S3 as a static website.
- **Backend APIs**: Hosted on AWS EC2, accessible via a public IP/domain and running on a secure port.
- **AI Model APIs**: Hosted on a separate AWS EC2 instance to handle AI-related requests.
- **Database**: Hosted on MongoDB Atlas with secure connection strings and role-based access control.

---

## **3. API Documentation**

### **AI Model APIs**
#### **Base URL**: `http://3.145.213.236:5000`

#### **Endpoints**:
1. **POST /generate-itinerary**
   - **Description**: Generates a travel itinerary based on user input.
   - **Request Body**:
     ```json
     {
    "origin": "New York, USA",
    "destinations": [
        "Hawaii"
    ],
    "budget": "3000-4000",
    "currency": "USD",
    "days": "8",
    "groupSize": "2",
    "comfortLevel": "economy",
    "stayPref": "hotel and airbnb mixed"
    }
     ```
   - **Response**:
     ```json
     {
    "details": {
        "StayPref": "hotel and airbnb mixed",
        "additionalInfo": "",
        "budget": "3000-4000",
        "comfortLevel": "economy",
        "currency": "USD",
        "groupSize": 2,
        "theme": "general"
    },
    "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-85jBXjs7DwFrrEMlEu9Y4Iv6/user-lle0OG3tMqb74DW008Gnj48r/img-CxgVhKB7tV4P5TkRbTGcUGvM.png?st=2025-01-14T02%3A05%3A59Z&se=2025-01-14T04%3A05%3A59Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-14T01%3A18%3A32Z&ske=2025-01-15T01%3A18%3A32Z&sks=b&skv=2024-08-04&sig=9ou9H/jru00mqEsFg9W9/7UNYPBV0AAaonhptJB0ql0%3D",
    "itinerary": [
        {
            "day": "Day 1",
            "details": {
                "afternoon": "Visit Waikiki Beach. Walk or take a 10-minute taxi.",
                "estimated_costs": "Stay: $200. Transportation: $50. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at Duke's Waikiki. 5-minute walk from Airbnb.",
                "meals": "Breakfast: Plane meal. Lunch: Local eateries near Airbnb. Dinner: Duke's Waikiki.",
                "morning": "Arrival at Honolulu International Airport. Taxi to Airbnb address in Waikiki (approx. 20 mins). Settle in and relax."
            }
        },
        {
            "day": "Day 2",
            "details": {
                "afternoon": "Visit Honolulu Zoo. 20-minute walk or 5-minute taxi from Airbnb.",
                "estimated_costs": "Stay: $200. Transportation: $30. Meals: $70. Miscellaneous: $20.",
                "evening": "Dinner at Marukame Udon. 10-minute walk from Airbnb.",
                "meals": "Breakfast: Airbnb. Lunch: Local eateries near Diamond Head. Dinner: Marukame Udon.",
                "morning": "Visit Diamond Head. 40-minute walk or 10-minute taxi from Airbnb."
            }
        },
        {
            "day": "Day 3",
            "details": {
                "afternoon": "Visit Hawaii State Art Museum. 10-minute walk from Iolani Palace.",
                "estimated_costs": "Stay: $200. Transportation: $30. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at The Pig and the Lady. 15-minute walk from museum.",
                "meals": "Breakfast: Airbnb. Lunch: Local eateries near Iolani Palace. Dinner: The Pig and the Lady.",
                "morning": "Visit Iolani Palace. 20-minute taxi from Airbnb."
            }
        },
        {
            "day": "Day 4",
            "details": {
                "afternoon": "Relax at resort. Use hotel amenities and explore nearby attractions.",
                "estimated_costs": "Stay: $250. Transportation: $30. Meals: $100. Miscellaneous: $50.",
                "evening": "Dinner at Bali Steak & Seafood in the hotel.",
                "meals": "Breakfast: Airbnb. Lunch: Hotel restaurant. Dinner: Bali Steak & Seafood.",
                "morning": "Check out of Airbnb. Taxi to Hilton Hawaiian Village Waikiki Beach Resort (approx. 15 mins)."
            }
        },
        {
            "day": "Day 5",
            "details": {
                "afternoon": "Visit Pacific Aviation Museum. 10-minute walk from Pearl Harbor.",
                "estimated_costs": "Stay: $250. Transportation: $60. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at Restaurant 604. 5-minute taxi from museum.",
                "meals": "Breakfast: Hotel. Lunch: Local eateries near Pearl Harbor. Dinner: Restaurant 604.",
                "morning": "Visit Pearl Harbor. 30-minute taxi from hotel."
            }
        },
        {
            "day": "Day 6",
            "details": {
                "afternoon": "Visit Koko Crater Trail. 10-minute taxi from Hanauma Bay.",
                "estimated_costs": "Stay: $250. Transportation: $70. Meals: $90. Miscellaneous: $20.",
                "evening": "Dinner at Kona Brewing Company. 15-minute taxi from Koko Crater Trail.",
                "meals": "Breakfast: Hotel. Lunch: Local eateries near Hanauma Bay. Dinner: Kona Brewing Company.",
                "morning": "Visit Hanauma Bay. 30-minute taxi from hotel."
            }
        },
        {
            "day": "Day 7",
            "details": {
                "afternoon": "Visit Waikiki Aquarium. 15-minute walk or 5-minute taxi from hotel.",
                "estimated_costs": "Stay: $250. Transportation: $20. Meals: $100. Miscellaneous: $50.",
                "evening": "Dinner at Arancino di Mare in the hotel.",
                "meals": "Breakfast: Hotel. Lunch: Hotel restaurant. Dinner: Arancino di Mare.",
                "morning": "Relax at hotel. Use hotel amenities and explore nearby attractions."
            }
        },
        {
            "day": "Day 8",
            "details": {
                "afternoon": "",
                "estimated_costs": "Stay: $0. Transportation: $40. Meals: $20. Miscellaneous: $10.",
                "evening": "",
                "meals": "Breakfast: Hotel. Lunch: Plane meal.",
                "morning": "Check out of hotel. Taxi to Honolulu International Airport (approx. 20 mins). Return home."
            }
        }
    ],
    "itinerary_costs": {
        "total_meal_costs": "$620",
        "total_miscellaneous_costs": "$210",
        "total_stay_costs": "$1600",
        "total_transportation_costs": "$360",
        "total_trip_cost": "$2790"
    },
    "title": "8-Day Trip from New York, USA to Hawaii"
    }
     ```

2. **POST /update-itinerary**
   - **Description**: Handles update itinerary with user suggestions
   - **Request Body**:
     ```json
     {
   "current_itinerary":{
    "itinerary": [
        {
            "day": "Day 1",
            "details": {
                "afternoon": "Visit Waikiki Beach. Walk or take a 10-minute taxi.",
                "estimated_costs": "Stay: $200. Transportation: $50. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at Duke's Waikiki. 5-minute walk from Airbnb.",
                "meals": "Breakfast: Plane meal. Lunch: Local eateries near Airbnb. Dinner: Duke's Waikiki.",
                "morning": "Arrival at Honolulu International Airport. Taxi to Airbnb address in Waikiki (approx. 20 mins). Settle in and relax."
            }
        },
        {
            "day": "Day 2",
            "details": {
                "afternoon": "Visit Honolulu Zoo. 20-minute walk or 5-minute taxi from Airbnb.",
                "estimated_costs": "Stay: $200. Transportation: $30. Meals: $70. Miscellaneous: $20.",
                "evening": "Dinner at Marukame Udon. 10-minute walk from Airbnb.",
                "meals": "Breakfast: Airbnb. Lunch: Local eateries near Diamond Head. Dinner: Marukame Udon.",
                "morning": "Visit Diamond Head. 40-minute walk or 10-minute taxi from Airbnb."
            }
        },
        {
            "day": "Day 3",
            "details": {
                "afternoon": "Visit Hawaii State Art Museum. 10-minute walk from Iolani Palace.",
                "estimated_costs": "Stay: $200. Transportation: $30. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at The Pig and the Lady. 15-minute walk from museum.",
                "meals": "Breakfast: Airbnb. Lunch: Local eateries near Iolani Palace. Dinner: The Pig and the Lady.",
                "morning": "Visit Iolani Palace. 20-minute taxi from Airbnb."
            }
        },
        {
            "day": "Day 4",
            "details": {
                "afternoon": "Relax at resort. Use hotel amenities and explore nearby attractions.",
                "estimated_costs": "Stay: $250. Transportation: $30. Meals: $100. Miscellaneous: $50.",
                "evening": "Dinner at Bali Steak & Seafood in the hotel.",
                "meals": "Breakfast: Airbnb. Lunch: Hotel restaurant. Dinner: Bali Steak & Seafood.",
                "morning": "Check out of Airbnb. Taxi to Hilton Hawaiian Village Waikiki Beach Resort (approx. 15 mins)."
            }
        },
        {
            "day": "Day 5",
            "details": {
                "afternoon": "Visit Pacific Aviation Museum. 10-minute walk from Pearl Harbor.",
                "estimated_costs": "Stay: $250. Transportation: $60. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at Restaurant 604. 5-minute taxi from museum.",
                "meals": "Breakfast: Hotel. Lunch: Local eateries near Pearl Harbor. Dinner: Restaurant 604.",
                "morning": "Visit Pearl Harbor. 30-minute taxi from hotel."
            }
        },
        {
            "day": "Day 6",
            "details": {
                "afternoon": "Visit Koko Crater Trail. 10-minute taxi from Hanauma Bay.",
                "estimated_costs": "Stay: $250. Transportation: $70. Meals: $90. Miscellaneous: $20.",
                "evening": "Dinner at Kona Brewing Company. 15-minute taxi from Koko Crater Trail.",
                "meals": "Breakfast: Hotel. Lunch: Local eateries near Hanauma Bay. Dinner: Kona Brewing Company.",
                "morning": "Visit Hanauma Bay. 30-minute taxi from hotel."
            }
        },
        {
            "day": "Day 7",
            "details": {
                "afternoon": "Visit Waikiki Aquarium. 15-minute walk or 5-minute taxi from hotel.",
                "estimated_costs": "Stay: $250. Transportation: $20. Meals: $100. Miscellaneous: $50.",
                "evening": "Dinner at Arancino di Mare in the hotel.",
                "meals": "Breakfast: Hotel. Lunch: Hotel restaurant. Dinner: Arancino di Mare.",
                "morning": "Relax at hotel. Use hotel amenities and explore nearby attractions."
            }
        },
        {
            "day": "Day 8",
            "details": {
                "afternoon": "",
                "estimated_costs": "Stay: $0. Transportation: $40. Meals: $20. Miscellaneous: $10.",
                "evening": "",
                "meals": "Breakfast: Hotel. Lunch: Plane meal.",
                "morning": "Check out of hotel. Taxi to Honolulu International Airport (approx. 20 mins). Return home."
            }
        }
    ],
    "title": "8-Day Trip from New York, USA to Hawaii"
        },
    "user_suggestion":"update the trip to 7 days instead of 8 days"
    }
     ```
   - **Response**:
     ```json
     {
    "itinerary": [
        {
            "day": "Day 1",
            "details": {
                "afternoon": "Visit Waikiki Beach. Walk or take a 10-minute taxi.",
                "estimated_costs": "Stay: $200. Transportation: $50. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at Duke's Waikiki. 5-minute walk from Airbnb.",
                "meals": "Breakfast: Plane meal. Lunch: Local eateries near Airbnb. Dinner: Duke's Waikiki.",
                "morning": "Arrival at Honolulu International Airport. Taxi to Airbnb address in Waikiki (approx. 20 mins). Settle in and relax."
            }
        },
        {
            "day": "Day 2",
            "details": {
                "afternoon": "Visit Honolulu Zoo. 20-minute walk or 5-minute taxi from Airbnb.",
                "estimated_costs": "Stay: $200. Transportation: $30. Meals: $70. Miscellaneous: $20.",
                "evening": "Dinner at Marukame Udon. 10-minute walk from Airbnb.",
                "meals": "Breakfast: Airbnb. Lunch: Local eateries near Diamond Head. Dinner: Marukame Udon.",
                "morning": "Visit Diamond Head. 40-minute walk or 10-minute taxi from Airbnb."
            }
        },
        {
            "day": "Day 3",
            "details": {
                "afternoon": "Visit Hawaii State Art Museum. 10-minute walk from Iolani Palace.",
                "estimated_costs": "Stay: $200. Transportation: $30. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at The Pig and the Lady. 15-minute walk from museum.",
                "meals": "Breakfast: Airbnb. Lunch: Local eateries near Iolani Palace. Dinner: The Pig and the Lady.",
                "morning": "Visit Iolani Palace. 20-minute taxi from Airbnb."
            }
        },
        {
            "day": "Day 4",
            "details": {
                "afternoon": "Visit Pacific Aviation Museum. 10-minute walk from Pearl Harbor.",
                "estimated_costs": "Stay: $250. Transportation: $60. Meals: $80. Miscellaneous: $20.",
                "evening": "Dinner at Restaurant 604. 5-minute taxi from museum.",
                "meals": "Breakfast: Hotel. Lunch: Local eateries near Pearl Harbor. Dinner: Restaurant 604.",
                "morning": "Visit Pearl Harbor. 30-minute taxi from hotel."
            }
        },
        {
            "day": "Day 5",
            "details": {
                "afternoon": "Visit Koko Crater Trail. 10-minute taxi from Hanauma Bay.",
                "estimated_costs": "Stay: $250. Transportation: $70. Meals: $90. Miscellaneous: $20.",
                "evening": "Dinner at Kona Brewing Company. 15-minute taxi from Koko Crater Trail.",
                "meals": "Breakfast: Hotel. Lunch: Local eateries near Hanauma Bay. Dinner: Kona Brewing Company.",
                "morning": "Visit Hanauma Bay. 30-minute taxi from hotel."
            }
        },
        {
            "day": "Day 6",
            "details": {
                "afternoon": "Visit Waikiki Aquarium. 15-minute walk or 5-minute taxi from hotel.",
                "estimated_costs": "Stay: $250. Transportation: $20. Meals: $100. Miscellaneous: $50.",
                "evening": "Dinner at Arancino di Mare in the hotel.",
                "meals": "Breakfast: Hotel. Lunch: Hotel restaurant. Dinner: Arancino di Mare.",
                "morning": "Relax at hotel. Use hotel amenities and explore nearby attractions."
            }
        },
        {
            "day": "Day 7",
            "details": {
                "afternoon": "",
                "estimated_costs": "Stay: $0. Transportation: $40. Meals: $20. Miscellaneous: $10.",
                "evening": "",
                "meals": "Breakfast: Hotel. Lunch: Plane meal.",
                "morning": "Check out of hotel. Taxi to Honolulu International Airport (approx. 20 mins). Return home."
            }
        }
    ],
    "itinerary_costs": {
        "total_meal_costs": "$520",
        "total_miscellaneous_costs": "$150",
        "total_stay_costs": "$1350",
        "total_transportation_costs": "$300",
        "total_trip_cost": "$2320"
    },
    "title": "7-Day Trip from New York, USA to Hawaii"
    }
     ```

### **Backend APIs**
#### **Base URL**: `http://3.144.28.53:4000`

#### **Endpoints**:
1. **POST /register**
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "username": "string",
     }
     ```
   - **Response**:
     ```json
     {
    "username": "luckymani",
    "_id": "6785da1a46454e30e247dd06",
    "createdAt": "2025-01-14T03:29:30.543Z",
    "updatedAt": "2025-01-14T03:29:30.543Z",
    "__v": 0
    }
     ```

2. **POST /login**
   - **Description**: Authenticates a user.
   - **Request Body**:
     ```json
     {
       "username": "string",
     }
     ```
   - **Response**:
     ```json
     {
    "message": "Login successful!",
    "_id": "6785da1a46454e30e247dd06"
    }
     ```
---

## **4. Database Design**

### **Collections**

1. **Users**
   - **Fields**:
     ```json
     {
       "_id": "ObjectId",
       "username": "string",
        "createdAt": "date",
        "updatedAt": "date",
     }
     ```

2. **TravelData**
   - **Fields**:
     ```json
     {
       "_id": "ObjectId",
            "origin":"string",
    "destinations": "string",
    "budget":"string",
    "currency":"string",
    "days":"number",
    "groupSize":"number",
    "comfortLevel":"string",
    "stayPref":"string",
    "theme":"string",
    "additionalInfo":"string",
     }
     ```

---

## **5. User Manual**

### **Getting Started**

1. **Sign Up**:
   - Navigate to the homepage and click "Sign Up."
   - Enter your username.

2. **Log In**:
   - Enter your username on the login page.
   - Click "Log In" to access your dashboard.

3. **Plan a Trip**:
   - Enter your travel destination, dates, and preferences.
   - Submit the form to generate a custom itinerary.

4. **Chat with the AI**:
   - Use the chat interface to make suggestions to the itinerary.

---

### **For Users**
1. Visit the app URL.
2. Follow the steps in the user manual to start using the app.