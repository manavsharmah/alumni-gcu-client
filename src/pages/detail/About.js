import React from 'react';
import Article from '../../components/common/Article-container';
import QuickNav from '../../components/common/QuickNav';
import "../pages.css";
import "../../styles/index.css"

const aboutLinks = [
    { to: "/overview", label: "Overview" },
    { to: "/vision", label: "Vision And Mission" },
    { to: "/objectives", label: "Objectives And Activities" },
    { to: "/council", label: "Governing Council" }
];

const Overview = () => {
    return (
        <div className='main'>
        <div className="page-container">
            <Article title="Overview">
                <span><p>Welcome to the Girijananda Chowdhury University Alumni Association (GCUAA)—a vibrant 
                community of graduates who share a passion for the alma mater and a commitment to 
                supporting its mission and values. The Alumni Association is dedicated to supporting and 
                engaging our alumni network, offering a wide range of services, events, and resources to keep 
                them connected with the University and their fellow graduates.</p>
                <p>At Girijananda Chowdhury University (GCU), we believe in the value of connections that last a 
                lifetime. The Girijananda Chowdhury University has evolved in 2022 out of the initiative of the 
                Girijananda Chowdhury Institute of Management and Technology (GIMT) [established in 2006] 
                and the Girijananda Chowdhury Institute of Pharmaceutical Sciences (GIPS) [established in 
                2007] to impart professional higher education in a spirit of philanthropy and social 
                commitment. The Girijananda Chowdhury Institute of Management and Technology Guwahati 
                Alumni Association came into existence in 2013 bearing registration number 
                RS/KAM(M)/263/I/421 of 2014-15. In addition, the Girijananda Chowdhury Institute of 
                Pharmaceutical Science Guwahati Alumni Association was established in 2014 with registration 
                no. RS/KAM(M)263/W/01 of 2021-22. The GCU amalgamated both the Alumni Associations
                naming it ‘Girijananda Chowdhury University Alumni Association’ (GCUAA) and registered them
                under the Assam Society Registration Act XXI of 1860 with registration no. 
                RS/KAM(M)263/W/01 of 2021-22.</p>
                <p>A University's alumni are the reflection of its past, a representation of its present, and a link to 
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
                fund for the University’s development purposes.</p>
                <p>The GCUAA is the ideal vehicle for nurturing a strong, reciprocal relationship between the GCU
                and its alumni, enabling all of us, wherever we are, to Engage, Connect, and Unite. An engaged 
                alumni community is a vibrant community that actively reaches out, participates fully, and 
                welcomes and shares new ideas and fresh thinking. There are several ways you can engage with 
                the GCUAA:<br/><br/>
                <ul>
                <li>Become a member of the Alumni Association or, serve on the Alumni Association as an 
                elected member of the Executive Committee.</li>
                <li>Have your say on the Alumni Association’s social media platforms, including Twitter, 
                Facebook, and website.</li>
                <li>Attend alumni events, including public lectures, awards ceremonies, and Alumni 
                Association meetings.</li>
                </ul>
                Being a GCU alumnus gives you access to an encyclopedia of knowledge by reaching out to 
                other alumni and building networks. Share experiences, gain different perspectives on common 
                problems, and seek solutions that can benefit the continent.<br/><br/>
                <ul>
                <li>Lifetime access to the GCU library is available to alumni in good standing, along with 
                online resources such as e-magazines, etc.</li>
                <li>Receive the regular newsletter to see what fellow alumni are getting up to and the 
                heights they are reaching.</li>
                <li>Get social.</li>
                </ul>
                As alumni, let us stand together in advancing the goal of GCU to be the leading University in
                our country.<br/><br/>
                <ul>
                <li>Be a guest lecturer and share your experience.</li>
                <li>Attend courses and lectures to continue your path of lifelong learning.</li>
                <li>Fund bursaries or help raise funds.</li>
                </ul>
                Thank you for being a part of the Girijananda Chowdhury University Alumni Association. 
                Together, we continue to grow, succeed, and make an impact in the world.
                </p></span>
            </Article>
            <QuickNav title="About" links={aboutLinks}/>
        </div>
        </div>
    );
}

const VisionAndMission = () => {
    return (
        <div className='main'>
        <div className="page-container">
            <Article title="Vision and Mission">
                <p> <h6><b>Vision</b></h6>
                To build an active and inclusive alumni network that inspires collaboration, celebrates achievements
                and contributes significantly towards the development of the university and society.</p>
                <p> <h6><b>Mission</b></h6>
                To enhance constant connections among alumni, the university and its community by promoting professional growth, benevolence 
                and common values in order to strengthen the values of the institution.</p>
            </Article>
            <QuickNav title="About" links={aboutLinks}/>
        </div>
        </div>
    );
}

