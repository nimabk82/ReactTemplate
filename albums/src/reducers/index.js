import  {combineReducers} from 'redux';
import ItemReducer from './ItemReducer';

export default combineReducers({
    items : ItemReducer
});
