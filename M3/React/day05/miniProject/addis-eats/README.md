
## Structure
```
src/
  hooks/useFetch.js        custom hook (abort on cleanup)
  hooks/useCart.js         useContext wrapper
  cart/cartReducer.js      pure reducer: add, remove, clear
  cart/cartReducer.check.js
  cart/CartContext.js
  cart/CartProvider.jsx    useReducer + Provider (+ derived total)
  Menu.jsx                 hook + context + filter together
  components/              Header, CartBadge, CategoryBar, DishList, Dish, CheckoutPanel, OrderForm, Footer
```
