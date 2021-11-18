import {csrfFetch} from "./csrf"

const GET_ALL_POSTS = "posts/LOAD";


const actionGetAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}


export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await csrfFetch("/api/posts")

    if (response.ok) {
        let posts = await response.json()
    
        dispatch(actionGetAllPosts(posts))
    }
}


const initialState = {}
export default function postReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_POSTS:
            const allPosts = {};
                action.posts.forEach((post) => {
                    allPosts[post.id] = post
                })
                return { ...state, ...allPosts}
                default:
                    return state;
            
    }
}


