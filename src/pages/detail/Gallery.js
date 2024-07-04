import React from 'react';
import '../pages.css';

const Gallery = () => {
  return (
    <div className="container" >
    <div className='row justify-content-center'>
    <div className='col-md-6 col-10'>
        <h2 className='title'>Gallery</h2>
        <div class="card">
            <div className='card-body'>
            {/* <h2 className='card-title text-center'>Top Alumni in the Lime Light</h2> */}
            <div>
                <img src="./assets/gcu-building.jpg" alt="photo" className='image'/>
                <img src="./assets/gcu-building.jpg" alt="photo1" className='image'/>
                <img src="./assets/gcu-building.jpg" alt="photo2" className='image'/>
            </div>
                
        </div>
        </div>
    </div>
</div>
</div>
)
}

export default Gallery;