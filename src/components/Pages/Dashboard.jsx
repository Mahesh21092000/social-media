import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import default_image from "../assets/default.jpg";
import PostFeeds from "../Feed/PostFeeds";
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import Box from '@mui/material/Box';
import "./Style.css";
import FloatingButtonPost from "./FloatingButton";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      await user.reload();
      setUserDetails(user);
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  function GoToProfile() {
    window.location.href = "./ProfilePage";
  }

  return (
    <div className="Dashboard">
      {userDetails ? (
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '10px'}}>
          <div className="User_Profile">
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "30px",
                cursor: "pointer",
              }}
              src={userDetails?.photoURL ? userDetails.photoURL : default_image}
              alt="profile picture"
              onError={(e) => {
                e.target.src = default_image;
              }}
              onClick={GoToProfile}
            />{" "}
          </div>
          <div>
            <p>Welcome Back,</p>

            <h3>{userDetails.displayName}</h3>
          </div>
        </div>
      ) : (
        <Stack style={{ alignItems: "center", marginTop: "10rem" }}>
          <CircularProgress variant="determinate" value={progress} />
        </Stack>
      )}

      {/* <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab aria-label="add">
        <AddIcon />
      </Fab>
      </Box> */}
     
      <PostFeeds />
      <FloatingButtonPost/>
    </div>
  );
}

export default Profile;
