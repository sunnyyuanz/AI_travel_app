import React,{useState, useEffect} from "react";
import './TravelPreference.scss'
import DisplayInputs from "../components/DisplayInputs";
import { useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const TravelPreference = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [days, setDays] = useState(0);
    const [groupSize, setGroupSize] = useState(0);
    const [budget, setBudget] = useState('');
    const [theme, setTheme] = useState(false);
    const [themeName, setThemeName] = useState('');
    const [comfortLevel, setComfortLevel] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate()
    

    const preventDefault = (e) =>{
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(() => {
        console.log("Updated destinations:", destinations.length);
      }, [destinations]);


    const OnSubmitClick = async (e) => {
        preventDefault(e)
        const auth = localStorage.getItem('_id');

        if(auth && auth.length>0){
            const req = {
                origin,
                destinations,
                budget,
                currency,
                days,
                groupSize,
                comfortLevel,
            }
    
            if(theme)req.theme = themeName;
            if(additionalInfo.length>0) req.additionalInfo = additionalInfo;
            if(req.destinations.length<1){
                setError("At least one destination is required!")
            }else{
                console.log(req)
               navigate("/itinerary-generating", {state:{tripRequest:req}})
            }
        }else{
            alert("Please sign in!")
        }
        
    }

    return(
        <div className="content-page">
        <Navbar />
        <div className="travel-preference wrapper">
            <h1>We are ready for your trip!</h1>
            <form>
                <div className="form-left">
                    <div className="field-container">                
                    <label htmlFor="origin">Origin</label>
                    <input type="text" name="origin" id="origin" placeholder="city,state,country" value={origin} onChange={(e)=>setOrigin(e.target.value)} required/>
                    </div>
                    <div className="field-container">                
                        <label htmlFor="destinations">Where do you want to go?</label>
                        {destinations.length>0 && <DisplayInputs inputArray={destinations}/>}
                        <input type="text" name="destinations" id="destinations" placeholder="city/state,country" value={destination} onChange={(e)=>setDestination(e.target.value)} required/>
                        <button onClick={(e)=>{
                            preventDefault(e);
                            setDestinations([...destinations,destination])
                            setDestination('')
                        }}>Add</button>
                            </div>
                    <fieldset>
                    <legend>Budget</legend>
                    <label id="currency">
                        <input type="radio" name="currency" value="USD" id="currency" onChange={()=>setCurrency('USD')} required/> USD
                        <input type="radio" name="currency" value="Local Currency" id="currency" onChange={()=>setCurrency('Local Currency')}/> Local Currency
                    </label>
                    <select
                        name="budget"
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)} // Update the state when an option is selected
                    required>
                        <option value="" disabled>
                        Select Budget
                        </option>
                        <option value="no cost">No Cost</option>
                        <option value="500-1000">500-1000</option>
                        <option value="1000-2000">1000-2000</option>
                        <option value="2000-3000">2000-3000</option>
                        <option value="3000-4000">3000-4000</option>
                        <option value="4000-5000">4000-5000</option>
                        <option value="5000-10000">5000-10000</option>
                        <option value="10000-20000">10000-20000</option>
                        <option value="no max">No Max</option>
                    </select>
                    </fieldset>
                </div>
                <div className="form-right">
                <div className="field-container">
                    <label htmlFor="comfortLevel">Comfort Level</label>
                    <select
                        name="comfortLevel"
                        id="comfortLevel"
                        value={comfortLevel}
                        onChange={(e) => setComfortLevel(e.target.value)} // Update the state when an option is selected
                    required>
                        <option value="" disabled>
                        Select Comfort Level
                        </option>
                        <option value="economy">Economy</option>
                        <option value="comfort">comfort</option>
                        <option value="luxury">luxury</option>
                        <option value="base on my budget">base on my budget</option>
                    </select>
                    </div>
                <div className="field-container">
                    <label htmlFor="groupSize">Travel group size</label>
                    <input type="number" name="groupSize" id="groupSize" value={groupSize} onChange={(e)=>setGroupSize(e.target.value)} required/>
                    </div>
                <div className="field-container">  
                    <label htmlFor="days">How many days are you planning?</label>
                    <input type="number" name="days" id="days" value={days} onChange={(e)=>setDays(e.target.value)} required/>
                    </div>
                    <fieldset>
                    <legend>Is there a theme for this trip?</legend>
                    <label id="theme">
                        <input type="radio" name="theme" value="yes" id="theme" onChange={()=>setTheme(true)} required/> Yes
                        <input type="radio" name="theme" value="no" id="theme" onChange={()=>setTheme(false)}/> No
                    </label>
                    {theme && <textarea name="theme" id="theme" value={themeName} onChange={(e)=>setThemeName(e.target.value)} required></textarea>}
                    </fieldset>
                </div>
                <div className="form-bottom">
                    <div className="field-container">
                        <label htmlFor="additionalInfo">Additional Info(Optional)</label>
                        <textarea type="text" name="additionalInfo" id="additionalInfo" value={additionalInfo} onChange={(e)=>setAdditionalInfo(e.target.value)}/>
                    </div>
                    {error && <p>{error}</p>}
                    <button className="starts-btn" type="submit" onClick={(e)=>OnSubmitClick(e)}>Your Journey Starts Here</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default TravelPreference