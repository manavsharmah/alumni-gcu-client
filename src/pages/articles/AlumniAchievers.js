import React from 'react'
import "./articles.css"
import AlumniCard from '../../components/common/AlumniAchieverCard'

const AlumniAchievers = () => {
  return (
    <div className='main'>
      <div className="art-container">
        <div className="about-header">
            <h1>Alumnis in Limelight</h1>
        </div>
        <div className="goal-content-container">
            <div className="goal-content">
                <div className="goal-sub-heading">
                    <h2>Top Alumni in the Lime Light</h2>
                </div>
                <div className="article-text">
                    <p>
                        A University's alumni are the reflection of its past, a representation of its present, and a link to 
                        its future. The primary goal of our Alumni Association is to foster a lifelong relationship between 
                        alumni and their alma mater, facilitating a sense of community and supporting both the 
                        institution and its graduates. GCUAA provides logistics help to students and alumni, organizes 
                        in-house lectures and workshops for students, research scholars, and staff, and organizes 
                        outreach activities in schools and colleges. Donations and financial gifts from alumni make a 
                        direct impact on the future of the University, supporting scholarships, research, and programs 
                        that benefit the next generation of students. In the past, it has collected approximately Rs. 30 
                        lakhs through membership drives and donations. The GCU alums are spread across the globe 
                        and are occupied internationally. The GCUAA has an Alumni Office on the 3rd Floor of the 
                        Admin Building at GCU. The GCUAA has recently contributed Rs. 2 lacs from the association 
                        fund for the University’s development purposes.
                    </p>

                </div>
                <div className="alumni-card-container">
                    <AlumniCard 
                        image="./assets/gcuregistrar.jpg" 
                        name="Alumni Name" 
                        department="Physics Department" 
                        designation="Designation" 
                        company="Company" 
                    />
                    <AlumniCard
                        image="./assets/gcuregistrar.jpg"
                        name="Alumni Name"
                        department="Physics Department"
                        designation="Designation"
                        company="Company"
                    />
                </div>
            </div>
        </div>
        <div className="goal-content-container">
            <div className="goal-content">
                <div className="goal-sub-heading">
                    <h2>Notable Alumni</h2>
                </div>
                <div className="article-text">
                    <p>
                        Being a GCU alumnus gives you access to an encyclopedia of knowledge by reaching out to 
                        other alumni and building networks. Share experiences, gain different perspectives on common 
                        problems, and seek solutions that can benefit the continent. 
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
      </div>
    </div>
  )
}

export default AlumniAchievers;
