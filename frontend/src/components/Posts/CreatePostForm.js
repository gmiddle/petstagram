// import React, { useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { createPostThunk } from "../../store/posts";
// import { loadOnePost } from "../../store/singlePost";


// function CreatePostForm({ setShowPostModal }) {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const ownerId = useSelector((state) => state.session.user.id);
//   const [imgUrl, setImgUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const posts = useSelector((state) => state.posts)
//   const [valErrors, setValErrors] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       imgUrl,
//       description,
//       userId: ownerId,
//     };
    
//     let createdPost = await dispatch(createPostThunk(payload))

//     if (createdPost) {
//         dispatch(loadOnePost(createdPost.id));
//         setShowPostModal(false);
//         history.push(`/posts`);
//     }
//   };

//   return (
//     <div className="create-post-modal">
//       <div className="modalHeader">
//         <p>Create a Post</p>
//       </div>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <ul className="errors">
//             {valErrors.length > 0
//               && valErrors.map((valError) => <li key={valError}>{valError}</li>)
//             }
//           </ul>
//           <div>
//             <label htmlFor="image">Image</label>
//             <input
//               value={imgUrl}
//               type="url"
//               name="image"
//               multiple
//               required
//               onChange={(e) => setImgUrl(e.target.value)}
//             ></input>
//           </div>
//           <div className="fieldDiv">
//             <label>Description</label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="create-post-button">
//             <button disabled={valErrors.length > 0} type="submit">
//               Post
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreatePostForm;


import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPostThunk, thunkGetAllPosts } from "../../store/posts";
import { loadOnePost } from "../../store/singlePost";
import { useFormik } from "formik"
import * as yup from "yup";
import { hideModal } from "../../store/modal";



function CreatePostForm({ setShowPostModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const posts = useSelector((state) => state.posts)
  const [valErrors, setValErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      description: "",
      imgUrl: "",
      userId: userId,
    },

    validationSchema: yup.object({
      description: yup.string().max(750, "Description must be between 0-750 characters!"),
      imgUrl: yup.string().url().min(5).max(2000).required("Must be a url!"),
      // imgUrl: yup.string().min(0).max(2000).required("imgUrl must be between 0-2000 characters"),
    }),

    onSubmit: async (values) => {
      dispatch(createPostThunk(values)).then(() =>
      dispatch(thunkGetAllPosts())
      )
      // dispatch(hideModal());
      setShowPostModal(false);
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
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          />{formik.touched.description && formik.errors.description ? (
            <div className="errorText">{formik.errors.description}</div>
          ) : null}
      </div>

      <div className="formField">
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
      </div>

      

    <div className="formField">
      <button type="submit">Submit</button>
    </div>
    </form>

  )
  
}

export default CreatePostForm;

