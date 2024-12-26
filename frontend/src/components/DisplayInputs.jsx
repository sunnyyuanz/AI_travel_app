import { useState } from "react";
import './DisplayInputs.css'

const DisplayInputs = ({inputArray}) => {
    const [isHover, setIsHover] = useState("")

    return(
            <ul className="display-inputs">
                {inputArray.map((des,i)=><li key={i}>{des}</li>)}
            </ul>
    )
}


export default DisplayInputs