import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { ShopContext } from './utils/ShopContext.jsx'
import Item from "./utils/Item";
import { hasItem } from './utils/contextUtils.js';

const router = createBrowserRouter(routes);
const App = () => {
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  //Adding an item to the cart
  const addItem = (item, qty) => {
    if(qty) {
      const index = hasItem(item, cartItems);
      //If != -1, the index has been found
      if(index !== -1) {
        //Get the index of the item
        const newItem = cartItems[index];
        const originalQuantity = newItem.quantity;
        //Create array with the item removed
        const tempCart = cartItems.toSpliced(index,1);
        //Update quantity of the item
        newItem.quantity = newItem.quantity += qty; 
        //Create new array with updated item
        const newCart = tempCart.toSpliced(index,0,newItem);
        //Set states for cart items and item count
        setCartItems(newCart);
        setItemCount(itemCount + newItem.quantity - originalQuantity);

      } else {
        const newItem = new Item(item,qty);
        //Update states with new item
        setCartItems([...cartItems, newItem]);
        setItemCount(itemCount + qty);
      }
    }
  }
  //Deleting an item from the cart
  const removeItem = (item) => {
    //Find the target item index
    const index = hasItem(item, cartItems);
    //Update the state with a new array
    const newCart = cartItems.toSpliced(index, 1);
    setItemCount(itemCount - cartItems[index].quantity);
    setCartItems(newCart);
  }
  //Editing the quantity of an item from the cart
  const editItem = (item, add) => {
    if(add) {
      addItem(item, 1);
    } else {
      const index = hasItem(item, cartItems);
      if(cartItems[index].quantity) {
        addItem(item,-1);
      }
    }
  }
  return (
    <ShopContext.Provider value={{itemCount, cartItems, addItem, removeItem, editItem}}>
      <RouterProvider router = { router } />
    </ShopContext.Provider>
  )
}

export default App
