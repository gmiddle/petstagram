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
      <div className="username-and-description-container">
        <Link to={`/users/${post.userId}`}>
          <div className="post-username">{post?.User?.username}</div>
        </Link>
        <br></br>
        <div className="post-description">
          {post.description}
        </div>
        <br></br>
      </div>
    </div> 
  )
}

export default PostCard;