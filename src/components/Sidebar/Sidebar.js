import React, { useEffect, useRef } from 'react';
import "./Sidebar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';

const Sidebar = () => {

  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);

  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dispatch]);

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      dispatch(setSidebarOff());
    }
  };

  return (
    <aside 
    ref = {sidebarRef}
    className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type="button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
          {/* {
            categories.map((category, idx) => {
              return (
                <li key = {idx} onClick = {() => dispatch(setSidebarOff())}>
                  <Link to = {`category/${category}`} className='cat-list-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              )
            })
          } */}
          <li className='nav-item no-wrap'>
            <Link to = {`category/Shirt`}  className='nav-link text-capitalize' onClick={() => dispatch(setSidebarOff())}>{<h4>Shirts</h4>}</Link>
          </li>
          <li className='nav-item no-wrap'>
            <Link to = {`category/Tshirt`} className='nav-link text-capitalize' onClick={() => dispatch(setSidebarOff())}>{<h4>T-Shirts</h4>}</Link>
          </li>
          <li className='nav-item no-wrap'>
            <Link to = {`category/Oversize`} className='nav-link text-capitalize' onClick={() => dispatch(setSidebarOff())}>{<h4>OverSize</h4>}</Link>
          </li>
          <li className='nav-item no-wrap'>
            <Link Link to = {`/event`} className='nav-link text-capitalize' onClick={() => dispatch(setSidebarOff())}>{<h4>Events</h4>}</Link>
          </li>
          <li className='nav-item no-wrap'>
           <Link className='nav-link text-capitalize' onClick={() => dispatch(setSidebarOff())}>{<h4>Sales</h4>}</Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar