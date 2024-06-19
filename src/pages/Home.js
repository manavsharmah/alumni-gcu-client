import React from 'react';
import './pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className='main'>
        <section className="hero">
          <div className="left-box">
            <h2>Welcome to the GCU Alumni Association</h2>
            <p>A registered body of the Alumni members of the Girijananda Choudhury University where you can connect with fellow members and alumnis</p>
            <br />
            <a href="/register">
              <button className="button">REGISTER</button>
            </a>
            
          </div>
          <div className="right-box">
            <img src="./assets/gcu-building.jpg" alt="GCU Campus" />
          </div>
        </section>
        {/* <section className='hero2'>
          <div className='vc-text'>
            <h2>Message from the Vice Chancellor</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sint animi placeat dolorum dolores iure molestiae? Asperiores, ea.</p>
          </div>
          <div className='vc-image'>
            <img src="./assets/vc-gcu.jpg" alt="Vice Chancellor" className='vc-img'/>
          </div>
          
        </section> */}
    </div>
  )
}

export default Home;