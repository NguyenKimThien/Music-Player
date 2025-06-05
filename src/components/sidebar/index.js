import React from 'react'
import './style.css'
import profile from '../../assets/images.jpg'
import SideBarButton from './SidebarButton'
import { MdFavorite, MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
export default function SideBar() {
  return (
    <div className="sidebar-container">
       <img src={profile} alt="Profile" className='profile-image'/>
       <div>
         <SideBarButton to="/feed" title="Feed" icon={<MdSpaceDashboard />} />
         <SideBarButton to="/trending" title="Trending" icon={<FaGripfire />} />
         <SideBarButton to="/player" title="Player" icon={<FaPlay />} />
         <SideBarButton to="/favorites" title="Favorites" icon={<MdFavorite />} />
         <SideBarButton to="/library" title="Library" icon={<IoLibrary />} />
       </div> 
       <SideBarButton to="/settings" title="Settings" icon={<IoMdSettings />} />
    </div>
  )
}
