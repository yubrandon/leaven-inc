import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { ShopContext } from './ShopContext.jsx'


const router = createBrowserRouter(routes);

const App = () => {
  const [itemCount, setItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const addItem = (item, qty) => {
    /*setItemCount(itemCount + qty);
    if(cartItems.includes(item)) {

    }
    setCartItems(cartItems.concat());*/
  }
  const removeItem = () => {

  }
  const editItem = () => {

  }
  return (
    <ShopContext.Provider value={{itemCount, cartItems, addItem, removeItem, editItem}}>
      <RouterProvider router = { router } />
    </ShopContext.Provider>
  )
}

export default App
