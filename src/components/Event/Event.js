import { Link } from 'react-router-dom';
import "./Event.scss";

const Event = ({event}) => {
  
  const url = event.attributes.banner.data.attributes.url;

  const formatDate = (date) => {
    var monthNames = [
      "JANUARY", "FEBRUARY", "MARCH",
      "APRIL", "MAY", "JUNE", "JULY",
      "AUGUEST", "SEPTEMBER", "OCTOBER",
      "NOVEMBER", "DECEMBER"
    ]

    var day = date.substring(8, 10);
    var monthIndex = date.substring(5, 7);
    var year = date.substring(0, 4);

    return monthNames[parseInt(monthIndex)] + ' ' +day + ' ' + year;
  }
    return (
      <Link key = {event?.id}>
        <div className='event-item bg-white'>
          {/* <div className='category'>{product?.attributes.product_category}</div> */}
          <div className='event-item-img'>
            <img className='img-cover' src = {url} alt=''/>
          </div>
          <div className='event-item-info fs-14'>

            <div className='brand'>
              <span className='title py-2'>{event.attributes.name}</span>
              <div>
              <i class="fa-solid fa-location-dot fa-xs mx-2"></i>
              <span className='location py-2'>{event.attributes.location}</span>
              </div>
             
            </div>

            <div className='date'>
              <i className='fa-regular fa-calendar-days px-2'></i>
              <span className='date py-4'>{formatDate( event.attributes.date)}</span>
            </div>

          </div>
        </div>
      </Link>
    )
  }
  
  export default Event