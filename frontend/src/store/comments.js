import { csrfFetch } from "./csrf";

const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment,
  };
};

const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment,
  };
};

export const getAllCommentsThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/getAll/${id}`);
  const data = await res.json();
  console.log("DATA", data)
  dispatch(getComments(data));
};

export const createCommentThunk = (payload) => async (dispatch) => {
  // console.log("this is the payload", payload)
  const response = await csrfFetch(`/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const comment = await response.json();
    // console.log("this is the comment", comment)
    dispatch(addComment(comment));
    
    return comment;
  }
};

export const editCommentThunk = (payload) => async (dispatch) => {
  const { id } = payload;
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
    console.log("RES", res)
  if (res.ok) {
    let editedComment = await res.json();
    dispatch(editComment(editedComment));
  }
};

export const deleteCommentThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteComment(id));
  }
};

const initialState = {};
export default function commentsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_COMMENTS:
      const allComments = {};
      action.comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      return { ...state, ...allComments };
    case ADD_COMMENT:
      // console.log("this is the action.comment", action.comment)
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    case EDIT_COMMENT:
      for (let post in newState) {
        if (newState[post].id === action.comment.postId) {
          for (let comment in newState[post].Comments) {
            if (newState[post].Comments[comment].id === action.comment.id) {
              newState[post].Comments[comment] = action.comment;
            }
          }
        }
      }

      return newState;
    case DELETE_COMMENT: {
      const newState = { ...state };
      delete newState[action.comment];
      return newState;
    }
    default:
      return state;
  }
}
