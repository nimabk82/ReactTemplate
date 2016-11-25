
import React from 'react';
import { AppRegistry , View } from 'react-native';
import {Provider} from 'react-redux';
import {createStore ,applyMiddleware} from 'redux';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';
import ItemList from './src/components/ItemList';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';


const App = () => {
  return(
    //we add flex because sometime when we scroll down the list it jump back to first element
    <Provider store={createStore(reducers ,applyMiddleware(ReduxThunk))}>
      <View style={{flex:1}}>
        <Header headerText={'Albums'} />
      <ItemList/>
      </View>
    </Provider>
  );
};

AppRegistry.registerComponent('albums', () => App);
