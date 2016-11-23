import React , {Component} from 'react';
import {View , Text, Image , Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

//here first we recieve the prop that we passed from Albumlist
const AlbumDetail = ({album}) => {
  //here we only get those elements that we need and remove props.album from the view tags
  const { title, artist, thumbnail_image, image, url } = album;
  //here we only get those elements that we need and remove style. from the view tags
  const { thumbnailStyle, headerContentStyle,thumbnailContainerStyle,headerTextStyle,imageStyle} = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={ {uri: thumbnail_image} }
            />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image style={imageStyle} source={{ uri: image}} />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(url)} >
          BUY NOW
        </Button>
      </CardSection>

    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle:{
    fontSize:18
  },

  thumbnailStyle:{
    width:50,
    height:50
  },
  thumbnailContainerStyle:{
    justifyContent : 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle:{
    width:null,
    height:300,
    flex:1
  }
}

export default AlbumDetail;
