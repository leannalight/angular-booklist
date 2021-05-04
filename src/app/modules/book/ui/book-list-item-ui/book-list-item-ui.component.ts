import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../model/book';

@Component({
  selector: 'app-book-list-item-ui',
  templateUrl: './book-list-item-ui.component.html',
  styleUrls: ['./book-list-item-ui.component.css']
})
export class BookListItemUiComponent implements OnInit {

  @Input()
  book: Book;

  @Output()
  delete = new EventEmitter<void>();

  @Output()
  edit = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
