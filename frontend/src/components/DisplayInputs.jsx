import { useState } from "react";
import './DisplayInputs.scss'

const DisplayInputs = ({inputArray, onDeleteClick}) => {
    const [isHover, setIsHover] = useState("")

    return(
            <ul className="display-inputs">
                {inputArray.map((des,i)=><li key={i} onMouseEnter={()=>setIsHover(i)} onMouseLeave={()=>setIsHover("")} onClick={()=> onDeleteClick(des, inputArray)}>{des}<div style={{display: i === isHover ? "block":"none"}}>x</div></li>)}
            </ul>
    )
}


export default DisplayInputs