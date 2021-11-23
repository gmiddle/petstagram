import { useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOnePost } from "../../store/singlePost";
import { loadOnePost } from "../../store/singlePost";
import { hideModal } from "../../store/modal";
import { getAllCommentsThunk } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";

const EditPostForm = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlePost);
  const userId = useSelector((state) => state.session.user.id);
  const [editImgUrl, setEditImgUrl] = useState(post.imgUrl);
  const [editDescription, setEditDescription] = useState(post.description);

  const handleEdit = (e) => {
    e.preventDefault();
    const payload = {
      imgUrl: editImgUrl,
      description: editDescription,
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
    dispatch(editOnePost(payload, post.id)).then(() =>
      dispatch(thunkGetAllPosts())
      
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
              value={imgUrl}
              type="file"
              id="input"
              multiple
              onChange={(e) => setImgUrl(e.target.value)}
            ></input>
          </div> */}
            <div>
              <label htmlFor="image">Image</label>
              <input
                value={editImgUrl}
                type="url"
                name="image"
                multiple
                required
                onChange={(e) => setEditImgUrl(e.target.value)}
              ></input>
            </div>
            <div className="fieldDiv">
              <label>Description</label>
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
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