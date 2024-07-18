// import React from 'react';
// import '../pages.css';
// import MoreNav from './quicknavs/MoreNav';

// const Gallery = () => {
//   return (
//     <div className="container" >
//     <div className='row justify-content-center'>
//     <div className='col-md-6 col-10'>
//         <h2 className='title'>Gallery</h2>
//         <div class="card">
//             <div className='card-body'>
//             {/* <h2 className='card-title text-center'>Top Alumni in the Lime Light</h2> */}
//             <div>
//                 <img src="./assets/gcu-building.jpg" alt="photo" className='image'/>
//                 <img src="./assets/gcu-building.jpg" alt="photo1" className='image'/>
//                 <img src="./assets/gcu-building.jpg" alt="photo2" className='image'/>
//             </div>
                
//         </div>
//         </div>
//     </div>
//     <MoreNav />
// </div>
// </div>
// )
// }

// export default Gallery;


import React from 'react';
import '../pages.css';
import MoreNav from './quicknavs/MoreNav';

const NotableAlumni = () => {
  return (
    <div className="container main-header">
      <div className="content-wrapper">
        <div className="content">
          <h2 className='title text-center'>Gallery</h2>
          <div className="card">
            <div className='card-body'>
            <div>
                 <img src="./assets/gcu-building.jpg" alt="photo" className='image'/>
                 <img src="./assets/gcu-building.jpg" alt="photo1" className='image'/>
                <img src="./assets/gcu-building.jpg" alt="photo2" className='image'/>
             </div>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <MoreNav />
        </div>
      </div>
    </div>
  );
}

export default NotableAlumni;


