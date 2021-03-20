import {
  ADD_PIZZA_TO_CART,
  DECRESE_ITEM_IN_CART,
  DELETE_ALL_ITEMS_IN_CART,
  INCREASE_ITEM_IN_CART,
  REMOVE_TYPE_ITEM_IN_CART
} from '../types/cart'
import {checkType, transformNumToStr} from '@/helpers/helpers';

const initialState = {
  cartItems: {},
  totalItems: 0,
  totalPrice: 0
}

function hasValueInArr(obj, value) {
 return Object.keys(obj).includes(transformNumToStr(value))
}

function computeItemValue(item, value, separate) {
  item.price += value
  item.count += separate
}

function objForBasicData(price) {
  return {
    price,
    count: 1,
    staticPrice: price
  }
}

function cartItemChange(action, state, separate) {
  const {infoObj} = action
  const {id, size, type, staticPrice, price, count} = infoObj
  const newItems = {...state.cartItems}
  const oldType = newItems[id].sizes[size][type]
  let directionPrice = separate < 0 ? -staticPrice : +staticPrice

  separate !== 'all' ? computeItemValue(oldType, directionPrice, separate)
    : computeItemValue(oldType, price, -count)

  if(!oldType.count) {
    delete newItems[id].sizes[size][type]
  }

  return {
    ...state,
    cartItems: newItems,
    totalPrice: checkType(separate) !== 'string' ? state.totalPrice + directionPrice
      : state.totalPrice +  -price,
    totalItems: checkType(separate) !== 'string' ? state.totalItems + +separate
      : state.totalItems + -count
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA_TO_CART:
      const {pizza, infoObj} = action
      const {id,price, ...data} = pizza
      const newItems = {...state.cartItems}

      if(!newItems[id]) {
        newItems[id] = data
        newItems[id].sizes = {
          [infoObj.size]: {
            [infoObj.type]: objForBasicData(price)
          }
        }
      } else {
        const sizes = newItems[id].sizes
        const currentSize = sizes[infoObj.size]
        
        if(hasValueInArr(sizes, infoObj.size)
          && currentSize[infoObj.type]) {
          computeItemValue(currentSize[infoObj.type], price, 1)
        } else if(!hasValueInArr(sizes, infoObj.size)) {
          newItems[id].sizes[infoObj.size] = {
            [infoObj.type]: objForBasicData(price)
          }
        } else if(hasValueInArr(sizes, infoObj.size)
          && !currentSize[infoObj.type]) {
          sizes[infoObj.size][infoObj.type] = objForBasicData(price)
        }
      }

      return {
        ...state,
        totalPrice: state.totalPrice + price,
        totalItems: state.totalItems + 1,
        cartItems: newItems
      }
    case DECRESE_ITEM_IN_CART: {
      return cartItemChange(action, state, -1)
    }
    case INCREASE_ITEM_IN_CART:
      return cartItemChange(action, state, +1)
    case DELETE_ALL_ITEMS_IN_CART:
      return {
        ...state,
        cartItems: {},
        totalItems: 0,
        totalPrice: 0
      }
    case REMOVE_TYPE_ITEM_IN_CART:
      return cartItemChange(action, state, 'all')
    default:
      return state
  }
}

export default cart