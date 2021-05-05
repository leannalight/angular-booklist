import { Action } from '@ngrx/store';
import { BookState } from './book.reducer';

export enum bookActionsType {
  create = '[BOOK] create book item',
  edit = '[BOOK] edit book item',
  delete = '[BOOK] delete book item',
  load = '[BOOK] load book state'
}

export class BookCreateAction implements Action {
  readonly type = bookActionsType.create;
  constructor(public payload: { author: string,
                                year: number,
                                title: string,
                                pages: number }) {
  }
}

export class BookDeleteAction implements Action {
  readonly type = bookActionsType.delete;
  constructor(public payload: { id: number }) {
  }
}

export class BookEditAction implements Action {
  readonly type = bookActionsType.edit;
  constructor(public payload: { id?: number,
                                author: string,
                                year: number,
                                title: string,
                                pages: number }) {
  }
}

export class BookLoadStateAction implements Action {
  readonly type = bookActionsType.load;
  constructor(public payload: { state: BookState }) {
  }
}

export type BookActions = BookCreateAction | BookDeleteAction | BookEditAction | BookLoadStateAction;
