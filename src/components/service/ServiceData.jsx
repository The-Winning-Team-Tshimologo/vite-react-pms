import React from 'react';
import { TiSpannerOutline } from "react-icons/ti";
import { BsBricks } from "react-icons/bs";
import { MdOutlineCleanHands } from "react-icons/md";
import { GiDamagedHouse } from "react-icons/gi";
import GraphicGrid from '../../assets/3d geomtrical shape.svg';
import { MdLightbulbOutline } from "react-icons/md";
import  "./service.css";

export const services = [
    {
        icon: <TiSpannerOutline/>,
    },
    {
        icon: <BsBricks/>,
    },
    {
        icon: <MdLightbulbOutline/>,
    },
    {
        icon: <GiDamagedHouse/>,
    },
    {
        icon: <MdOutlineCleanHands/>,
    },
];

export const svg = [
    {
        svg: <img src={GraphicGrid} className='graphic-grid' alt="Graphic Grid" />,
    },
];