const Objectives = () => {
return (
    <div className='main'>
        <div className="page-container">
            <Article title="Objectives and Activities">
                <p><ol>
                <li><b>Strengthen Alumni Connections:</b> Organize reunions, networking events, and mentorship programs to foster meaningful relationships among alumni and with current students.</li>
                <li><b>Support Professional Development:</b> Provide career resources, training opportunities, and industry connections to enhance the professional growth of alumni.</li>
                <li><b>Promote Philanthropic Activities:</b> Encourage alumni contributions to scholarships, research initiatives and campus development projects.</li>
                <li><b>Enhance Institutional Reputation:</b> Showcase alumni achievements to highlight the university's impact on the global stage.</li>
                <li><b>Encourage Lifelong Learning:</b> Offer access to lectures, workshops, and educational content to support alumni in their personal and professional endeavours.</li>
                <li><b>Foster a Sense of Belonging:</b> Cultivate an inclusive and welcoming environment where alumni from diverse backgrounds feel valued and connected.</li>
                <li><b>Collaborate with the University:</b> Partner with the university to support strategic goals, enhance student experiences and contribute to academic excellence.</li>
                </ol></p>
                            </Article>
            <QuickNav title="About" links={aboutLinks}/>
        </div>
        </div>
    );
}

const GoverningCouncil = () => {
    return (
        <div className='main'>
        <div className="page-container">
            <Article title="Governing Council">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, rem minima culpa nihil dolorem ipsum sapiente quam vero possimus dignissimos doloribus enim quibusdam sint nesciunt iusto doloremque blanditiis ea autem earum necessitatibus dolor sequi praesentium iste. Voluptate adipisci cupiditate laborum hic quos quod dolorum, atque ex eligendi deserunt illo est nihil at possimus iusto impedit. Rerum vel odio, eos dolorem sed totam? Magni repellat mollitia vitae saepe deserunt quaerat fuga, quo sunt nemo. Quae ut sunt suscipit eos quis numquam in eligendi aliquam veniam nihil, assumenda recusandae optio? Quidem laborum voluptate, temporibus est repellendus, cumque quis similique pariatur, fugit natus harum blanditiis placeat? Doloribus deserunt sit corporis est accusantium, vel rem dignissimos cum commodi consectetur! Est quasi, dolor facere dolorem repellat quos tempore quis fugiat ad inventore minima voluptatum molestias reprehenderit laborum officia nam optio reiciendis aspernatur cum delectus commodi libero voluptas et! Expedita, voluptatibus sint aspernatur animi adipisci sit. Reiciendis ratione ex a ea saepe sapiente illo quis ullam debitis dolorem, quo quasi minima iure perferendis eligendi, maiores iusto consectetur dignissimos quam officia adipisci? Doloribus quaerat minus sit. Ducimus quos dignissimos eaque asperiores facilis fugit? A voluptate dolorem impedit assumenda adipisci, dolor at praesentium magnam quaerat? Repudiandae quae magni, perspiciatis ullam expedita itaque consectetur quaerat assumenda tempore doloribus animi voluptatibus tenetur. Eius quis asperiores, eligendi quam vitae, aliquam soluta id nobis voluptas voluptates molestiae, ipsum quo. Dolorum, veniam delectus. Dolores porro eum enim nostrum reprehenderit distinctio reiciendis blanditiis sed aliquam illum dolorum adipisci voluptatum qui, quia saepe quaerat veniam et facere exercitationem. Delectus aspernatur quod, ab amet tempora cumque adipisci nesciunt molestias quisquam in doloribus cum assumenda asperiores quis enim cupiditate similique maiores autem. Quam itaque possimus voluptate architecto iure ea quas delectus accusantium sunt veniam, quis saepe modi quasi vitae veritatis nesciunt? Atque officiis, dolorem consequatur sint nihil voluptatum error eius neque maiores minima inventore qui eveniet placeat quia praesentium unde! Perspiciatis molestiae quos temporibus deleniti incidunt officiis optio eaque amet minus, culpa aliquid perferendis. Minus cum dicta aperiam esse tempora! Nulla id ex dolore ipsam nobis nostrum aut eius quibusdam sequi, quae reprehenderit earum quo ullam, iure sed debitis rerum itaque. Pariatur, eius perferendis in impedit expedita quam. Reiciendis, consequuntur qui consequatur aliquid vel quaerat quasi cupiditate ipsam sapiente repudiandae inventore perspiciatis impedit hic vero, cumque dolor ullam dolore quas odio alias culpa sequi veritatis cum! Nihil, neque praesentium quo, debitis exercitationem laudantium ratione eos dignissimos repellendus, non nisi. Accusantium fugiat dolor maiores minus maxime, exercitationem quasi aut velit ratione placeat inventore itaque in. Temporibus delectus, mollitia inventore voluptatem quaerat maxime ut autem ipsam. Excepturi perspiciatis, enim, dolorum sunt molestias laudantium iure expedita culpa quam distinctio sapiente dolor. Iste deleniti maxime debitis dolor fugit architecto facilis voluptatem nobis consectetur, repudiandae, ab hic aut non reiciendis recusandae earum adipisci officia facere. Id, placeat neque similique voluptates deleniti quae reiciendis debitis aspernatur iste veritatis libero ipsum quisquam. Aperiam deserunt, delectus soluta tempora sunt placeat ipsa non! Suscipit vero neque ducimus fuga. Dolore ipsa placeat quibusdam, hic esse quam vitae!</p>
            </Article>
            <QuickNav title="About" links={aboutLinks}/>
        </div>
        </div>
    );
}

export {Overview, VisionAndMission, Objectives, GoverningCouncil };
