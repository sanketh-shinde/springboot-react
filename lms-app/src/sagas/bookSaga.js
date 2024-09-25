import { call, put, takeEvery } from "redux-saga/effects";
import { getAllBooks } from "../services/bookService";
import { fetchBooksError, fetchBooksSuccess } from "../features/book/bookSlice";

async function fetchBooksApi() {
  try {
    const response = await getAllBooks();
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function* fetchBooks() {
  try {
    const data = yield call(fetchBooksApi);
    yield put(fetchBooksSuccess(data));
  } catch (error) {
    yield put(fetchBooksError(error.message));
  }
}

export function* watchFetchBooks() {
  yield takeEvery("book/fetchBooksRequest", fetchBooks);
}
