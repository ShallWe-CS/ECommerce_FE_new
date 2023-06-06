import { useState } from "react"
import "./DropDown.scss";

const DropDown = ({ selected, setSelected, title, dropDownItems}) => {
    const [ isActive, setIsActive ] = useState(false);
    const options = dropDownItems;
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) =>
            setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option, i) => (
                        <div key={i}
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