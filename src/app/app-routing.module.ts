import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: 'books/library', component: LibraryComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users/order', component: OrderComponent, canActivate: [AuthenticationGuard]},
  { path: 'users/all-orders', component: OrdersComponent, canActivate: [AuthorizationGuard]},
  { path: 'books/return', component: ReturnBookComponent, canActivate: [AuthorizationGuard]},
  { path: 'users/list', component: UsersListComponent, canActivate: [AuthorizationGuard]},
  { path: 'books/maintenance', component: ManageBooksComponent, canActivate: [AuthorizationGuard]},
  { path: 'books/categories', component: ManageCategoriesComponent, canActivate: [AuthorizationGuard] },
  { path: 'users/profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
