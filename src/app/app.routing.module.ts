import { BookCreateFormUiComponent } from './modules/book/ui/book-create-form-ui/book-create-form-ui.component';
import { BookListItemEditUiComponent } from './modules/book/ui/book-list-item-edit-ui/book-list-item-edit-ui.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'add',
    component: BookCreateFormUiComponent,
  },
   {
    path: 'edit/:id',
    component: BookListItemEditUiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
