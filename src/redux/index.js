import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import filters from '@/redux/reducers/filters';
import pizzas from '@/redux/reducers/pizzas';
import category from '@/redux/reducers/category';
import thunk from 'redux-thunk';
import cart from '@/redux/reducers/cart';

const rootReducer = combineReducers({
  filters,
  pizzas,
  category,
  cart
})

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
  )

export default store