import React from 'react';
import "./SelectSizeMessage.scss";
import { wrong } from "../../utils/images";

const SelectSizeMessage = () => {
  return (
    <div className='select-size-message text-center'>
      <div className='select-size-message-icon'>
        <img src = {wrong} alt = "" />
      </div>
      <h6 className='text-white fs-14 fw-5'>Please Add the Size from the Size</h6>
    </div>
  )
}

export default SelectSizeMessage