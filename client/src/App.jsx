import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { ShopContext } from './ShopContext.jsx'
import Item from "./Item";


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
    console.log(qty);
    if(qty) {
      const found = hasItem(item.title);
      //If != -1, the index has been found
      if(found !== -1) {
        //Get the index of the item
        const tempItem = cartItems[found];
        //Create array with the item removed
        const tempCart = cartItems.toSpliced(found,1);
        //Update quantity of the item
        tempItem.quantity = tempItem.quantity += qty; 
        //Create new array with updated item
        const newCart = tempCart.toSpliced(found,0,tempItem);
        //Set states for cart items and item count
        setCartItems(newCart);
        setItemCount(itemCount + tempItem.quantity);

      } else {
        const newItem = new Item(item.title,qty);
        //Update state with new item
        setCartItems([...cartItems, newItem]);
      }
    }
    console.log(cartItems);
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
