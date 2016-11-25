import React, {Component} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import {connect} from 'react-redux';
import * as actions from '../actions';

//here first we receive the prop that we passed from Albumlist
class RowItem extends Component {

    render() {

        const { adid } = this.props.items;
        console.log(this.props);
        console.log("rowItem");
        return (
            <Card>
                <CardSection>
                    <Text style={styles.titleStyle}>
                        {adid}
                    </Text>
                </CardSection>
            </Card>

        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default RowItem;
