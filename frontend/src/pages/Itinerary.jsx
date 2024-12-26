import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the state passed from the previous page
  const req = location.state?.tripRequest || {};

  // State to manage loading and response data
  const [isLoading, setIsLoading] = useState(true);
  const [itinerary, setItinerary] = useState([]);
  const [error, setError] = useState(null);
  const [userSuggestion, setUserSuggestion] = useState("");
  const [updatedItinerary, setUpdatedItinerary] = useState("");

  useEffect(() => {
    // Call the API on page load
    const fetchItinerary = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/generate_itinerary', req);
        if (response.status === 200 || response.status === 201) {
          setItinerary(response.data.itinerary.split("\n\n")); // Save the response data
        } else {
          setError("Failed to generate itinerary. Please try again.");
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      } finally {
        setIsLoading(false); // Stop the loader
      }
    };

    fetchItinerary();
  }, [req]);

  // Navigate back if req is empty
  if (!req || Object.keys(req).length === 0) {
    return <p>No trip request data found. Please go back and try again.</p>;
  }

  // Update itinerary function
  const updateItinerary = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:5000/update_itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_itinerary: itinerary,
          user_suggestion: userSuggestion,
        }),
      });

      const data = await response.json();
      if (data.updated_itinerary) {
        setUpdatedItinerary(data.updated_itinerary);
        setUserSuggestion("")
      } else {
        alert("Failed to update itinerary: " + data.error);
      }
    } catch (error) {
      console.error("Error updating itinerary:", error);
      alert("Error updating itinerary. Please try again.");
    }finally {
        setIsLoading(false); // Stop the loader
    }
  };

  useEffect(()=>{
    if(updatedItinerary.length>0){
        setItinerary(updatedItinerary)
        alert("Your Itinerary Is Updated Based On Your Suggestions!")
    }
    
  },[updatedItinerary])

  const onSaveClick = () =>{
    console.log("Itinerary Saved!")
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader">Loading...</div> // Simple loader
      ) : error ? (
        <div className="error-message">{error}</div> // Error message
      ) : (
        <div className="itinerary-container">
          <h1>Preview your journey</h1>
          {itinerary}
          <h2>Travel Itinerary Chatbot</h2>
          {itinerary && (
            <div style={{ marginTop: "20px" }}>
            <textarea
                value={userSuggestion}
                onChange={(e) => setUserSuggestion(e.target.value)}
                placeholder="Let me know if you have any suggestions to this itinerary..."
                style={{ width: "100%", height: "100px", marginBottom: "10px" }}
            ></textarea>
            <button onClick={updateItinerary}>
                Update Itinerary
            </button>
            <button onClick={onSaveClick} className="save-btn" style={{ marginLeft:"1rem", color:"#ff6701"}}>Looks good, Save it!</button>
            </div>
        )}
        <button onClick={() => navigate("/")} className="go-back-btn">Go Back</button>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
