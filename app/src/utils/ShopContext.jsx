import { createContext } from "react";

export const ShopContext = createContext({
    itemCount: 0,
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    editItem: () => {},
    userId: null,
    setUserId: () => {},
    userName: "",
    setUserName: () => {},
    admin: null,
    setAdmin: () => {}
});