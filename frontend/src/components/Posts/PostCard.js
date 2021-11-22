// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import EditPostModal from "./EditPostModal";
// import "./PostCard.css";



// function PostCard( { post } ) {
//   console.log("this is the post",post)
  
//   return (
//     <div className="post-container">

//       <br></br>
//         <img className="post-img" src={post.imgUrl} alt=""></img>
//       <br></br>
//       <div className="username-and-description-container">
//         <Link to={`/users/${post.userId}`}>
//           <div className="post-username">{post?.User?.username}</div>
//         </Link>
//         <br></br>
//         <div className="post-description">
//           {post.description}
//         </div>
//         <br></br>
//         <CreateCommentForm post={post} />
//         {lastComment()}
//         <CommentCard post={post} />
//       </div>
//     </div> 
//   )
// }

// export default PostCard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PostCard.css";
import CreateCommentForm from "../Comments/CreateCommentForm";
import CommentCard from "../Comments/CommentCard";
import { loadOnePost } from "../../store/singlePost";
import { setCurrentModal } from "../../store/modal";
import { showModal } from "../../store/modal";
import CreateCommentFormModal from "../Comments/CreateCommentFormModal";

function PostCard({ post }) {
    const dispatch = useDispatch()
    const numberOfComments = post?.Comments?.length;
    const hasComments = numberOfComments > 0;
    const lastComment = () => {
      if (!hasComments) {
        return null;
      }

      if (post.Comments) {
        const comment = post?.Comments[post.Comments.length - 1];
        return <div>{comment.comment}</div>;
      }
    };

      const handleSubmit = async () => {
        await dispatch(loadOnePost(post.id));
        await dispatch(setCurrentModal(CreateCommentFormModal));
        await dispatch(showModal());
      };

  return (
    <div className="posts">
      <br></br>
      {/* <Link key={post.id} to={`/posts/${post.id}`}> */}
      <img
        onClick={handleSubmit}
        className="postImage"
        src={post.imgUrl}
        alt=""
      ></img>
      {/* </Link> */}
      <br></br>
      <Link to={`/users/${post.userId}`}>
        <div>{post?.User?.username}</div>
      </Link>
      <br></br>
      {post.description}
      <br></br>
      <CreateCommentForm post={post} />
      {lastComment()}
      <CommentCard post={post} />
    </div>
  );
}

export default PostCard;
