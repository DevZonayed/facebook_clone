import React from 'react'
import Facebook from '../../Icons/Facebook'
import './Topbar.scss'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';

import { MdSearch } from "react-icons/md";
import Watch from '../../Icons/Watch';
import HomeIcon from '../../Icons/HomeIcon';
import MarketPlaceIcon from '../../Icons/MarketPlaceIcon';
import GroupIcon from '../../Icons/GroupIcon';
import GamingIcon from '../../Icons/GamingIcon';
import MenuIcon from '../../Icons/MenuIcon';
import MessengerIcon from '../../Icons/MessengerIcon';
import NotificationIcon from '../../Icons/NotificationIcon';
export const userPhoto = 'https://i.ibb.co/6ZTkkF5/Sabbir.jpg'

function Topbar() {
  return (
    <div className='w-[100%] bg-[#fff] bg-[#242526] sticky top-0 left-0 z-[999]  border-b-[2px] border-[#38393a]'>
        <div className="topbar flex justify-center items-center">
             <div className="left grow flex items-center">
                 <div className="logo">
                     <a href="#"><Facebook/></a>
                 </div>
                 <div className="search">
                     <label className='flex items-center"' htmlFor="search">
                          <span className='self-center'><MdSearch/></span>
                         <input id='search' type="search" placeholder='Search Facebook' />
                     </label>
                 </div>
             </div>
             <div className="center grow">
                 <div className="center-menu">
                     <ul className='flex items-center justify-between' >
                         <li><a href="#"><HomeIcon/></a></li>
                         <li><a href="#"><Watch/></a></li>
                         <li><a href="#"><MarketPlaceIcon/></a></li>
                         <li><a href="#"><GroupIcon/></a></li>
                         <li><a href="#"><GamingIcon/></a></li>
                     </ul>
                 </div>
            </div>
            <div className="right grow">
                <div className="right-menu">
                     <ul className='right-ul flex items-center justify-end'>
                        <li><a href="#"><MenuIcon/></a></li>
                        <li><a href="#"><MessengerIcon/></a></li>
                        <li><a href="#"><NotificationIcon/></a></li>
                        <Menu menuButton={<MenuButton>
                             <img className='max-w-[40px] w-[100%] h-[40px] object-cover rounded-[50%]' src={userPhoto} alt="" />
                        </MenuButton>}>
                            <MenuItem> Menu Item </MenuItem>
                        </Menu>
                     </ul>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default Topbar