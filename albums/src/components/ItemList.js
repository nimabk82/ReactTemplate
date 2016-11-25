import _ from 'lodash';
import React, {Component} from 'react';
import {ListView, RefreshControl, View, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import RowItem from './RowItem';
import {bindActionCreators} from 'redux';
import  {fetchData, emailChanged, getSalam} from '../actions';

const LoadingIndicator = ({loading}) => (
    loading ? (
        <View style={ styles.loading }>
            <ActivityIndicator
                animating={ true }
                style={[styles.loading]}
                size="large"
            />
        </View>
    ) : null
);

class ItemList extends Component {
    albums = [];

    createDataSource(items) {
      //  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(items);

      //  console.log(this.ds1);
        // albums = items;
        this.state = {
            pagination: {},
            albums:items,
            refreshing: false, canLoadMoreContent: false,
            dataSource: this.dataSource
        };
        console.log("datasource");
    }

    componentWillMount() {
        this.props.fetchData();
        // console.log(this.props);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.items);
        console.log("componentWillReceiveProps");
       console.log(nextProps.items);
       console.log('yass');
       console.log(this.state.albums);
        console.log(this.ds1);

    }

    renderRow(items) {
        return <RowItem items = {items} />;
    }

    render() {

        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
            />
        );
    }
}

const mapStateToProps = state => {
    //  this.items = _.map(state.items , function(items){
    //     return items;
    // });

    const items = state.items;
   // console.log(items);

    return {items};
};

export default connect(mapStateToProps, {fetchData})(ItemList);
