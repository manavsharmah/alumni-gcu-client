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
                    </p> <br />
                    <div className="goal-sub-heading">
                        <h2>Top Alumni in the Lime Light</h2>
                    </div>
                    <ol>
                        <li>Mr. Sanjay Sinha, Senior Memory Design Engineer at Intel Corporation. Mr. Sinha is an alumnus of the Department of ECE at GIMT, graduating in the 2012-2016 batch.</li>
                        
                        <li>Ms Smita Paul, Design Verification Engineer at Aionsi India Pvt Ltd in Bangalore. An esteemed alumnus of the ECE Department at GIMT (2015-2019)</li>
                        
                        <li>Ms. Amita Sengupta, Technical Lead, VLSI Verification Engineer, Capgemini Engineering Hyderabad. Alumnus of ECE department of GIMT (2007-2011) batch</li>
                        
                        <li>Reemee Barman, Superintendent of State Tax, Finance Department, Government of Assam. She is an alumnus of the EE department of the GIMT 2012-16 batch</li>
                        
                        <li>Biplob Jyoti Saikia, Sub Divisional Engineer, APDCL, Nagaon Electrical Subdivision. He is an ex-employee in the department of EE and also an alumnus of the same department of GIMT 2009-2013 batch</li>
                        
                        <li>Gaurav Sharma is currently working in Federal Bank Limited as an Associate. He pursued a B.Tech in Mechanical Engineering from Girijananda Choudhury Institute of Management and Technology, Azara 2018-22 batch. He is also pursuing an MBA in Financial Management from GLA University in online mode.</li>
                        
                        <li>Manash Kalita, currently working as a JE in the Public Health Engineering department. He is an esteemed alumnus of the Department of Civil Engineering of GIMT, 2019-23 batch.</li>
                        
                        <li>Arundhati Devi is currently working as a JE in the Public Health Engineering department. She is an esteemed alumnus of the GIMT Civil Engineering department, 2018-22 batch.</li>
                        
                        <li>Sucharita Ghosh, Design Verification Engineer at Tech Mahindra Cerium Systems Pvt Ltd. She is an alumnus of the ECE department of GIMT 2015-19 batch.</li>
                        
                        <li>Amit Mundra, currently working in Zepto Staff as a Software Engineer. He an alumnus of the department of CSE 2013-17 batch of GIMT</li>
                        
                        <li>Tina Sarma, Graduate Engineer Trainee at Kirloskar Oil Engines. She is an alumnus of the department of Mechanical Engineering, 2018-22 batch</li>
                    </ol>

                </div>
                <div className="alumni-card-container">
                    <div className="goal-sub-heading">
                        <h2>Alumni Message :</h2>
                    </div> <br />
                    <AlumniCard 
                        image="../../assets/Hirakjyoti_Goswami.jpg"
                        name="Mr. Hirakjyoti Goswami" 
                        batch="Batch : 2011-2015" 
                        curr_pos="Current position: Executive Officer, Department of Production." 
                        curr_emp="Current Employer: Hetero Healthcare limited (Unit II), Palasbari."
                        message=" Message: As a proud alumnus of Girijananda Chowdhury University, I am honoured to reconnect with the Department of Pharmaceutical Sciences, which played a pivotal role in shaping my career. The dedication of the faculty and the enriching academic environment provided me with a strong foundation in pharmaceutical sciences. To the current students, make the most of your time here, embrace challenges, and aim for excellence. I am always happy to connect and contribute to our vibrant alumni network. Wishing the Department of Pharmaceutical Sciences and Girijananda Chowdhury University continued success and growth." 
                    />
                    <AlumniCard 
                        image="../../assets/Ankita_Kashyap.jpg" 
                        name="Dr. Ankita Kashyap " 
                        batch="Batch: 2008-2013" 
                        curr_pos="Current Position: Lecturer " 
                        curr_emp="Current Employer: Institute of pharmacy, Assam Medical college; Dibrugarh, Assam"
                        message=" Message: Greetings from a proud alumnus of the Department of Pharmaceutical Sciences, Girijananda Chowdhury University! My time at GCU laid a strong foundation for my career, thanks to the exceptional faculty and learning environment. To current students, make the most of these opportunities and aim high. Let’s stay connected and support our alma mater's growth. Wishing continued success to the department of Pharmaceutical Sciences and Girijananda Chowdhury University ." 
                    />
                    <AlumniCard 
                        image="../../assets/Ripunjoy_Bordoloi.jpg" 
                        name="Dr. Ripunjoy Bordoloi" 
                        batch="Batch: 2009-2015" 
                        curr_pos="Current Position: Inspector Of Drugs" 
                        curr_emp="Current Employer: Govt. Of Assam"
                        message="Message: Dear Girijananda Chowdhury University and the Department of Pharmaceutics,As an alumnus, I am proud to witness the remarkable growth of our university and department. The foundation I received here has been instrumental in shaping my career. Wishing continued success to the students and faculty in advancing excellence in pharmaceutical education and research." 
                    />
                    
                </div>
            </div>
        </div>      
      </div>
    </div>
  )
}

export default AlumniAchievers;
