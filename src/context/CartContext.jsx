import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "corpcart-cart-items";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: Number(product.price),
          image: product.image?.[0] || "/images/Logo.png",
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (id, nextQuantity) => {
    setCartItems((currentItems) => {
      if (nextQuantity <= 0) {
        return currentItems.filter((item) => item.id !== id);
      }

      return currentItems.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  const clearCart = () => setCartItems([]);

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      itemCount,
      subtotal,
    }),
    [cartItems, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
