import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BOOK_REDUCER_NODE, bookReducer } from './store/book/book.reducer';
import { BookPageComponent } from './page/book-page/book-page.component';
import { Routes, RouterModule } from '@angular/router';
import { bookRoutes } from './routes';
import { BookWidgetComponent } from './widget/book-widget/book-widget.component';
import { BookCreateFormUiComponent } from './ui/book-create-form-ui/book-create-form-ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookListUiComponent } from './ui/book-list-ui/book-list-ui.component';
import { BookListItemUiComponent } from './ui/book-list-item-ui/book-list-item-ui.component';
import { BookListItemEditUiComponent } from './ui/book-list-item-edit-ui/book-list-item-edit-ui.component';

const routes: Routes = [
  {
    path: '',
    component: BookListUiComponent,
    children: [
      { path: 'add', component: BookCreateFormUiComponent },
      {
        path: 'edit/:id',
        component: BookListItemEditUiComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    BookPageComponent,
    BookWidgetComponent,
    BookListUiComponent,
    BookCreateFormUiComponent,
    BookListItemEditUiComponent,
    BookListItemUiComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(BOOK_REDUCER_NODE, bookReducer),
    RouterModule.forChild(bookRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BookWidgetComponent
  ]
})
export class BookModule { }
