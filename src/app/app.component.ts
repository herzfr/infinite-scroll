import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Product } from './model/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'testing-ukur';
  productList: Product[] = [];
  listArray: Product[] = [];
  sum = 10;
  direction = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {
    this.productService.getProduct().subscribe((res) => {
      this.productList = res;
      this.addItems();
    });
  }
  ngOnInit(): void {
    // console.log();
  }

  convertToCurrenct(val: number) {
    return new Intl.NumberFormat('us-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(val);
  }

  onScrollDown(ev: any) {
    if (this.listArray.length <= this.productList.length) {
      this.sum += 10;
      this.addItems();

      this.direction = 'scroll down';
    }
  }

  addItems() {
    for (let i = 0; i < this.sum; ++i) {
      this.listArray.push(this.productList[i]);
    }
  }

  deleteItem(idx: number) {
    let data = this.listArray[idx].title;
    this.listArray.splice(idx, idx + 1);
    this.openSnackBar('Berhasil menghapus ' + data);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Tutup', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
