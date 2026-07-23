export interface Product {
  id: string;
  categoryId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface CartItem extends Product {
  CartQuantity: number;
}