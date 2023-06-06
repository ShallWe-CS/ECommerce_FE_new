import { useState } from "react"
import "./DropDown.scss";

const DropDown = ({ selected, setSelected}) => {
    const [ isActive, setIsActive ] = useState(false);
    const options = ["XS", "S", "M","L","XL","XXL"];
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) =>
            setIsActive(!isActive)}>
                Choose Size
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
                        <div
                            onClick={(e) => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className="dropdown-item"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropDown;