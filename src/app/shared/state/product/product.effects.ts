import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/productService/product.service';
import * as ProductActions from '../../state/product/product.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getAllProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.searchProducts),
      mergeMap((action) =>
        this.productService
          .searchProducts(action.productId, action.productName)
          .pipe(
            map((products) =>
              ProductActions.searchProductsSuccess({ products })
            ),
            catchError((error) =>
              of(ProductActions.loadProductsFailure({ error }))
            )
          )
      )
    )
  );
}
