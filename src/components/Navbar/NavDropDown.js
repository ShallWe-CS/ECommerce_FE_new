import { useState } from "react";
import { Link } from "react-router-dom";
import './NavDropDown.scss';

const NavDropDown = () => {

    const [dropdown, setDropDown] = useState(false);

  return (
    <>
      <ul className="nav-dropdown" onClick={() => setDropDown(!dropdown)}>
        <li className="nav-dropdown item">
          <Link to={`category/Shirt`}>
            {<h2>Shirts</h2>}
          </Link>
        </li>
        <li className="nav-dropdown item">
          <Link to={`category/Tshirt`}>
            {<h2>T-Shirts</h2>}
          </Link>
        </li>
        <li className="nav-dropdown item">
          <Link to={`category/Oversize`} >
            {<h2>OverSize</h2>}
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavDropDown;
