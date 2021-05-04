import { BookEditAction } from '../../store/book/book.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../../model/book';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookState } from '../../store/book/book.reducer';
import { Subscription } from 'rxjs';
import { getBookById } from '../../store/book/book.selectors';

@Component({
  selector: 'app-book-list-item-edit-ui',
  templateUrl: './book-list-item-edit-ui.component.html',
  styleUrls: ['./book-list-item-edit-ui.component.css'],
})
export class BookListItemEditUiComponent implements OnInit {
  bookForm: FormGroup;
  book: Book;
  bookSubscription: Subscription;

  // @Input()
  // book: Book;

  @Output()
  edit = new EventEmitter<string>();

  constructor(private store: Store<BookState>, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.store.select(getBookById).subscribe((book) => {
      if (book) {
        this.book = book;
        this.bookForm.patchValue({
          author: book.author,
          year: book.year,
          title: book.title,
          pages: book.pages,
        });
      }
    });
  }

  createForm() {
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

  onEdit() {
    if (this.bookForm.invalid) {
      return;
    }

    const author = this.bookForm.value.author;
    const year = this.bookForm.value.year;
    const title = this.bookForm.value.title;
    const pages = this.bookForm.value.pages;

    const book: Book = {
      id: this.book.id,
      author,
      year,
      title,
      pages
    };

    //dispatch the action
    this.store.dispatch(new BookEditAction(book));
    this.router.navigate(['../../']), { relativeTo: this.router };
  }

  ngOnDestroy() {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }
}
