import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "corpcart-wishlist-items";

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedList = localStorage.getItem(STORAGE_KEY);
      return savedList ? JSON.parse(savedList) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const isInWishlist = currentItems.some((item) => item.id === product.id);

      if (isInWishlist) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: Number(product.price),
          image: product.image?.[0] || "/images/Logo.png",
        },
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  const clearWishlist = () => setWishlistItems([]);

  const value = useMemo(
    () => ({
      wishlistItems,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [wishlistItems],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
}
