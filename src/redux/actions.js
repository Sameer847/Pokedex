// // src/redux/actions.js
// export const setSelectedType = (type) => {
//   return {
//     type: 'SET_SELECTED_TYPE',
//     payload: type,
//   };
// };


// // Correct action creator
// export const setSelectedGeneration = (generation) => ({
  
//     type: 'SET_SELECTED_GENERATION',
//     payload: generation,

// });


// actions.js
export const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE';
export const SET_SELECTED_GENERATION = 'SET_SELECTED_GENERATION';

export const setSelectedType = (type) => ({
  type: SET_SELECTED_TYPE,
  payload: type
});

export const setSelectedGeneration = (generation) => ({
  type: SET_SELECTED_GENERATION,
  payload: generation
});
