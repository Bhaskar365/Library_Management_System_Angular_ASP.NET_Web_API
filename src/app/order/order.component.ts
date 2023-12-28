import { Component, OnInit } from '@angular/core';
import { Order } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  listOfOrders: Order[] = [];
  colums: string[] = ['id','name','bookid','book','date','returned',];

  constructor(public api:ApiService){}

  ngOnInit() {

    let userid = this.api.getTokenUserInfo()?.id??0;
    this.api.getOrdersOfUser(userid).subscribe({
        next: (res:Order[]) => {
            console.log(res);
            this.listOfOrders = res;
        },
        error: (err:any)=>console.log(err),
    });
  }

}
