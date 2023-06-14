import { useDispatch, useSelector } from 'react-redux';
import './EventPage.scss';
import { fetchAsyncEvents, getAllEvents, getEventsStatus } from '../../store/eventSlice';
import { useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';

const EventPage = () => {
    const dispatch = useDispatch();
    const events = useSelector(getAllEvents);
    const eventsStatus = useSelector(getEventsStatus);
    console.log("events:",events);

    useEffect(() => {
        console.log('inside useEffect');
        dispatch(fetchAsyncEvents());
      }, [dispatch]);

    return (
      <div className='cat-products py-5 bg-white'>
        <div className='container'>
          <div className='cat-products-content'>
            <div className='title-md'>
              {/* <h3>See our <span className='text-capitalize'>{category.replace("-", " ")}</span></h3> */}
              <h2>Events</h2>
            </div>
  
            {
              eventsStatus === STATUS.LOADING ? <Loader /> : <EventList events = {events} />
            }
          </div>
        </div>
      </div>
    )
  }
  
  export default EventPage