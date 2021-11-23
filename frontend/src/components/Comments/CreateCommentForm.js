import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk } from "../../store/comments";
// import { loadOnePost } from "../../store/singlePost";
import { getAllCommentsThunk } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";



function CreateCommentForm({post}) {
  const dispatch = useDispatch();
  const ownerId = useSelector((state) => state?.session?.user?.id);
  const [content, setContent] = useState("");
  const [valErrors, setValErrors] = useState([]);
//   const comments = useSelector((state) => state.comments);
//   const postId = posts[posts.id]?.Comments
      
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content,
      userId: ownerId,
      postId: post.id
    };

    // console.log("this is the content before dispatch", content)
    dispatch(createCommentThunk(payload)).then(() => 
    dispatch(getAllCommentsThunk(post.id))).then(()=> 
    dispatch(thunkGetAllPosts()));
    setContent("")
  
  };

  return (
    <div className="">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="fieldDiv">
            <input
              placeholder="Add a comment..."
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
