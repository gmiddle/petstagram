import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";
import { Link } from "react-router-dom";
import { deletePost } from "../../store/posts";
import { useHistory } from "react-router";
import { hideModal } from "../../store/modal";
import { setCurrentModal } from "../../store/modal";
import EditPostForm from "../Posts/EditPostForm";
import "./CreateCommentFormModal.css";
import { loadOnePost } from "../../store/singlePost";
import { deleteCommentThunk } from "../../store/comments";
import EditCommentForm from "./EditCommentForm";
import { allUsers } from "../../store/users";
import CreateCommentForm from "./CreateCommentForm";

function CreateCommentFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ownerId = useSelector((state) => state.session.user.id);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("");
  const [valErrors, setValErrors] = useState([]);
  const post = useSelector((state) => state.singlePost);
  const [isEditing, setIsEditing] = useState(false);
  const commentsObj = useSelector((state) => state.comments)
  const allComments = Object.values(commentsObj)
  const comments = allComments.filter((comment) => comment.postId === post.id)
  const users = useSelector((state) => state.users)
  const userName = useSelector((state) => state.posts[post.id]?.User?.username)

  // console.log("this is post from creatcommentformmodal", post)
  // console.log("this is comments from createcommentformmodal", comments)
  useEffect(() => dispatch(allUsers()), [dispatch])

  const deletedPost = async () => {
    await dispatch(deletePost(post?.id));
    await dispatch(hideModal());
    await dispatch(thunkGetAllPosts());
    // history.push("/posts");
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    const commentId = e.target.id;
    await dispatch(deleteCommentThunk(commentId));
    // if (comments.length > 0) {
    //   dispatch(loadOnePost(post.id));
    // } else {
    //   dispatch(loadOnePost(post.id));
    //   dispatch(hideModal())
    // }

    dispatch(loadOnePost(post.id));
  };

  const editPost = async () => {
    dispatch(setCurrentModal(EditPostForm));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content,
      userId: ownerId,
      postId: post.id,
    };

    await dispatch(createCommentThunk(payload));
  

    dispatch(loadOnePost(post.id));
    await dispatch(thunkGetAllPosts());
    setContent("");
  };

  // const editComment = async (e) => {
  //     e.preventDefault();
  //     const commentId = e.target.id;
  //     <EditCommentForm commentId={commentId} />;
  //     setIsEditing(true)
  //     // dispatch(setCurrentModal(EditCommentForm));
  // };

  return (
    <div className="postModal">
      <div className="modalImageWrapper">
        <img className="postModalImage" src={post?.imgUrl} alt=""></img>
      </div>
      <div className="rightSideModal">
        <div className="postModalHeader">
          <div className="postUser">
            {/* <img className="postUserPhoto" src={post?.User?.profilePic} alt=""></img>
            <Link
              className="userLink"
              to={`/users/${post?.userId}`}
              onClick={() => dispatch(hideModal())}
            > */}
            <div>
              {userName}

            </div>
            {/* </Link> */}
          </div>
          <div className="closeModal" onClick={() => dispatch(hideModal())}>
            x
          </div>
        </div>
        {post?.userId === ownerId && (
          <div>
            <button value={edit} className="editPostButton" onClick={editPost}>
              Edit Post
            </button>
            <button className="deletePostButton" onClick={deletedPost}>Delete Post</button>
          </div>
        )}
        <ul className="commentScroll">
          <div className="post-description">Description: {post?.description}</div>
          {post &&
            comments?.map((comment) => (
              <li className="postModalCommentWrapper" key={comment.id}>
                <div className="postModalComment">
                  <div className="commentUserPhoto"></div>
                  <div>
                    <h3 className="commentUserName">
                    {/* <Link
                      className="userLink"
                      to={`/users/${post?.userId}`}
                      onClick={() => dispatch(hideModal())}
                    >
                      {post?.User?.username}
                    </Link> */}
                    {users[comment.userId]?.username}
                    </h3>
                    <span className="spanComment">{comment.content}</span>
                    {/* <div id={comment.id} onClick={editComment}>
                      EDIT
                    </div> */}
                    <div className="editAndDeleteContainer">
                      <div className="editCommentFormButtonContainer">
                        <EditCommentForm comment={comment} />
                      </div>
                      <div className="deleteCommentButtonContainer">
                        {ownerId === comment.userId ? (
                          <button
                            className="deleteComment"
                            id={comment.id}
                            onClick={deleteComment}
                          > Delete </button>
                        ) : null }
                      </div>
                    </div>

                    {/* <img className="editIcon" scr="https://res.cloudinary.com/dis83syog/image/upload/v1637344420/Countable/download_dhs0ho.png" alt=""></img> */}
                  </div>
                </div>
                <div></div>
              </li>
            ))}
        </ul>
        <div className="comment-form-wrapper">
          {/* <form className="anyComments" onSubmit={handleSubmit}>
            <div className="fieldDiv">
              <input
                placeholder="Add a comment..."
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="create-comment-button">
              <button type="submit">Post</button>
            </div>
          </form> */}
          <CreateCommentForm post={post}/>
        </div>
      </div>
    </div>
  );
  
}

export default CreateCommentFormModal;
