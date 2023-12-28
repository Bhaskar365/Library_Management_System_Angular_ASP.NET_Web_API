import { Component } from '@angular/core';
import { SideNavItem } from '../models/models';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  sideNavContent: SideNavItem[] = [
    {
       title: 'View Books',
        link: 'books/library', 
    },
    {
      title:'Manage Books',
      link:'books/maintenance',
    },
    {
      title:'Manage Categories',
      link:'books/categories',
    },
    {
      title:'Return Book',
      link:'books/return',
    },
    {
      title:'View Users',
      link:'users/list',
    },
    {
      title:'All Orders',
      link:'users/all-orders',
    },
    {
      title:'My Orders',
      link:'users/order'
    }
];

}
