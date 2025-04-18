import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { ShopContext } from './utils/ShopContext.jsx'
import Item from "./utils/Item";


const router = createBrowserRouter(routes);
const App = () => {
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
//change to receiving an item if using id
  const hasItem = (name) => {
    //Return the index of the item if found
    return cartItems.findIndex((pair, index) => {
      return (pair.name === name);
    }) 
  };
  //Adding an item to the cart
  const addItem = (item, qty) => {
    if(qty) {
      const found = hasItem(item.title);
      //If != -1, the index has been found
      if(found !== -1) {
        //Get the index of the item
        const newItem = cartItems[found];
        const originalQuantity = newItem.quantity;
        //Create array with the item removed
        const tempCart = cartItems.toSpliced(found,1);
        //Update quantity of the item
        newItem.quantity = newItem.quantity += qty; 
        //Create new array with updated item
        const newCart = tempCart.toSpliced(found,0,newItem);
        //Set states for cart items and item count
        setCartItems(newCart);
        setItemCount(itemCount + newItem.quantity - originalQuantity);

      } else {
        const newItem = new Item(item.title,qty);
        //Update states with new item
        setCartItems([...cartItems, newItem]);
        setItemCount(itemCount + qty);
      }
    }
    //console.log(cartItems);
  }
  //Deleting an item from the cart
  const removeItem = (item) => {
    //Find the target item index
    const found = hasItem(item.title);
    //Update the state with a new array
    const newCart = cartItems.toSpliced(found, 1);
    setCartItems(newCart);

  }
  //Editing the quantity of an item from the cart
  const editItem = (item, qty, add) => {
    if(add) {
      
    }
  }
  return (
    <ShopContext.Provider value={{itemCount, cartItems, addItem, removeItem, editItem}}>
      <RouterProvider router = { router } />
    </ShopContext.Provider>
  )
}

export default App
