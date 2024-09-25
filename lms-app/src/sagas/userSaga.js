import { call, put, takeEvery } from "redux-saga/effects";
import { loginUser } from "../services/authService";
import { fetchUserError, fetchUserSuccess } from "../features/user/userSlice";

function fetchUserApi(user) {
  return loginUser(user)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    })
    .catch((error) => console.log(error));
}

function* fetchUser(action) {
  try {
    const data = yield call(fetchUserApi, action.payload);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(fetchUserError(error.message));
  }
}

export function* watchFetchUser() {
  yield takeEvery("user/fetchUserRequest", fetchUser);
}
