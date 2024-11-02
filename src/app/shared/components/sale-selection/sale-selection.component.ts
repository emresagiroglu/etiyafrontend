import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductService } from '../../services/productService/product.service';
import * as ProductActions from '../../state/product/product.action';
import { selectAllProducts } from '../../state/product/product.selectors';
import { FormGroup, FormControl } from '@angular/forms';

import { TabsComponent } from '../tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ButtonComponent } from '../button/button.component';
import { CampaingTableComponent } from '../campaing-table/campaing-table.component';
import { OfferTableComponent } from '../offer-table/offer-table.component';

@Component({
  selector: 'app-sale-selection',
  standalone: true,
  imports: [
    TabsComponent,
    CommonModule,
    ProductTableComponent,
    ButtonComponent,
    CampaingTableComponent,
    OfferTableComponent,
  ],
  templateUrl: './sale-selection.component.html',
  styleUrls: ['./sale-selection.component.scss'],
})
export class SaleSelectionComponent implements OnInit {
  tabs: string[] = ['Catalog', 'Campaign', 'Offer'];
  activeTab: number = 0;
  products$: any; // products$’ı burada tanımladık ancak henüz başlatmadık
  searchForm: FormGroup;

  constructor(
    private productService: ProductService,
    private store: Store // store burada constructor’da tanımlandı
  ) {
    this.searchForm = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectAllProducts);
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.store.dispatch(ProductActions.loadProductsSuccess({ products }));
    });
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  searchClick() {
    const productId = this.searchForm.get('productId')?.value;
    const productName = this.searchForm.get('productName')?.value;
    const searchTerm = productId || productName;

    if (searchTerm) {
      this.productService.searchProducts(searchTerm).subscribe((products) => {
        this.store.dispatch(ProductActions.loadProductsSuccess({ products }));
      });
    }
  }

  addToCart() {
    console.log('Carta eklendi');
  }

  clearCart() {
    console.log('cart bilgileri silindi');
  }
}
