import React from 'react';
import CartItem from './Cartitem';

const Cart = (props) => {
  const { prodcuts } = props;
  return (
    <div className="cart">
      {prodcuts.map((product) => {
        return (
          <CartItem
            product={product}
            key={product.id}
            onIncreaseQuantity={props.onIncreaseQuantity}
            onDecreaseQuantity={props.onDecreaseQuantity}
            onDeleteProduct={props.onDeleteProduct}
          />
        )
      })}
    </div>
  );
}

export default Cart;