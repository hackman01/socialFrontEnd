import React from "react";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './Sidebar.css';
import axios from 'axios';
import {RssFeed, Chat,  Work,  PlayCircleFilledOutlined,  GroupAdd} from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';

import { Link } from 'react-router-dom';

const PF = process.env.REACT_APP_PUBLIC_FOLDER;


const CloseFriend = ({user}) =>{
   
   return <><Link to={`/profile/${user._id}`} style={{ textDecoration:'none',color:'black' }} >
   <div className="friend">
     <img src={user.profilePic?PF+user.profilePic:PF+"person/noAvatar.png"} alt="user" className="img"/>
     <span>{user.username}</span>   
   </div>
   </Link>
    </>


}



function Sidebar(){
  const { user:cuser } = useContext(AuthContext);

  const [Users,setUsers] = useState([])
  const [load,setLoad] = useState(true)

useEffect(() => {
  const fetchFriends = async () =>{
    const friends = await axios.get(`/users/followers/${cuser._id}`)
    setUsers(friends.data);
    setLoad(false);
  }
  fetchFriends();
},[])

    return <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-list">
            <Link to="/" style={{ textDecoration:'none',color:'black' }} >
            <li className="sidebar-list-item">
              <RssFeed className="sidebar-icon"/>
              <span>Feed</span>
            </li>
            </Link>
            <li className="sidebar-list-item inactive">
              <Chat className="sidebar-icon"/>
              <span>Chats</span>
            </li>
            {/* <li className="sidebar-list-item">
              <PlayCircleFilledOutlined className="sidebar-icon" />
              <span>Videos</span>
            </li> */}
            <li className="sidebar-list-item inactive">
              <GroupAdd className="sidebar-icon" />
              <span>Groups</span>
            </li>
            {/* <li className="sidebar-list-item">
              <Work className="sidebar-icon" />
              <span>Jobs</span>
            </li> */}
            {/* <li className="sidebar-list-item">
              <ComputerRounded className="sidebar-icon" />
              <span>Courses</span>
            </li> */}
        </div>
        {/* <button className="sidebar-button"> Show More</button> */}
        <hr />
        <h3>Followers</h3>
        <div className="friends-list">
           {load ? <div className="load" ><CircularProgress style={{color : 'brown',display : 'block',margin : 'auto',padding : '50px',fontSize : '5px'}} /></div> :
            Users.map(u=>{
             return <CloseFriend key={u.id} user={u}/>
            })
           }
        </div>
      </div>
    </div>
}

export default Sidebar;