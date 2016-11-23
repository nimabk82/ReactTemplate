
import React from 'react';
import { AppRegistry , View } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList'

const App = () => {
  return(
    //we add flex because sometime when we scroll down the list it jump back to first element
    <View style={{flex:1}}>
      <Header headerText={'Albums'} />
    <AlbumList/>
    </View>
  );
};

AppRegistry.registerComponent('albums', () => App);
