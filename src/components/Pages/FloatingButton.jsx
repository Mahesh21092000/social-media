import React, { useState } from "react";
import { Fab, Modal, Box, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Carousel from "react-material-ui-carousel";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { push, ref as dbRef } from "firebase/database";
import { storage, database } from "../firebase";
import Webcam from "react-webcam";
import "./FloatingButton.css"; // Create a CSS file for additional styles

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [multiSelect, setMultiSelect] = useState(true);
  const [isCamera, setIsCamera] = useState(false);
  const [imageFromCamera, setImageFromCamera] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPostText("");
    setImages([]);
    setPreviewUrls([]);
    setIsCamera(false);
    setImageFromCamera(null);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!multiSelect && files.length > 1) {
      alert("Multi-select is disabled when camera is used.");
      return;
    }
    setImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleCameraCapture = (imageData) => {
    setImageFromCamera(imageData);
    setIsCamera(true);
  };

  const handlePost = async () => {
    if (!postText.trim() && images.length === 0 && !imageFromCamera) {
      alert("Please add some content or images.");
      return;
    }

    const imageUrls = [];
    // Upload images from the file input
    for (const image of images) {
      const imageRef = storageRef(storage, `posts/${image.name}-${Date.now()}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }

    // Upload camera image if available
    if (imageFromCamera) {
      const cameraImageRef = storageRef(storage, `posts/camera-${Date.now()}.jpg`);
      const blob = await fetch(imageFromCamera).then((res) => res.blob());
      await uploadBytes(cameraImageRef, blob);
      const url = await getDownloadURL(cameraImageRef);
      imageUrls.push(url);
    }

    // Add post data to Firebase Realtime Database
    const postRef = dbRef(database, "posts");
    await push(postRef, {
      text: postText,
      images: imageUrls,
      timestamp: Date.now(),
    });

    alert("Post added successfully!");
    handleClose();
  };

  return (
    <>
      <Fab
        color="dark"
        aria-label="add"
        onClick={handleOpen}
        style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
      >
        <AddIcon />
      </Fab>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: { xs: "90%", sm: "70%", md: "50%" },
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            New Post
          </Typography>
          {previewUrls.length > 0 && (
            <Carousel>
              {previewUrls.map((url, index) => (
                <div key={index} className="carousel-item">
                  <img src={url} alt={`Preview ${index + 1}`} className="carousel-image" />
                  <div className="image-count">{`${index + 1}/${previewUrls.length}`}</div>
                </div>
              ))}
            </Carousel>
          )}

          {imageFromCamera && (
            <div className="camera-image-container" >
              <img src={imageFromCamera} alt="Camera" className="camera-image" />
            </div>
          )}

          <TextField
            label="What's on your mind?"
            fullWidth
            multiline
            rows={4}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            sx={{ my: 2 }}
          />

          <Button
            variant="contained"
            component="label"
            sx={{ mb: 2 }}
            style={{color: '#fff', backgroundColor: 'black', borderRadius: '10px'}}
          >
            Upload Image(s)
            <input
              type="file"
              hidden
              accept="image/*"
              multiple={multiSelect}
              onChange={handleFileChange}
            />
          </Button>

          <Button
            variant="contained"
            onClick={() => setIsCamera(true)}
            sx={{ mb: 2 }}
            style={{color: '#fff', backgroundColor: 'black', marginLeft: '10px', borderRadius: '10px'}}
          >
            Use Camera
          </Button>

          {isCamera && !imageFromCamera && (
            <div className="webcam-container">
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                width="50%"
                height="30%"
                videoConstraints={{
                  facingMode: "environment",
                }}
                onScreenshot={(data) => handleCameraCapture(data)}
              />
            </div>
          )}

          <Button
            variant="contained"
            onClick={handlePost}
            sx={{ display: "block", width: "100%", backgroundColor: 'black', color: '#fff', padding: '5px 30px', borderRadius: '15px' }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FloatingButton;
