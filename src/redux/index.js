import {combineReducers, createStore} from 'redux';
import filters from '@/redux/reducers/filters';
import pizzas from '@/redux/reducers/pizzas';
import category from '@/redux/reducers/category';

const rootReducer = combineReducers({
  filters,
  pizzas,
  category
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store