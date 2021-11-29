// import { useState, } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { editOnePost } from "../../store/singlePost";
// import { loadOnePost } from "../../store/singlePost";
// import { hideModal } from "../../store/modal";
// import { getAllCommentsThunk } from "../../store/comments";
// import { thunkGetAllPosts } from "../../store/posts";

// const EditPostForm = ({ setIsEditing }) => {
//   const dispatch = useDispatch();
//   const post = useSelector((state) => state.singlePost);
//   const userId = useSelector((state) => state.session.user.id);
//   const [editImgUrl, setEditImgUrl] = useState(post.imgUrl);
//   const [editDescription, setEditDescription] = useState(post.description);

//   const handleEdit = (e) => {
//     e.preventDefault();
//     const payload = {
//       imgUrl: editImgUrl,
//       description: editDescription,
//       userId: userId,
//     };
//     // const err = [];

//     // if (editReview.length < 2) {
//     //   const error = "Your review must be at least 2 characters long";
//     //   err.push(error);
//     // }
//     // if (errors.length === 0) {
//     //   const editedCheckin = {
//     //     checkinId: checkin.id,
//     //     review: editReview,
//     //     rating: editRating,
//     //   };
//     dispatch(editOnePost(payload, post.id)).then(() =>
//       dispatch(thunkGetAllPosts())
      
//     );

   
//     dispatch(hideModal());
//     // setIsEditing(false);
//   };
//   // setErrors(err);
  
//     return (
//       <div className="create-post-modal">
//         <div className="modalHeader">
//           <p>Update</p>
//         </div>
//         <div>
//           <form onSubmit={handleEdit}>
//             {/* <ul className="errors">
//              {valErrors.length > 0
//                ? valErrors.map((valError) => <li key={valError}>{valError}</li>)
//                : null}
//            </ul> */}
//             {/* <div className="fieldDiv">
//             <label>Photo</label>
//             <input
//               value={imgUrl}
//               type="file"
//               id="input"
//               multiple
//               onChange={(e) => setImgUrl(e.target.value)}
//             ></input>
//           </div> */}
//             <div>
//               <label htmlFor="image">Image</label>
//               <input
//                 value={editImgUrl}
//                 type="url"
//                 name="image"
//                 multiple
//                 required
//                 onChange={(e) => setEditImgUrl(e.target.value)}
//               ></input>
//             </div>
//             <div className="fieldDiv">
//               <label>Description</label>
//               <input
//                 type="text"
//                 value={editDescription}
//                 onChange={(e) => setEditDescription(e.target.value)}
//               />
//             </div>
//             <div className="createEventButton">
//               <button type="submit">Update Post</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
  
// };

// export default EditPostForm;

import { useSelector, useDispatch } from "react-redux";
import { editOnePost } from "../../store/singlePost";
import { hideModal } from "../../store/modal";
// import "./CreatePostForm.css";
import { setCurrentModal } from "../../store/modal";
import CreateCommentFormModal from "../Comments/CreateCommentFormModal";
import { showModal } from "../../store/modal";
import { loadOnePost } from "../../store/singlePost";
import * as yup from "yup";
import { useFormik } from "formik";
import { thunkGetAllPosts } from "../../store/posts";

const EditPostForm = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlePost);
  const userId = useSelector((state) => state.session.user.id);
//   const [editCaption, setEditCaption] = useState(post.description);

  const formik = useFormik({
    initialValues: {
      description: post.description,
      userId,
    },
    validationSchema: yup.object({
      description: yup
        .string().max(750, "Caption must be less than 750 characters"),
    }),

    onSubmit: (values, { setSubmitting }) => {
      dispatch(editOnePost(values, post.id)).then(() =>
      dispatch(thunkGetAllPosts()).then(() =>   
      dispatch(loadOnePost(post.id)).then(() =>
      dispatch(setCurrentModal(CreateCommentFormModal))
      )));
      
      dispatch(showModal());
    },
  });

  return (
    <div className="createPostModal">
      <div className="modalHeader">
        <h2 className="createPostHeader">Update</h2>
      </div>
      <div>
        <div className="closeModal" onClick={() => dispatch(hideModal())}>
          x
        </div>
        <form className="createPostContainer" onSubmit={formik.handleSubmit}>
          <div className="fieldDiv">
            <textarea
              id="description"
              name="description"
              type="text"
              rows="8"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <div className="errorText">{formik.errors.description}</div>
          ) : null}
          <button
           
            className="addPostImageLabel"
            type="submit"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;