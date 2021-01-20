import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const fetchUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));
};

export const fetchUser = (userId) => (dispatch) =>
  UserAPIUtil.getUser(userId)
    .then((user) => dispatch(receiveUser(user)))
    .then((err) => console.log(err));
