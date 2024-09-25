import { all } from "redux-saga/effects";
import { watchFetchBooks } from "./bookSaga";
import { watchFetchUser } from "./userSaga";

export function* rootSaga() {
  yield all([watchFetchBooks(), watchFetchUser()]);
}
