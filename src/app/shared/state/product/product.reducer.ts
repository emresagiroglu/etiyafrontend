import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../../state/product/product.action';
import { Product } from '../../models/product/Product';

export interface ProductState {
  products: Product[];
  error: any;
}

export const initialState: ProductState = {
  products: [],
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(ProductActions.searchProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
