import React from 'react';
import Article from '../../components/common/Article-container';
import QuickNav from '../../components/common/QuickNav';
import "../pages.css";

const getInvolvedLinks = [
    { to: "/alumnus", label: "Alumnus-Stake Holder Forum" }
];

const Alumnus = () => {
    return (
        <div className="page-container">
            <Article title="Alumnnus">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ullam quae modi, tempora et placeat numquam quibusdam ipsa optio at mollitia repellendus sed illo, inventore perspiciatis, laudantium iusto eveniet cumque aut eaque deleniti. Reiciendis debitis accusamus ea eligendi optio temporibus excepturi? Omnis dolor nostrum maiores, ipsam laborum sed vel error aliquam itaque blanditiis fugit explicabo eligendi ratione laudantium inventore nam ducimus voluptate, reprehenderit voluptas officia nobis vero. Atque voluptatem sapiente doloribus quidem, est laborum explicabo! Reiciendis commodi esse minima deleniti ea laudantium quaerat vero eligendi quibusdam temporibus incidunt voluptate, distinctio sunt sequi et, excepturi nostrum! Sed officia cupiditate molestiae temporibus.</p>
            </Article>
            <QuickNav title="Get Involved" links={getInvolvedLinks}/>
        </div>
    );
}

export {Alumnus};