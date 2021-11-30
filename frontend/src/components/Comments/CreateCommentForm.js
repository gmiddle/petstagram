// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCommentThunk } from "../../store/comments";
// // import { loadOnePost } from "../../store/singlePost";
// import { getAllCommentsThunk } from "../../store/comments";
// import { thunkGetAllPosts } from "../../store/posts";



// function CreateCommentForm({post}) {
//   const dispatch = useDispatch();
//   const ownerId = useSelector((state) => state?.session?.user?.id);
//   const [content, setContent] = useState("");
//   const [valErrors, setValErrors] = useState([]);
// //   const comments = useSelector((state) => state.comments);
// //   const postId = posts[posts.id]?.Comments
      
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       content,
//       userId: ownerId,
//       postId: post.id
//     };

//     // console.log("this is the content before dispatch", content)
//     dispatch(createCommentThunk(payload)).then(() => 
//     dispatch(getAllCommentsThunk(post.id))).then(()=> 
//     dispatch(thunkGetAllPosts()));
//     setContent("")
  
//   };

//   return (
//     <div className="">
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div className="fieldDiv">
//             <input
//               placeholder="Add a comment..."
//               type="text"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             />
//           </div>
//           <div className="createEventButton">
//             <button type="submit">
//               Post
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateCommentForm;



import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { createCommentThunk, getAllCommentsThunk, getOneCommentThunk } from "../../store/comments";
import { useFormik } from "formik"
import * as yup from "yup";
import "./CreateCommentForm.css"
// import { hideModal } from "../../store/modal";



function CreateCommentForm({ post }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  const postId = useSelector((state) => state.singlePost.id)
  // const [imgUrl, setImgUrl] = useState("");
  // const [description, setDescription] = useState("");
  // const comments = useSelector((state) => state.comments)
  // const [valErrors, setValErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      content: "",
      userId: userId,
      postId: post.id
    },

    validationSchema: yup.object({
      content: yup.string().max(2000).required("Comment must be between 0-2000 characters!"),
      // imgUrl: yup.string().url().min(1).max(2000).required("Must be a url!"),
      // imgUrl: yup.string().min(0).max(2000).required("imgUrl must be between 0-2000 characters"),
    }),

    onSubmit: async (values) => {
      dispatch(createCommentThunk(values))
      formik.values.content = ""
      // .then(() => dispatch(getAllCommentsThunk()))
      // dispatch(hideModal());
      // setShowCommentModal(false);
    },
  })

  // for AWS later:
  // <div className="formField">
  //   <label htmlFor="logo">Logo</label>
  //       <input id="logo" name="logo" type="file" onChange={(event) => {
  //   formik.setFieldValue("logo", event.currentTarget.files[0]);
  // }} />
  //       {formik.touched.logo && formik.errors.logo ? (
  //         <div className="errorText">{formik.errors.logo}</div>
  //       ) : null}
  // </div>

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="formField">
        <label htmlFor="content"></label>
        <input
          className="addComment-input"
          id="content"
          name="content"
          type="text"
          placeholder="Add a comment"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
          />{formik.touched.content && formik.errors.content ? (
            <div className="errorText">{formik.errors.content}</div>
          ) : null}
        <button type="submit" className="comment-submit-button">Submit</button>
      </div>

      {/* <div className="formField">
        <label htmlFor="imgUrl">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imgUrl}
          />{formik.touched.imgUrl && formik.errors.imgUrl ? (
            <div className="errorText">{formik.errors.imgUrl}</div>
          ) : null}
      </div> */}
    </form>

  )
  
}

export default CreateCommentForm;
