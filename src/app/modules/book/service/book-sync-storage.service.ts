import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BookState } from '../store/book/book.reducer';
import { bookFeatureSelector } from '../store/book/book.selectors';
import { filter } from 'rxjs/operators';
import { BookLoadStateAction } from '../store/book/book.actions';

export const BOOK_LOCALSTORAGE_KEY = 'book';

@Injectable({
  providedIn: 'root'
})
export class BookSyncStorageService {
  private isInit = false;

  constructor(private store$: Store<BookState>) { }

  init() {
    if (this.isInit) {
      return;
    }

    this.isInit = true;
    this.loadFromStorage();

    this.store$.pipe(
      select(bookFeatureSelector),
      filter(state => !!state)
    ).subscribe(state => {
      localStorage.setItem(BOOK_LOCALSTORAGE_KEY, JSON.stringify(state));
    });

    window.addEventListener('storage', () => this.loadFromStorage());
  }

  private loadFromStorage() {
    const storageState = localStorage.getItem(BOOK_LOCALSTORAGE_KEY);
    if (storageState) {
      this.store$.dispatch(new BookLoadStateAction({
        state: JSON.parse(storageState)
      }));
    }
  }
}
