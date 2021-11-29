import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOnePost } from "../../store/singlePost";
import "./EditCommentForm.css";
import { editCommentThunk, getAllCommentsThunk, getOneCommentThunk } from "../../store/comments";


const EditCommentForm = ({ comment }) => {
  const dispatch = useDispatch();
  const [editComment, setEditComment] = useState(comment.content);
//   const userId = useSelector((state) => state.session?.user?.id);
  const [show, setShow] = useState(true);
  const [isClicked, setIsClicked] = useState(false)
  const post = useSelector((state) => state.singlePost);
//   const myComment = useSelector((state) => state.comments)
  const ownerId = useSelector((state) => state.session.user.id);  
  // const commentList = useSelector((state) => state.posts[post.id].Comments)
  // const filteredComments = commentList.filter((ele) => ele.postId === post.id)
  const commentList = useSelector((state) => state.posts[post.id].Comments)
  
  
  const updateSetShow = (e) => {
    show ? setShow(false) : setShow(true);
    setIsClicked(true)
    // dispatch(getOneCommentThunk(comment.id))
  };

  const updateDetails = (e) => {
    setEditComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      content: editComment,
      id: comment.id,
      postId: post.id
    };
    // console.log("this is the payload from the editcommentform", payload)
    // dispatch(editCommentThunk(payload))
    // .then(() => dispatch(loadOnePost(post.id)))
    
    await dispatch(editCommentThunk(payload));
    await dispatch(getAllCommentsThunk(post.id))
    dispatch(loadOnePost(post.id))
    // dispatch(hideModal());
    updateSetShow();
  };

  // console.log("this is the post from editcommentform", post.id)

  return (
    <div>
      {ownerId === comment.userId ? (
                        
        <button
          className={`editButton ${show ? null : "hidden"}`}
          onClick={updateSetShow}
          // disabled={isClicked}
        >
          EDIT
        </button>
      ) : null }

      {isClicked && (
        <div>
          <textarea
            maxLength="200"
            type="text"
            required
            name="editComment"
            value={editComment}
            onChange={updateDetails}
            className={`editButton ${show ? "hidden" : null}`}
          ></textarea>
          <button
            onClick={handleSubmit}
            className={`editButton ${show ? "hidden" : null}`}
          >
            Update Comment
          </button>
          <button
            onClick={updateSetShow}
            className={`editButton ${show ? "hidden" : null}`}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EditCommentForm;
