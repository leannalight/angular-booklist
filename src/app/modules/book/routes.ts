import { BookPageComponent } from './page/book-page/book-page.component';
import { Route } from '@angular/router';

export const bookRoutes: Route[] = [
  {
    path: '',
    component: BookPageComponent
  }
];
