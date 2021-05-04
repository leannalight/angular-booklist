import { BookCreateAction } from '../../store/book/book.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../../model/book';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookState } from '../../store/book/book.reducer';

@Component({
  selector: 'app-book-create-form-ui',
  templateUrl: './book-create-form-ui.component.html',
  styleUrls: ['./book-create-form-ui.component.css']
})
export class BookCreateFormUiComponent implements OnInit {
  bookForm: FormGroup;

  @Output()
  create = new EventEmitter<string>();

  constructor(private store: Store<BookState>) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      author: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      year: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      pages: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  onCreate() {
    if (this.bookForm.invalid) {
      return;
    }

    const book: Book = {
      author: this.bookForm.value.author,
      year: this.bookForm.value.year,
      title: this.bookForm.value.title,
      pages: this.bookForm.value.pages
    };

    this.store.dispatch(new BookCreateAction(book));
  }
}
