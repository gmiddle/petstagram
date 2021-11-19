import React, { useEffect, useState } from "react";
import { thunkGetAllPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Posts/PostCard";
import "./Feed.css"


function Feed() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => Object.values(state.posts));
//   const [currentPosts, setCurrentPosts] = useState(posts);
 
  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);



  return (
    <>
      
      <div className="feed-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default Feed;