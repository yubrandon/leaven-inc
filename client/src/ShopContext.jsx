import { createContext } from "react";

export const ShopContext = createContext({
    itemCount: 0,
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    editItem: () => {}
});