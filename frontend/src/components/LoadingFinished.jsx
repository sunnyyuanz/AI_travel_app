
import pin from "../assets/pin.svg";
import "./LoadingFinished.scss";

const LoadingFinished = ({setLoadingFinished, image}) => {

    const destinationImg = JSON.parse(localStorage.getItem('image')) || image
    
    const onEnterClicked = () => setLoadingFinished(true)

    return(
        <div className="loading-finished" onClick={onEnterClicked}>
            <img  className="pin" src={pin} alt="pin"/>
            <img  className="destination-img" src={destinationImg} alt="first destination"/>
            <p>Click Anywhere To Begin</p>
        </div>
    )
}

export default LoadingFinished