import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count,setCount] = useState(0);

  function ContadorSuma(){
    setCount(count => count + 1);
  }


  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    ContadorSuma();

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      return setCart(updatedCart);
    }

    return setCart([...cart, { ...product, quantity: 1 }]);
  };

  function ContadorResta(){
    setCount(count => count - 1);
  }

  function ContadorRemove(cantidad){
    setCount(count => count - cantidad);
  }

  
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
    ContadorRemove(product.quantity);
  };


  const clearCart = () => {
    setCount(count => count - count);
    setCart([]);
  };

  const increaseQuantity = (product) => {
    ContadorSuma();
    setCart(cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (product) => {
    ContadorResta();
    setCart(cart.map((item) =>
      item.id === product.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  return (
    <CartContext.Provider value={{
      cart,
      count,
      addToCart,
      removeFromCart,
      clearCart,
      increaseQuantity,
      decreaseQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
};
