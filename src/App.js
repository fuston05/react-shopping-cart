import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { useLocalStorage } from './hooks/useLocalStorage';

import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

//styles
import './sass/global.scss';

function App() {
  const [cart, setCart] = useLocalStorage('Cart', []);
  const [products] = useState(data);

  console.log('cart onload:', cart);

  const addItem = item => {
    // add the given item to the cart
    let isDuplicate = false;
    cart.forEach(ele => {
      if (ele.id === item.id) { //if item is already in cart, stop duplicates
        isDuplicate = true;
        alert(`You already have "${item.title}" in you cart`);
      }//end if
    })
    if(!isDuplicate){
      setCart([...cart, item]);
    }

  };//end addItem

  const removeItem = id => {
    const newArr = cart.filter(item => item.id !== id);
    setCart(newArr);
    console.log('removeItem id: ', id);
  };//end removeItem

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route
            path="/cart"
            render={() => <ShoppingCart cart={cart} />}
          />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
