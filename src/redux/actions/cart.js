import {
  ADD_PIZZA_TO_CART,
  DECRESE_ITEM_IN_CART,
  DELETE_ALL_ITEMS_IN_CART,
  INCREASE_ITEM_IN_CART,
  REMOVE_TYPE_ITEM_IN_CART
} from '../types/cart'

export const addPizzaToCart = (pizza, infoObj) => ({
  type: ADD_PIZZA_TO_CART,
  pizza,
  infoObj
})

export const decreaseItemInCart = (infoObj = {}) => ({
  type: DECRESE_ITEM_IN_CART,
  infoObj
})

export const increaseItemInCart = (infoObj) => ({
  type: INCREASE_ITEM_IN_CART,
  infoObj
})

export const deleteAllItemsInCart = () => ({
  type: DELETE_ALL_ITEMS_IN_CART
})

export const removeTypeInCart = (infoObj) => ({
  type: REMOVE_TYPE_ITEM_IN_CART,
  infoObj
})