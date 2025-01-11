import React from 'react';
import Article from '../../components/common/Article-container';
import QuickNav from '../../components/common/QuickNav';
import "../pages.css";
import "../../styles/index.css"

const aboutLinks = [
    { to: "/council", label: "Governing Council" }
];

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

export { GoverningCouncil };
