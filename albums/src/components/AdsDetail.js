import React , {Component} from 'react';
import {View , Text, Image , Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

//here first we receive the prop that we passed from Albumlist
const AdsDetail = ({album}) => {
    //here we only get those elements that we need and remove props.album from the view tags
    const { adid , adName, adImage } = album;
    //here we only get those elements that we need and remove style. from the view tags
    const { thumbnailStyle, headerContentStyle,thumbnailContainerStyle,headerTextStyle,imageStyle} = styles;

    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                <Image style={thumbnailStyle} source={ {uri: adImage} } />
                </View>

                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{adName}</Text>
                    <Text>{adid}</Text>
                </View>
            </CardSection>

        <CardSection>
            <Image style={imageStyle} source={{ uri: adImage}} />
        </CardSection>

        <CardSection>
             <Button>
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

export default AdsDetail;
