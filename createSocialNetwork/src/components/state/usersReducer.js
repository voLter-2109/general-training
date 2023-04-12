const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_COUNT = "SET-TOTAL-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

let initialState = {
  users: [],
  pageSize: 5,
  totalCount: 0,
  currentPage: 1,
  isFetching: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: [
          ...state.users.map((user) => {
            if (user.id === action.userId) {
              return { ...user, followed: true };
            }
            return user;
          }),
        ],
      };

    case UNFOLLOW:
      return {
        ...state,
        users: [
          ...state.users.map((user) => {
            if (user.id === action.userId) {
              return { ...user, followed: false };
            }
            return user;
          }),
        ],
      };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_TOTAL_COUNT:
      // debugger;
      return {
        ...state,
        totalCount: action.totalCount,
      };

    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    default:
      return state;
  }
};

export const follow = (id) => {
  return {
    type: FOLLOW,
    userId: id,
  };
};
export const setTotalCount = (totalCount) => {
  return {
    type: SET_TOTAL_COUNT,
    totalCount: totalCount,
  };
};
export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching,
  };
};
export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};
export const unFollow = (id) => {
  return {
    type: UNFOLLOW,
    userId: id,
  };
};
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};

export default userReducer;
