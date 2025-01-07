import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingFinished from "../components/LoadingFinished";
import Loading from "../components/Loading";
import axios from "axios";
import './itinerary.scss';
import Navbar from "../components/Navbar";

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the state passed from the previous page
  const req = location.state?.tripRequest || {};

  // Check if an itinerary has already been generated
  const generatedItinerary = JSON.parse(localStorage.getItem("itinerary")) || null
  const generatedTitle = JSON.parse(localStorage.getItem("title")) || null
  const generatedTotalCosts = JSON.parse(localStorage.getItem("total_costs")) || null

  // State to manage loading and response data
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFinished,setLoadingFinished] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [error, setError] = useState(null);
  const [userSuggestion, setUserSuggestion] = useState("");
  const [updatedItinerary, setUpdatedItinerary] = useState("");
  const [showDayCosts, setShowDayCosts] = useState(null);
  const [title, setTitle] = useState("")
  const [totalCosts, setTotalCosts] = useState({});
  const [image, setImage] =useState("");

  useEffect(() => {
    // Call the API on page load
    if(generatedItinerary && generatedTitle && generatedTotalCosts){
      setItinerary(generatedItinerary)
      setTitle(generatedTitle)
      setTotalCosts(generatedTotalCosts)
      setIsLoading(false)
    }else{
      const fetchItinerary = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:5000/generate_itinerary', req);
          if (response.status === 200 || response.status === 201) {
            setItinerary(response.data.itinerary); // Save the response data
            setTitle(response.data.title);
            setTotalCosts(response.data.itinerary_costs);
            setImage(response.data.image);
            localStorage.setItem("itinerary", JSON.stringify(response.data.itinerary) )
            localStorage.setItem("title", JSON.stringify(response.data.title) )
            localStorage.setItem("total_costs", JSON.stringify(response.data.itinerary_costs) )
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
    }
    
  }, [req]);

  // Navigate back if req is empty
  if (!req || Object.keys(req).length === 0) {
    return <p>No trip request data found. Please go back and try again.</p>;
  }

  // Update itinerary function
  const updateItinerary = async () => {

    if(userSuggestion.length>0){
      setIsLoading(true)
      try {
        const response = await axios.post("http://127.0.0.1:5000/update_itinerary", {
            current_itinerary: {itinerary,title},
            user_suggestion: userSuggestion,});
  
        if (response.data.itinerary) {
          console.log(response.data.itinerary)
          setUpdatedItinerary(response.data.itinerary);
          setTitle(response.data.title)
          setTotalCosts(response.data.itinerary_costs)
          setUserSuggestion("")
        } else {
          alert("Failed to update itinerary: " + response.error);
        }
      } catch (error) {
        console.error("Error updating itinerary:", error);
        alert("Error updating itinerary. Please try again.");
      }finally {
          setIsLoading(false); // Stop the loader
      }
    }else{
      alert("Sorry, we are unable to update the itinerary if you don't provide us some suggestion")
    }
   
  };

  useEffect(()=>{
    if(updatedItinerary.length>0){
        setItinerary(updatedItinerary)
        localStorage.setItem('itinerary', JSON.stringify(updatedItinerary))
        localStorage.setItem('title', JSON.stringify(title))
        localStorage.setItem('total_costs', JSON.stringify(totalCosts))
        alert("Your Itinerary Is Updated Based On Your Suggestions!")
    }
    
  },[updatedItinerary])

  const onSaveClick = async () => {
    const id = localStorage.getItem("_id")

    if(id && id.length>0){

      console.log(image)
      try {
        const response = await axios.post("http://127.0.0.1:5001/api/itinerary/save-itinerary", {
          itinerary,
          userId: id,
          itinerary_costs: totalCosts,
          title,
        });
        if (response.status === 200 || response.status === 201) {
          alert("Itinerary is saved!")
        } else {
          setError("Failed to save itinerary. Please try again.");
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      }
      
    }

  }

  const onDayCostToggle = (id) =>{
    if(!showDayCosts || showDayCosts !== id){
      setShowDayCosts(id)
    }else{
      setShowDayCosts(null)
    }
  }

  const onBackBtnClicked = () =>{
    localStorage.getItem('itinerary') && localStorage.removeItem('itinerary')
    localStorage.getItem('title') && localStorage.removeItem('title')
    localStorage.getItem('total_costs') && localStorage.removeItem('total_costs')
    navigate('/')
  }

  return (
    <div className="content-page">
        <Navbar />
      <div>
      {isLoading ? <Loading /> : (
        !loadingFinished && image.length>1 ? <LoadingFinished setLoadingFinished = {setLoadingFinished} image={image}/> :
        <div className="itinerary-container">
          {title && <h1>{title}</h1>}
          {itinerary && itinerary.map((dayDetails, id)=>(
            <div key={`day${id+1}`} className="day-details">
            <h3>{dayDetails.day}</h3>
            {dayDetails.details.morning.length>0 && <dl>
              <dt>🌤</dt>
              <dd>{dayDetails.details.morning}</dd>
            </dl>}
            {dayDetails.details.afternoon.length>0 && <dl>
              <dt>🌞</dt>
              <dd>{dayDetails.details.afternoon}</dd>
            </dl>}
            {dayDetails.details.evening.length>0 && <dl>
              <dt>🌙</dt>
              <dd>{dayDetails.details.evening}</dd>
            </dl>
            }
            {dayDetails.details.meals.length>0 && 
            <dl>
              <dt>🍽</dt>
              <dd>{dayDetails.details.meals}</dd>
            </dl>
            }
            <button onClick={() => onDayCostToggle(id)}>Show Estimated Daily Costs</button>
            {showDayCosts === id && <p>{dayDetails.details.estimated_costs}</p>} 
            </div>
          ))}
          {totalCosts && <div className="total-costs-container">
              <h3>Trip Total Costs Breakdown</h3>
              <dl>
                <dt>Meal Costs:</dt>
                <dd>{totalCosts.total_meal_costs}</dd>
              </dl>
              <dl>
                <dt>Stay Costs:</dt>
                <dd>{totalCosts.total_stay_costs}</dd>
              </dl>
              <dl>
                <dt>Transportation Costs:</dt>
                <dd>{totalCosts.total_transportation_costs}</dd>
              </dl>
              <dl>
                <dt>Miscellaneous Costs:</dt>
                <dd>{totalCosts.total_miscellaneous_costs}</dd>
              </dl>
              <hr/>
              <div className="total-costs">              
                <h4>Total Trip Costs</h4>
                <p>{totalCosts.total_trip_cost}</p>
              </div>

            </div>}
          <h2>Travel Itinerary Chatbot</h2>
          {itinerary && (
            <div style={{ marginTop: "20px" }}>
            <textarea
                value={userSuggestion}
                onChange={(e) => setUserSuggestion(e.target.value)}
                placeholder="Tell us how to make your journey even better..."
                style={{ width: "100%", height: "100px", marginBottom: "10px" }}
            ></textarea>
            <button onClick={updateItinerary}>
                Update Itinerary
            </button>
            <button onClick={onSaveClick} className="save-btn" style={{ marginLeft:"1rem", color:"#ff6701"}}>Looks good, Save it!</button>
            </div>
        )}
        <button onClick={onBackBtnClicked} className="go-back-btn">Go Back</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Itinerary;
