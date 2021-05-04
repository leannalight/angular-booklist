import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOK_REDUCER_NODE, BookState } from './book.reducer';

export const bookFeatureSelector = createFeatureSelector<BookState>(BOOK_REDUCER_NODE);

export const bookListSelector = createSelector(
  bookFeatureSelector,
  state => state.bookList
);
export const getBookById = createSelector(
  bookFeatureSelector,
  bookListSelector,
  (bookList) => {
    return bookList ? bookList['book.id'] : null;
  }
);
