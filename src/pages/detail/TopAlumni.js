import React from 'react'

const TopAlumni = () => {
  return (
    <div className="container" >
        <div className='row justify-content-center'>
            <div className='col-md-6 col-10'>
                <h2 className='title'>Top Alumni in the Lime Light</h2>
                <div class="card">
                    <div className='card-body'>
                    <h2 className='card-title text-center'>Top Alumni in the Lime Light</h2>
                    <hr />
                    <div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam earum quisquam voluptatibus alias unde ipsum illo, vitae, accusantium odit perspiciatis distinctio porro veniam exercitationem voluptatum dolorem quibusdam deleniti maiores vero aliquam? Commodi fugiat tempora voluptatem eos maxime nulla iusto amet libero, temporibus possimus praesentium veniam facere repudiandae atque consequatur ullam?</p>
                    </div>
                        
                </div>
                </div>
                <div className="quicknav">
                    <ul className='navs'>Alumni Achievers
                        <li><a href="/top-alumni">Top Alumni In Lime Light</a></li>
                        <li><a href="/notable-alumni">Notable Alumni</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopAlumni