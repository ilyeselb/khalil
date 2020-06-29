import { Component, OnInit } from '@angular/core';
import { transactionsDB } from 'src/app/shared/tables/transactions';
import { TransactionService } from 'src/app/shared/service/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public transactions = []

  constructor(public transactionservice :TransactionService) {
  }
  getall() {
    this.transactionservice.get().subscribe(data => {
      this.transactions = data;

    })
  }
  public settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      order_id: {
        title: 'Order Id', filter: false
      },
      _id: {
        title: 'Transaction Id', filter: false
      },
      user: {
        title: 'user', filter: false ,
        valuePrepareFunction: (data) => {
          return data.email;
      },
      },
      date: {
        title: 'Date', filter: false
      },
      amount: {
        title: 'Amount', filter: false
      }
    },
  };

  ngOnInit() {
    this.getall()
  }

}
