import React from 'react';
import CardCarousel from '../../components/common/CardCarousel';

const Scholarship = () => {

  const cards = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1732736768075-4738ba4ccf1a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      badge: 'Mountain',
      title: 'An image slider is a web element that displays multiple images in a rotating format, allowing users to navigate through visuals using arrows or indicators.',
      link: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      badge: 'Laptop',
      title: 'An image slider is a web element that displays multiple images in a rotating format, allowing users to navigate through visuals using arrows or indicators.',
      link: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      badge: 'Laptop',
      title: 'An image slider is a web element that displays multiple images in a rotating format, allowing users to navigate through visuals using arrows or indicators.',
      link: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      badge: 'Laptop',
      title: 'An image slider is a web element that displays multiple images in a rotating format, allowing users to navigate through visuals using arrows or indicators.',
      link: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      badge: 'Laptop',
      title: 'An image slider is a web element that displays multiple images in a rotating format, allowing users to navigate through visuals using arrows or indicators.',
      link: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      badge: 'Laptop',
      title: 'An image slider is a web element that displays multiple images in a rotating format, allowing users to navigate through visuals using arrows or indicators.',
      link: '#',
    },
  ];
  return (
    <div className='main'>
      <div className="art-container">
        <div className="about-header">
          <h1>Scholorships</h1>
        </div>
        <div className="goal-content-container">
            <div className="goal-content">
                <div className="goal-sub-heading">
                    <h2>GCU Alumni Scholarship Scheme:</h2>
                </div>
                <div className="article-text">
                    <p>
                    The GCU Alumni Association shall offer 2 (two) scholarships for meritorious and deserving (economically backward) students for pursuing any UG programmes in the University. The scholarship shall cover total tuition and other additional fee of the students subject to the regular academic performance throughout the semesters. In exceptional cases for deserving candidates, the scholarship may also be extended to cover hostel fee of the candidate. 
                    </p>
                    <ul>
                        <li>Lifetime access to the GCU library is </li> 
                        <li>Receive the regular news</li>
                        <li>Get social.</li>
                        <li>Be a guest lecturer and share your experience.</li>
                        <li>Attend courses and lectures to continue your path of lifelong learning.</li>
                        <li>Fund bursaries or help raise funds.  </li>
                    </ul>
                </div>
            </div>
        </div> 
        <div className="carousel-content-container">
          <CardCarousel cards={cards}/>
        </div>
      </div>
    </div>
  )
}

export default Scholarship;
