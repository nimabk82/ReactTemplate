import React , {Component} from 'react';
import {ListView,Text,RefreshControl,View,StyleSheet,ActivityIndicator} from 'react-native';
import Card from './Card';
import axios from 'axios';
import AlbumDetail from './AlbumDetail' //the paht is short because abbumdetail is in same directorty as Albumlist
import RouteDetail from './RouteDetail' //the paht is short because abbumdetail is in same directorty as Albumlist
import AdsDetail from './AdsDetail' //the paht is short because abbumdetail is in same directorty as Albumlist

const LoadingIndicator = ({ loading }) => (
  loading ? (
    <View style={ styles.loading }>
      <ActivityIndicator
        animating={ true }
        style={[ styles.loading ]}
        size="large"
        />
    </View>
  ) : null
)

class AlbumList extends Component {
  albums = [];
  pageNumber = 1;

  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //  this.state = { albums: this.albums ,dataSource : this.ds.cloneWithRows([]),refreshing: false ,canLoadMoreContent :false };

    //const pagination = { ...this.state.pagination, loading: true }

    this.state = {
      pagination:{},
      albums: this.albums,
      refreshing: false ,canLoadMoreContent :false,
      dataSource : this.ds.cloneWithRows([])
    }
  }

  componentWillMount(){
    this._getItems(1)
    //  axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    //   axios.get('http://172.16.10.169/api/Routes/1/10')
    // axios.get('http://172.16.10.169/api/ads/1/10')
    // .then((response) => {
    //   this.albums =  response.data;
    //   this.setState({ albums: response.data });
    //   this.setState({
    //     dataSource: this.ds.cloneWithRows(response.data),
    //   });
    //   console.log("willMount");
    // })
    // .catch(function(error) {
    //   console.log('There has been a problem with your fetch operation: ' + error.message);
    //   // ADD THIS THROW error
    //   throw error;
    // });
  }

  pullRefreshRenderAlbums(data){
    axios.get('http://172.16.10.169/api/ads/2/10')
    .then((response) => {
      this.setState({ albums: response.data });
      this.setState({
        dataSource: this.ds.cloneWithRows(response.data),
      });
      console.log("pullToRefresh");
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
    return <AdsDetail key={data.adid} album={data} />
  }

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(()=>{
      this._getItems(1)
      this.setState({refreshing: false});
    }, 500);
  }

//Item loads from API, will mounth, ya har ja dige ;)
  _getItems(page) {
     this._getItemsRequest()

     axios.get('http://172.16.10.169/api/ads/' + page +'/10')
      .then(response => this.getPostsSuccess(response))
      .catch(error => this._getPostsFailure(error));
 }

//First Display loading
  _getItemsRequest() {
     const pagination = { ...this.state.pagination, loading: true }
     this._update(pagination, this.state.albums)
 }

 _update(pagination, albums) {
     const loading = {
       type: 'Loading',
       loading: pagination.loading
     }
     this.setState({
       pagination: pagination,
       albums: albums,
       dataSource: this.state.dataSource.cloneWithRows([ ...albums, loading ])
     })
 }

  _onEndReached() {
    const pagination = { loading: true }
    this.pageNumber += 1;
    this._getItems(this.pageNumber)
  }

  getPostsSuccess(response){
    const pagination = { loading: false }
    const albums = [ ...this.state.albums, ...response.data ]

    setTimeout(()=>{
      this._update(pagination, albums)
    }, 2000);


    // this.setState({albums: this.albums.push.apply(this.albums,response.data)});
    // this.setState({dataSource: this.ds.cloneWithRows([this.albums, loading])});
  }

  getPostsFailure(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    const pagination = { loading: false }
    this._update(pagination, this.state.albums)
    console.error(error)
    //throw error;
  }
//
  renderAlbums(data){
    return <AdsDetail key={data.adid} album={data} />
  }

  _renderRow(row) {
    if (row.type === 'Loading') {
      return <LoadingIndicator loading={ row.loading } />
    } else {
      return (
        <AdsDetail key={row.adid} album={row} />
      )
    }
  }
  //renderRow={(data) => this.renderAlbums(data)}
  render () {
    console.log(this.state.albums);
    console.log(this.state.dataSource);
    return (
      <ListView
        refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} tintColor="#ff0000" title="Loading..." titleColor="#00ff00" colors={['#ff0000', '#00ff00', '#0000ff']} progressBackgroundColor="#ffff00" /> }
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
})

export default AlbumList;
