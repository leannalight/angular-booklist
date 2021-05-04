import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BookState } from '../../store/book/book.reducer';
import { BookCreateAction, BookDeleteAction, BookEditAction } from '../../store/book/book.actions';
import { bookListSelector } from '../../store/book/book.selectors';
import { Observable } from 'rxjs';
import { Book } from '../../model/book';
import { BookSyncStorageService } from '../../service/book-sync-storage.service';

@Component({
  selector: 'app-book-widget',
  templateUrl: './book-widget.component.html',
  styleUrls: ['./book-widget.component.css']
})
export class BookWidgetComponent implements OnInit {

  bookList$: Observable<Book[]> = this.store$.pipe(select(bookListSelector));

  constructor(
    private store$: Store<BookState>,
    private bookSyncStorage: BookSyncStorageService
  ) { }

  ngOnInit() {
    this.bookSyncStorage.init();
  }

  onCreate(author: string, year: number, title: string, pages: number) {
    this.store$.dispatch(new BookCreateAction({ author, year, title, pages }));
  }

  onDelete(id: number) {
    this.store$.dispatch(new BookDeleteAction({ id }));
  }

  onEdit({ id, author, year, title, pages }) {
    this.store$.dispatch(new BookEditAction({ id, author, year, title, pages }));
  }
}
