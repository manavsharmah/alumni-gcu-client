import React from 'react';
import AlumniAchieversNav from './quicknavs/AlumniAchieversNav';

const NotableAlumni = () => {
  return (
    <div className="container main-header">
      <div className="content-wrapper">
        <div className="content">
          <h2 className='title text-center'>Notable Alumni</h2>
          <div className="card">
            <div className='card-body'>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam earum quisquam voluptatibus alias unde ipsum illo, vitae, accusantium odit perspiciatis distinctio porro veniam exercitationem voluptatum dolorem quibusdam deleniti maiores vero aliquam? Commodi fugiat tempora voluptatem eos maxime nulla iusto amet libero, temporibus possimus praesentium veniam facere repudiandae atque consequatur ullam?</p>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <AlumniAchieversNav />
        </div>
      </div>
    </div>
  );
}

export default NotableAlumni;
