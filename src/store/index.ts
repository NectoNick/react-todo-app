import { createStore } from 'redux';

import { rootReducer } from './root-reducer';
import { initialState } from './root-state';


const store = createStore(rootReducer, initialState);

export { store };
