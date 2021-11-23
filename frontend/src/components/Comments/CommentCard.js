import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import PostCard from "../Posts/PostCard";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import { loadOnePost } from "../../store/singlePost";
import { useDispatch } from "react-redux";
import CreateCommentFormModal from "./CreateCommentFormModal";
import { setCurrentModal, showModal } from "../../store/modal";



function CommentCard({ post }) {
    const dispatch = useDispatch();
    // const [postDetailModal, setPostDetailModal] = useState(false);
    const numberOfComments = post?.Comments?.length;
    const [comments, setComments] = useState({})

    // IFFE
    useEffect(() => {
        (()=>{
        const com = dispatch(loadOnePost(post.id))
        setComments(com.Comments)
        })()
    }, []);

  const handleSubmit = async () => {
      await dispatch(loadOnePost(post.id));
      await dispatch(setCurrentModal(CreateCommentFormModal));
      await dispatch(showModal())
  };

  const anyComments = () => {
    // console.log("this is post from commentCard", post.id)
    if (numberOfComments) {
      return `View all ${numberOfComments} comments`;
    } else {
      return `View post details`;
    }
  };
  

  return (
    <>
      <div className="anyComments" onClick={handleSubmit}>
        {anyComments()}
      </div>
    </>
  );
}

export default CommentCard;
