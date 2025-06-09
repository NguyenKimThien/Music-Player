import React, { useEffect, useState } from 'react'
import './style.css'
import apiClient from '../../utils/spotify'
import profile from '../../assets/images.jpg'
import SideBarButton from './SidebarButton'
import { MdFavorite, MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
export default function SideBar() {
  const [image,setImage] = useState();
  useEffect(() => {
    apiClient.get('/me')
      .then(response => {
        setImage(response.data.images[0]?.url);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  },[])
  return (
    <div className="sidebar-container">
       <img src={image ? image : profile} alt="Profile" className='profile-image'/>
       <div>
         <SideBarButton to="/" title="Feed" icon={<MdSpaceDashboard />} />
         <SideBarButton to="/trending" title="Trending" icon={<FaGripfire />} />
         <SideBarButton to="/player" title="Player" icon={<FaPlay />} />
         <SideBarButton to="/favorites" title="Favorites" icon={<MdFavorite />} />
         <SideBarButton to="/library" title="Library" icon={<IoLibrary />} />
       </div> 
       <SideBarButton to="/settings" title="Settings" icon={<IoMdSettings />} />
    </div>
  )
}
