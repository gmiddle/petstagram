import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOnePost } from "../../store/singlePost";
import "./EditCommentForm.css";
import { editCommentThunk, getAllCommentsThunk, getOneCommentThunk } from "../../store/comments";
import { useFormik } from "formik"
import * as yup from "yup";


const EditCommentForm = ({ comment }) => {
  const dispatch = useDispatch();
  const [editComment, setEditComment] = useState(comment.content);
//   const userId = useSelector((state) => state.session?.user?.id);
  const [show, setShow] = useState(true);
  const [isClicked, setIsClicked] = useState(false)
  const post = useSelector((state) => state.singlePost);
//   const myComment = useSelector((state) => state.comments)
  const ownerId = useSelector((state) => state.session.user.id);
  const userId = useSelector((state) => state.session.user.id);  
  // const commentList = useSelector((state) => state.posts[post.id].Comments)
  // const filteredComments = commentList.filter((ele) => ele.postId === post.id)
  // const commentList = useSelector((state) => state.posts[post.id].Comments)
  
  
  // const updateSetShow = (e) => {
  //   show ? setShow(false) : setShow(true);
  //   setIsClicked(true)
  //   // dispatch(getOneCommentThunk(comment.id))
  // };
  const updateSetShow = (e) => {
    if (!formik.errors.comment) {
      show ? setShow(false) : setShow(true);
      setIsClicked(true);
    }
  };


  // const updateDetails = (e) => {
  //   setEditComment(e.target.value);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     content: editComment,
  //     id: comment.id,
  //     postId: post.id
  //   };
    
    
  //   await dispatch(editCommentThunk(payload));
  //   await dispatch(getAllCommentsThunk(post.id))
  //   dispatch(loadOnePost(post.id))
  //   // dispatch(hideModal());
  //   updateSetShow();
  // };

  const formik = useFormik({
    initialValues: {
      id: comment.id,
      content: editComment,
      // userId: userId,
      // postId: post.id
    },

    validationSchema: yup.object({
      content: yup.string().min(1).max(2000).required("Comment must be between 1-2000 characters!"),
      // imgUrl: yup.string().url().min(1).max(2000).required("Must be a url!"),
      // imgUrl: yup.string().min(0).max(2000).required("imgUrl must be between 0-2000 characters"),
    }),

    onSubmit: async (values) => {
      await dispatch(editCommentThunk(values))
      await dispatch(getAllCommentsThunk(post.id))
      await dispatch(loadOnePost(post.id))
      setIsClicked(false)
      // .then(() => dispatch(getAllCommentsThunk()))
      // dispatch(hideModal());
      // setShowCommentModal(false);
      updateSetShow()
    },
  })

  // console.log("this is formik", formik)

  return (
    <div>
      {ownerId === comment.userId ? (
                        
        // <button
        //   className={`editButton ${show ? null : "hidden"}`}
        //   onClick={updateSetShow}
        //   // disabled={isClicked}
        // >
        //   EDIT
        // </button>
        <i
        className={`far fa-edit editButton ${show ? null : "hidden"}`}
        onClick={updateSetShow}
        ></i>
      ) : null }

      {isClicked && (
        <div>
          {/* <textarea
            maxLength="2000"
            type="text"
            required
            name="editComment"
            value={editComment}
            onChange={updateDetails}
            className={`editButton ${show ? "hidden" : null}`}
          ></textarea> */}

          <form onSubmit={formik.handleSubmit}>
            <div className="formField">
              {/* <label htmlFor="content"></label> */}
              <textarea
                // maxLength="2000"
                // required
                id="content"
                name="content"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
                placeholder="Edit Comment"
                className={`editButton ${show ? "hidden" : null}`}
                ></textarea>
                {formik.touched.content && formik.errors.content ? (
                  <div className="errorText">{formik.errors.content}</div>
                ) : null}
            </div>
            <button
              // onClick={handleSubmit}
              type="submit"
              // onClick={updateSetShow}
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
          {/* <div className="formField">
            <button type="submit">Submit</button>
          </div> */}
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCommentForm;
