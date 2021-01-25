import {SET_SORT_BY} from '@/redux/types/filters';

const initialState = {
  filterBy: 'popular',
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_BY:
      return {
        ...state,
        filterBy: action.label
      }
    default:
      return state;
  }
}

export default filters