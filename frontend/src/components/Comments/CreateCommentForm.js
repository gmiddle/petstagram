import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk } from "../../store/comments";
import { loadOnePost } from "../../store/singlePost";
import { getAllCommentsThunk } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";



function CreateCommentForm({post}) {
  const dispatch = useDispatch();

  const ownerId = useSelector((state) => state.session.user.id);
  
    
    
  const [comment, setComment] = useState("");
//   const comments = useSelector((state) => state.comments);
  const [valErrors, setValErrors] = useState([]);
//   const posts = useSelector((state) => state.individualPost);
//   const postId = posts[posts.id]?.Comments
      
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      comment,
      userId: ownerId,
      postId: post.id
    };


    dispatch(createCommentThunk(payload)).then(() => 
    dispatch(getAllCommentsThunk(post.id))).then(()=> 
    dispatch(thunkGetAllPosts()));
    setComment("")
  
  };

  return (
    <div className="">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="fieldDiv">
            <input
              placeholder="Add a comment..."
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="createEventButton">
            <button type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCommentForm;
