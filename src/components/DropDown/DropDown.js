import { useState, useRef, useEffect } from "react"
import "./DropDown.scss";



const DropDown = ({ selected, setSelected, title, dropDownItems}) => {
    const [ isActive, setIsActive ] = useState(false);
    // const [ open, setIsOpen ] = useState(false);
    const menuRef = useRef();
    const btnRef = useRef();
    // useEffect(() => {
    //     document.addEventListener("mousedown", (event) => {
    //         if(!menuRef.current.contains(event.target))
    //         {
    //             setIsActive(false);
    //         }
    //     })
    // })

    window.addEventListener("click",  (e) => {
        if (e.target !== menuRef.current && e.target !== btnRef.current) {
            setIsActive(false);
        }
    })
    
    const options = dropDownItems;
    
    
    return (
        <div className="dropdown">
            <div ref={btnRef} className="dropdown-btn" onClick={(e) =>
            setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div ref={menuRef} className="dropdown-content">
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