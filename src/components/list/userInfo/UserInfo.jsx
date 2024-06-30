import React from 'react';
import './userInfo.css';
import { useUserStore } from '../../../lib/userStore';

const UserInfo = () => {
    const { currentUser } = useUserStore();

    return(
        <div className='userInfo'>
            <div className='user'>
                
                <img src={currentUser?.avatar || "./SamDoe.jpg"} alt="avatar" />
                <h2>{currentUser?.username || 'Sam Doe'}</h2>
            </div>

            <div className='icons'>
                <img src="./more.png" alt="more" />
                <img src="./video.png" alt="video" />
                <img src="./edit.png" alt="edit" />
            </div>
        </div>
    )
}

export default UserInfo;
