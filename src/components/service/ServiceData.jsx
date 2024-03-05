import React from 'react';
import { TiSpannerOutline } from "react-icons/ti";
import { BsBricks } from "react-icons/bs";
import { MdOutlineCleanHands } from "react-icons/md";
import { GiDamagedHouse } from "react-icons/gi";
import GraphicGrid from '../../assets/graphicgrid.png';
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
        svg: <img src={GraphicGrid} alt="Graphic Grid" />,
    },
];
