import './SizeGuidePage.scss';

const SizeGuidePage = () => {

    return (
      <div className='cat-products py-5 bg-white'>
        <div className='container'>
          <div className='cat-products-content'>

            <div className='title-md'>
              <h2>Size Guide</h2>
            </div>

            <div className='my-4'>
                <h3 className='my-3'>Picking the perfect size</h3>
                <p>The best way to pick your ideal size would be to compare the measurements given below with a comfortably fitting garment that you currently wear.<br>
                </br>To take the measurement correctly, lay down the garment on a flat surface and measure along the lines shown in the pictures below.</p>
            </div>

            <div>
              <img src='' alt=''/>
            </div>

            <div>
              <h3>T-shirts</h3>
              <table>
                <tr>
                  <th>T-shirt Size</th>
                  <th>Collor (in)</th>
                </tr>
                <tr>
                  <th>S</th>
                  <th>15</th>
                </tr>
                <tr>
                  <th>M</th>
                  <th>15.5</th>
                </tr>
                <tr>
                  <th>L</th>
                  <th>16</th>
                </tr>
                <tr>
                  <th>XL</th>
                  <th>16.5</th>
                </tr>
                <tr>
                  <th>XXL</th>
                  <th>17</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default SizeGuidePage