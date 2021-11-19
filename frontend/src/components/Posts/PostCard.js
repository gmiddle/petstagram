import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PostCard.css";


function PostCard( { post } ) {
    
    return (
        <div className="post-container"> Hello From the Post Card
        {/* <br></br>
        <Link key={post.id} to={`/posts/${post.id}`}>
          <img className="post-img" src={post.imgUrl} alt=""></img>
        </Link>
        <br></br>
        <Link to={`/users/${post.userId}`}>
          <div>{post?.User?.username}</div>
        </Link>
        <br></br>
        {post.description}
        <br></br> */}
      </div> 
    )
}

export default PostCard;