import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as shareReducer } from '../pages/share/store';

const reducer = combineReducers({
	header: headerReducer,
	home: homeReducer,
	share: shareReducer
})

export default reducer
