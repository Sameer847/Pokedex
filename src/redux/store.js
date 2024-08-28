// src/redux/store.js
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;

// store.js
// import { createStore, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk'; // Correct import (named export)
// import reducer from './reducer';

// const store = createStore(
//   reducer,
//   applyMiddleware(thunk)
// );

// export default store;



