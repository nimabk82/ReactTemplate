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

class AlbumList extends Component {
    albums = [];
    pageNumber = 1;


    componentWillReceiveProps (nextProps){
        this.createDataSource(nextProps);
        console.log("componentWillReceiveProps");
    }
    // constructor(props) {
    //     super(props);
    //     // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     //
    //     // this.state = {
    //     //     pagination: {},
    //     //     albums: this.albums,
    //     //     refreshing: false, canLoadMoreContent: false,
    //     //     dataSource: this.ds.cloneWithRows([])
    //     // console.log("constructor");
    //     // this.props.fetchData();
    //     // this.createDataSource(this.props);
    //
    //
    //
    // }

    componentWillMount() {

       // this.props.actions();
       // this.props.fetchData();
      //  const items = this.props;
        this.props.fetchData();
      //  this.createDataSource(this.props);

        //console.log(this.props.fetchData());
        //  console.log(this.props.items);
  //      this._getItemsRequest(this.props);
        //this._getItems(1)
        console.log("componentWillMount");
        console.log( this.props);
        this.createDataSource(this.props);


    }


    createDataSource({items}) {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            pagination: {},
            albums: this.albums,
            refreshing: false, canLoadMoreContent: false,
            dataSource: this.ds.cloneWithRows([items , 'loading'])
        }

        console.log("createDataSource");
        console.log(this.ds);

    }

    _onRefresh() {
        this.props.actions();
        //this.props.fetchData();
        const items = this.props;
        // console.log('manam');
        // console.log(items.items);
        //  console.log(this.props.items);
        this._getItemsRequest(this.props);

        // this.setState({refreshing: true});
        // setTimeout(() => {
        //     this._getItems(1);
        //     this.setState({refreshing: false});
        // }, 500);
    }

//Item loads from API, will mount, ya har ja dige ;)
    _getItems(page) {
        this._getItemsRequest()
        console.log("_getItems");

        axios.get('http://172.16.10.169/api/ads/' + page + '/10')
            .then(response => this.getPostsSuccess(response))
            .catch(error => this._getPostsFailure(error));
    }

//First Display loading
    _getItemsRequest(items) {
        const pagination = {...this.state.pagination, loading: true}
        this._update(pagination, items)
        console.log("_getItemsRequest");

    }

    //  _getItemsRequest() {
    //     const pagination = { ...this.state.pagination, loading: true }
    //     this._update(pagination, this.state.albums)
    // }

    _update(pagination, albums) {
        console.log("_update");

        const loading = {
            type: 'Loading',
            loading: pagination.loading
        };
        this.setState({
            pagination: pagination,
            albums: albums,
            dataSource: this.state.dataSource.cloneWithRows([...albums, loading])
        })
    }

    _onEndReached() {
        console.log("_onEndReached");

        const pagination = {loading: true};
        this.pageNumber += 1;
        this._getItems(this.pageNumber)
    }

    getPostsSuccess(response) {
        console.log("getPostsSuccess");

        const pagination = {loading: false};
        const albums = [...this.state.albums, ...response.data];

        setTimeout(() => {
            this._update(pagination, albums)
        }, 2000);
    }

    getPostsFailure(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        const pagination = {loading: false};
        this._update(pagination, this.state.albums);
        console.log(error);
        //throw error;
    }

//
    renderAlbums(data) {
        return <RowItem key={data.adid} album={data}/>
    }

    _renderRow(row) {

        if (row.type === 'Loading') {
            return <LoadingIndicator loading={ row.loading }/>
        } else {
            return (
                <RowItem key={row.adid} album={row}/>
            )
        }

        console.log("_renderRow");
    }

    // onEmailChange (test){
    //     this.props.emailChanged(text);
    // }
    //renderRow={(data) => this.renderAlbums(data)}
    render() {
         console.log(this.props);
         console.log("render");
        //  console.log(this.state.dataSource);
        return (
            <ListView
                refreshControl={ <RefreshControl refreshing={this.state.refreshing}
                                                 onRefresh={this._onRefresh.bind(this)} tintColor="#ff0000"
                                                 title="Loading..." titleColor="#00ff00"
                                                 colors={['#ff0000', '#00ff00', '#0000ff']}
                                                 progressBackgroundColor="#ffff00"/> }
                dataSource={this.state.dataSource}
                renderRow={ row => this._renderRow(row) }
                enableEmptySections={true}
                onEndReached={ () => this._onEndReached()}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#F5FCFF'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    desc: {
        fontSize: 13
    }
});

const mapStateToProps = state => {
    const items = _.map(state.items);
    console.log("mapStateToProps");
    console.log(items);
  //  const items = state.items;



    return {items};
};

// export default connect(mapStateToProps, (dispatch) => ({
//     actions: bindActionCreators(fetchData, dispatch)
// }))(AlbumList);

export default connect(mapStateToProps,{fetchData}) (AlbumList);
