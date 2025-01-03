import worldMap from "../assets/world-map.png";
import airplane from "../assets/paper-airplane-thin.svg";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading world-container">
      <img src={worldMap} alt="World Map" className="world-map" />
      <img src={airplane} alt="Airplane" className="airplane" />
      <div className="text-container">
        <p>Generating<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></p>
        <p>Please be patient<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></p>
      </div>
    </div>
  );
};

export default Loading;