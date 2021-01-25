import {SET_CATEGORY_BY} from '@/redux/types/category';

const initialState = {
  activeCategoryName: null
}

const category = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_BY:
      return {
        ...state,
        activeCategoryName: action.category
      }
    default:
      return state
  }
}

export default category