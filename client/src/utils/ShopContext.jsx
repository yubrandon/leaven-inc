import { createContext } from "react";

export const ShopContext = createContext({
    itemCount: 0,
    cartItems: [],
    cache:[],
    addItem: () => {},
    removeItem: () => {},
    editItem: () => {}
});