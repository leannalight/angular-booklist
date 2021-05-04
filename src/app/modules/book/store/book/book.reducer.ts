import { Book } from '../../model/book';
import { BookActions, bookActionsType } from './book.actions';

export const BOOK_REDUCER_NODE = 'book';

export interface BookState {
  idIncrement: number;
  bookList: Book[];
}

const initialState: BookState = {
  idIncrement: 1,
  bookList: []
};

export const bookReducer = (state = initialState, action: BookActions) => {
  switch (action.type) {
    case bookActionsType.create:
      return {
        ...state,
        idIncrement: state.idIncrement + 1,
        bookList: [
          ...state.bookList,
          {
            id: state.idIncrement,
            author: action.payload.author,
            year: action.payload.year,
            title: action.payload.title,
            pages: action.payload.pages,
          }
        ]
      };

    case bookActionsType.edit:
      return {
        ...state,
        bookList: state.bookList.map(book => book.id === action.payload.id ? {
          ...book,
          author: action.payload.author,
          year: action.payload.year,
          title: action.payload.title,
          pages: action.payload.pages
        } : book)
      };
    case bookActionsType.delete:
      return {
        ...state,
        bookList: state.bookList.filter(book => book.id !== action.payload.id),
      };
    case bookActionsType.load:
      return {
        ...action.payload.state
      };
    default:
      return state;
  }
};
