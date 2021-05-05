import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../model/book';
import { Observable } from 'rxjs';
import { Router } from'@angular/router';
import { select, Store } from '@ngrx/store';
import { BookState } from '../../store/book/book.reducer';
import { BookSyncStorageService } from '../../service/book-sync-storage.service';

@Component({
  selector: 'app-book-list-ui',
  templateUrl: './book-list-ui.component.html',
  styleUrls: ['./book-list-ui.component.css']
})
export class BookListUiComponent implements OnInit {
  editIds: number[] = [];

  @Input()
  bookList: Book[] = [];

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<{ id: number, author: string, year: number, title: string, pages: number }>();

  constructor(
    private store$: Store<BookState>,
    private bookSyncStorage: BookSyncStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onEditMode(id: number) {
    this.editIds.push(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onEdit(author: string, year: number, title: string, pages: number, id: number) {
    this.editIds = this.editIds.filter(item => item !== id);
    this.edit.emit({ id, author, year, title, pages });
  }

}
