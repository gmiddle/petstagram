import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PostCard.css";


function PostCard( { post } ) {
  console.log("this is the post",post)
  
  return (
    <div className="post-container">

      <br></br>
        <img className="post-img" src={post.imgUrl} alt=""></img>
      <br></br>
      <Link to={`/users/${post.userId}`}>
        <div>{post?.User?.username}</div>
      </Link>
      <br></br>
      {post.description}
      <br></br>
    </div> 
  )
}

export default PostCard;