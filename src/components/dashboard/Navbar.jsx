import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { style } from '../style';
import { navLinks } from '../Constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState('');

  return (
    <nav
      className={`${style.paddingX}
      w-full flex items-center py-2 fixed top-0 z-20 bg-transparent`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo}
            alt="logo"
            className="w-8 h-14 object-contain"
          />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Raymond Tebogo Mahlohela &nbsp;
            <span className='sm:block hidden'>| IND Tech</span>
          </p>          
        </Link>
        
        <ul className='list-none hidden px-16 py-8 sm:flex flex-row gap-10'>
          {navLinks.map((Link) => (
            <li 
              key={Link.id}
              className={`${
                active === Link.title
                ? "text-white"
                : "text-secondary"
              } hover:text-white text-[18px]
              font-medium cursor-pointer`}
              onClick={() => setActive(Link.title)}
            >
              <a href={`#${Link.id}`}>{Link.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 p-2 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt="menu"
            className='w-[20px] h-[20px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div className={`${!toggle ? 'hidden' : 'flex' } p-4 black-gradient absolute top-20 right-0 mx-0 my-0 min-w-[140px] z-200 rounded-xl`}>
            <ul className='list-none flex justify-end flex-col gap-4'>
              {navLinks.map((Link) => (
                <li 
                  key={Link.id}
                  className={`${
                    active === Link.title
                    ? "text-white"
                    : "text-secondary"
                  } font-poppins font-medium
                  cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(Link.title);
                  }}
                >
                  <a href={`#${Link.id}`}>{Link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>    
  )
}

export default Navbar