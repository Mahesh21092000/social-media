import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Realtime Database SDK
import PostBox from "./PostBox"; // Import your PostBox component
import './Style.css'

function PostFeeds() {
  const [posts, setPosts] = useState([]);

  // Fetch data from Realtime Database
  useEffect(() => {
    const db = getDatabase(); // Initialize the database
    const postsRef = ref(db, "posts"); // Adjust the path to match your structure in the database

    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Transform object into sorted array
        const postsArray = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          .sort((a, b) => {
            // Extract the numeric part of the keys and compare them
            const numA = parseInt(a.id.replace("post", ""), 10);
            const numB = parseInt(b.id.replace("post", ""), 10);
            return numA - numB;
          });
        setPosts(postsArray);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostBox
          key={post.id}
          profilePhoto={post.profilePhoto}
          username={post.username}
          hoursAgo={post.hoursAgo}
          description={post.description}
          postImage={post.postImage}
          likes={post.likes}
        />
      ))}
    </div>
  );
}

export default PostFeeds;
