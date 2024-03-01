import React from 'react'
import Searchbar from './Searchbar'
import Profile from './Profile'
import  style from '../style'

const Header = () => {
  return (
    <>
      <h2>Header</h2>
      {/* <nav
        className={`${style.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
      ></nav> */}
      {/* <img className=''
        src='/src/assets/Logo.png'
        alt=''
      /> */}
      <Profile />
      <Searchbar />
    </>
  )
}

export default Header
