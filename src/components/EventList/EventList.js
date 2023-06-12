import Event from '../Event/Event';
import './EventList.scss';

const EventList = ({events}) => {
    return (
      <div className='event-lists grid bg-whitesmoke my-3'>
        {
          events.map(event => {
            // let discountedPrice = (product.attributes.price) - (product.attributes.price * (product.attributes.discount / 100));
            return (
              <Event key = {event.id} event = {{...event}} />
            )
          })
        }
      </div>
    )
  }
  
  export default EventList