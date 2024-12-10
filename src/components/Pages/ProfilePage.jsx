
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import default_image from "../assets/default.jpg";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, TextField } from "@mui/material";
import profilebackground from "../assets/profilebackground.png";
import EditIcon from "@mui/icons-material/Edit";
import FloatingButton from "./FloatingButton";
import "./Style.css";

function ProfilePage() {
  const default_description = 'Just someone who loves designing, sketching, and finding beauty in the little things 💕';
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(default_image);
  const [backgroundImage, setBackgroundImage] = useState(profilebackground);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    if (userDetails) {
      setName(userDetails.displayName || '');
      setDescription(userDetails.description || default_description);
      setProfileImage(userDetails.photoURL || default_image);
      setBackgroundImage(userDetails.backgroundURL || profilebackground);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedUserDetails = {
      ...userDetails,
      displayName: name,
      description: description,
      photoURL: profileImage,
      backgroundURL: backgroundImage,
    };

    setUserDetails(updatedUserDetails);
    setOpen(false);
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserDetails(user);
      } else {
        setUserDetails(null);
      }
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "profile") {
        setProfileImage(URL.createObjectURL(file));
        setProfileImageFile(file);
      } else if (type === "background") {
        setBackgroundImage(URL.createObjectURL(file));
        setBackgroundImageFile(file);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="profile_page">
        <div className="profile_backgroung">
          <img src={backgroundImage || profilebackground} alt="profile background" />
        </div>

        <div className="Profile_data">
          <img
            src={profileImage || default_image}
            alt="profile picture"
            onError={(e) => { e.target.src = default_image; }}
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <div>
            <button  onClick={handleOpen}>Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="user_details">
        <h2>{userDetails?.displayName || "User Name"}</h2>
      </div>
      <div className="user_description">
        <p style={{ width: '350px', marginLeft: '0.5rem' }}>
          {userDetails?.description || default_description}
        </p>
      </div>
      <div className="user_posts">
        <div
          className="post"
          style={{ backgroundImage: `url("https://picsum.photos/id/1011/300/200")` }}
        >
          <div className="count">1/3</div>
          <div className="description">Mountain View</div>
          <div className="likes">Likes: 150</div>
        </div>

        <div
          className="post"
          style={{ backgroundImage: `url("https://picsum.photos/id/1015/300/200")` }}
        >
          <div className="count">2/3</div>
          <div className="description">Forest Escape</div>
          <div className="likes">Likes: 230</div>
        </div>

        <div
          className="post"
          style={{ backgroundImage: `url("https://picsum.photos/id/1025/300/200")` }}
        >
          <div className="count">3/3</div>
          <div className="description">Serene Lake</div>
          <div className="likes">Likes: 300</div>
        </div>
      </div>

      <FloatingButton/>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{
          style: {
            width: '90%', // Responsive width
            maxWidth: '500px', // Desktop max width
            margin: '10px', // Mobile margin
          },
        }}
      >
        <DialogTitle>
          <img
            className="profile_backgroung_photo"
            src={backgroundImage || profilebackground}
            alt="profile background"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <IconButton
            color="primary"
            onClick={() => document.getElementById('background-file').click()}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            <EditIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <div>
            <img
              className='dialogu_profile_photo'
              src={profileImage || default_image}
              onError={(e) => { e.target.src = default_image; }}
              alt="profile picture"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <IconButton
              color="primary"
              onClick={() => document.getElementById('profile-file').click()}
              style={{ position: 'absolute', top: '12rem', right: '15rem' }}
            >
              <EditIcon />
            </IconButton>
          </div>

          <h3>Name</h3>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <hr />

          <h3>Bio</h3>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <hr />

          <input
            type="file"
            id="profile-file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'profile')}
          />
          <input
            type="file"
            id="background-file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'background')}
          />
        </DialogContent>

        <DialogActions >
          <Button style={{backgroundColor: 'black', color: '#fff', padding: '5px 30px'}} onClick={handleClose} color="primary">Cancel</Button>
          <Button style={{backgroundColor: 'black', color: '#fff', padding: '5px 30px'}} onClick={handleSave} color="secondary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfilePage;


