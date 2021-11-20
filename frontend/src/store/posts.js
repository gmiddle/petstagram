// import {csrfFetch} from "./csrf"

// const GET_ALL_POSTS = "posts/LOAD";


// const actionGetAllPosts = (posts) => {
//     return {
//         type: GET_ALL_POSTS,
//         posts
//     }
// }


// export const thunkGetAllPosts = () => async (dispatch) => {
//     const response = await csrfFetch("/api/posts")

//     if (response.ok) {
//         let posts = await response.json()
    
//         dispatch(actionGetAllPosts(posts))
//     }
// }


// const initialState = {}
// export default function postReducer(state = initialState, action) {
//     let newState = { ...state }
//     switch (action.type) {
//         case GET_ALL_POSTS:
//             const allPosts = {};
//                 action.posts.forEach((post) => {
//                     allPosts[post.id] = post
//                 })
//                 return { ...state, ...allPosts}
//                 default:
//                     return state;
            
//     }
// }


import { csrfFetch } from './csrf';

const LOAD = "posts/LOAD";
const ADD = "posts/ADD";
const REMOVE = "posts/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (post) => ({
  type: ADD,
  post,
});

const remove = (postId) => ({
  type: REMOVE,
  postId,
});

// export const getPosts = (userId) => async (dispatch) => {
//   const response = await fetch(`/api/posts/user/${userId}`, {
//     method: 'GET',
//     headers: {'Content-Type': 'application/json'}
//   })
//   if (response.ok) {
//     const posts = await response.json();
//     dispatch(load(posts));
//     return posts
//   }
// }

export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await csrfFetch("/api/posts", {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        let posts = await response.json()
    
        dispatch(load(posts))
        return posts
    }
}

// export const createPostThunk = (post) => async (dispatch) => {
//   const { name, userId } = post;
//   const response = await csrfFetch("/api/posts", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name,
//       userId
//     }),
//   });
//   const data = await response.json();
//   dispatch(add(data));
//   return data;
// }

export const createPostThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (response.ok) {
      const newPost = await response.json();
      dispatch(add(newPost));
      return newPost;
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/delete/${postId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(remove(postId));
    return postId;
  }
}

export const editPost = (formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/update/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(add(post));
  }
}

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let post of action.list) {
        newState[post.id] = post;
      }
      return newState;
    case ADD:
      return { ...state, [action.post.id]: action.post };
    case REMOVE:
      const newPosts = { ...state };
      delete newPosts[action.postId];
      return newPosts;
    default:
      return state;
  }
};



export default postReducer;
