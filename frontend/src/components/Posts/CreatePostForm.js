import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPostThunk } from "../../store/posts";
import { loadOnePost } from "../../store/singlePost";


function CreatePostForm({ setShowPostModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const ownerId = useSelector((state) => state.session.user.id);
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const posts = useSelector((state) => state.posts)
  const [valErrors, setValErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      imgUrl,
      description,
      userId: ownerId,
    };
    
    let createdPost = await dispatch(createPostThunk(payload))

    if (createdPost) {
        dispatch(loadOnePost(createdPost.id));
        setShowPostModal(false);
        history.push(`/posts`);
    }
  };

  return (
    <div className="create-post-modal">
      <div className="modalHeader">
        <p>Create a Post</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <ul className="errors">
            {valErrors.length > 0
              ? valErrors.map((valError) => <li key={valError}>{valError}</li>)
              : null}
          </ul>
          <div>
            <label htmlFor="image">Image</label>
            <input
              value={imgUrl}
              type="url"
              name="image"
              multiple
              required
              onChange={(e) => setImgUrl(e.target.value)}
            ></input>
          </div>
          <div className="fieldDiv">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="create-post-button">
            <button disabled={valErrors.length > 0} type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;

