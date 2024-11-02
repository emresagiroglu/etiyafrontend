import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product/Product';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const searchProducts = createAction(
  '[Product] Search Products',
  props<{ productId?: string; productName?: string }>()
);
export const searchProductsSuccess = createAction(
  '[Product] Search Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);
