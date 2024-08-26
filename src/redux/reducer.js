// src/redux/reducer.js
const initialState = {
  selectedType: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_SELECTED_TYPE':
          return {
              ...state,
              selectedType: action.payload,
          };
      default:
          return state;
  }
};

export default reducer;
