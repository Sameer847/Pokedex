import { SET_SELECTED_TYPE, SET_SELECTED_GENERATION } from './actions';


// src/redux/reducer.js



const initialState = {
  selectedType: '',
  selectedGeneration: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_TYPE":
      return {
        ...state,
        selectedType: action.payload
      };
    case "SET_SELECTED_GENERATION":
      return { 
        ...state, 
        selectedGeneration: action.payload 
      };
    default:
      return state;
  }
};

export default reducer;
