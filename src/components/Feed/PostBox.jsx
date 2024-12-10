// components/feed/PostBox.jsx
import React, { useState } from "react";
import "./Style.css"; // Add styles for PostBox
import SendIcon from '@mui/icons-material/Send';

function PostBox({ profilePhoto, username, hoursAgo, description, postImage, likes }) {

  function SharePost () {
    window.location.href = '/SharePage'
  }

  return (
    <div className="post-box">
      <div className="post-header">
        <img src={profilePhoto} alt="profile" className="profile-photo" />
        <div className="post-info">
          <h4>{username}</h4>
          <p>{hoursAgo}</p>
        </div>
      </div>
      <div className="post-description">
        <p>{description}</p>
      </div>
      <div className="post-image">
        <img src={postImage} alt="post" />
      </div>
      <div className="post-likes">
        <p>❤️ {likes} likes</p>
        <button  onClick={ SharePost }> <SendIcon/> Share </button>
      </div>

    </div>
  );
}

export default PostBox;
