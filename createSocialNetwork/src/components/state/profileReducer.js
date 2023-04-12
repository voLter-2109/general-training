const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
  posts: [
    { id: 1, message: "hi" },
    { id: 2, message: "YO" },
    { id: 3, message: "Helloy" },
    { id: 4, message: "World" },
  ],
  newPostText: "hi",
  profile: null,
  myProfile: true,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: action.id,
            message: state.newPostText,
          },
        ],
        newPostText: "",
      };

    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return state;
  }
};

export const addPostActionCreator = (id) => {
  return {
    type: ADD_POST,
    id: id,
  };
};
export const updatNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};
export const setUserProfile = (profile) => {
  console.log(1);
  return {
    type: SET_USER_PROFILE,
    profile: profile,
  };
};

export default profileReducer;
