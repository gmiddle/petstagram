import { useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPost } from "../../store/posts";
// import { loadOnePost } from "../../store/individualpost";
import { hideModal } from "../../store/modal";
// import { getAllCommentsThunk } from "../../store/comments";
import { getAllPostsThunk } from "../../store/posts";

const EditPostForm = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.individualPost);
  const userId = useSelector((state) => state.session.user.id);
  const [editImageUrl, setEditImageUrl] = useState(post.imageUrl);
  const [editCaption, setEditCaption] = useState(post.caption);

  const handleEdit = (e) => {
    e.preventDefault();
    const payload = {
      imageUrl: editImageUrl,
      caption: editCaption,
      userId: userId,
    };
    // const err = [];

    // if (editReview.length < 2) {
    //   const error = "Your review must be at least 2 characters long";
    //   err.push(error);
    // }
    // if (errors.length === 0) {
    //   const editedCheckin = {
    //     checkinId: checkin.id,
    //     review: editReview,
    //     rating: editRating,
    //   };
    dispatch(editPost(payload, post.id)).then(() =>
      dispatch(getAllPostsThunk())
      
    );

   
    dispatch(hideModal());
    // setIsEditing(false);
  };
  // setErrors(err);
  
    return (
      <div className="createEventModal">
        <div className="modalHeader">
          <p>Update</p>
        </div>
        <div>
          <form onSubmit={handleEdit}>
            {/* <ul className="errors">
             {valErrors.length > 0
               ? valErrors.map((valError) => <li key={valError}>{valError}</li>)
               : null}
           </ul> */}
            {/* <div className="fieldDiv">
            <label>Photo</label>
            <input
              value={imageUrl}
              type="file"
              id="input"
              multiple
              onChange={(e) => setImageUrl(e.target.value)}
            ></input>
          </div> */}
            <div>
              <label htmlFor="image">Image</label>
              <input
                value={editImageUrl}
                type="url"
                name="image"
                multiple
                required
                onChange={(e) => setEditImageUrl(e.target.value)}
              ></input>
            </div>
            <div className="fieldDiv">
              <label>Caption</label>
              <input
                type="text"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
              />
            </div>
            <div className="createEventButton">
              <button type="submit">Update Post</button>
            </div>
          </form>
        </div>
      </div>
    );
  
};

export default EditPostForm;