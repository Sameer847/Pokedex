// src/redux/actions.js
export const setSelectedType = (type) => {
  return {
    type: 'SET_SELECTED_TYPE',
    payload: type,
  };
};
