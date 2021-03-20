import {SET_PIZZAS} from '@/redux/types/pizzas';
import * as axios from 'axios';

export const setPizzas = (pizzas) => ({type: SET_PIZZAS, payload: pizzas})
export const setPizzasByCategory = (category, sort) => async (dispatch) => {
  console.log(category)
  const res = await axios.get(`http://localhost:3004/pizzas?${
    category === null ? '' : `category=${category}`
  }&_sort=${sort}`)

  dispatch(setPizzas(res.data))
}