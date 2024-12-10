import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "./Style.css";

function SharePage() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const [shareLink] = useState("https://vibesnap.com");

  const toggleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  function handleClose() {
    window.location.href = '/Dashboard'
  }

  return (
    <div className="post">
      {/* Share Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Share Post</DialogTitle>
        <DialogContent>
          <div className="share-options">
            <div style={{ display: "flex", gap: "3rem" }}>
              <div className="share_icon">
                <Button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/share?url=${shareLink}`,
                      "_blank"
                    )
                  }
                >
                  <TwitterIcon />
                </Button>
                <p>Twitter</p>
              </div>
              <div className="share_icon">
                <Button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`,
                      "_blank"
                    )
                  }
                >
                  <FacebookIcon />
                </Button>
                <p>Facebook</p>
              </div>
              <div className="share_icon">
                <Button
                  onClick={() =>
                    window.open(
                      `https://www.reddit.com/submit?url=${shareLink}`,
                      "_blank"
                    )
                  }
                >
                  <RedditIcon />
                </Button>
                <p>Raddit</p>
              </div>

              <div className="share_icon">
                <Button
                  onClick={() =>
                    window.open(`https://wa.me/?text=${shareLink}`, "_blank")
                  }
                >
                  <WhatsAppIcon />
                </Button>
                <p>WhatsApp</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "3rem" }}>
            <div className="share_icon">
              <Button
                onClick={() =>
                  window.open(
                    `https://www.instagram.com/?url=${shareLink}`,
                    "_blank"
                  )
                }
              >
                <InstagramIcon />
              </Button>
              <p>Instagram</p>
            </div>
            <div className="share_icon">
              <Button
                onClick={() =>
                  window.open(
                    `https://t.me/share/url?url=${shareLink}`,
                    "_blank"
                  )
                }
              >
                <TelegramIcon />
              </Button>
              <p>Telegram</p>
            </div>
            </div>
          </div>
          <div className="copy-link">
            <TextField
              value={shareLink}
              fullWidth
              disabled
              InputProps={{
                endAdornment: (
                  <Button onClick={handleCopyLink}>
                    <FileCopyIcon />
                  </Button>
                ),
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SharePage;
