import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { fetchError, fetchSuccess } from "../features/users/userSlice";

function fetchDataApi() {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

function* fetchData() {
  try {
    const data = yield call(fetchDataApi);
    yield put(fetchSuccess(data));
  } catch (error) {
    yield put(fetchError(error.message));
  }
}

export function* watchFetchData() {
  yield takeEvery("user/fetchRequest", fetchData);
}
