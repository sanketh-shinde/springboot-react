import { call, put, takeEvery } from "redux-saga/effects";
import { loginUser } from "../services/authService";
import { fetchUserError, fetchUserSuccess } from "../features/user/userSlice";

const fetchUserApi = async (user) => {
  try {
    const response = await loginUser(user);
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

function* fetchUser(action) {
  try {
    const data = yield call(fetchUserApi, action.payload);
    yield put(fetchUserSuccess(data));
    action.navigate();
  } catch (error) {
    yield put(fetchUserError(error.message));
  }
}

export function* watchFetchUser() {
  yield takeEvery("user/fetchUserRequest", fetchUser);
}
