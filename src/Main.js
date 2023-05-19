import React, {useEffect, Component} from 'react';
import {Text} from 'react-native-paper';
import Article from './Article';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  View,
  Props,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';

class Main extends React.Component {
  // state = {currentUser: null, listArticles: null};
  state = {currentUser: null, articles: [], refreshing: true};

  componentDidMount() {
    const {currentUser} = auth();

    this.setState({currentUser});
    this.fetchNews();
  }

  getListData = async () => {
    const API_KEY = 'd02fe6fcc72945c581d36dad7cd36aaa';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
      let result = await fetch(url).then(response => response.json());
      return result.articles;
    } catch (error) {
      console.error(error);
    }
  };

  fetchNews = () => {
    this.getListData()
      .then(articles => {
        this.setState({articles, refreshing: false});
      })
      .catch(() => this.setState({refreshing: false}));
  };

  handleRefresh = () => {
    this.setState({refreshing: true}, () => this.fetchNews());
  };

  render() {
    const {currentUser} = this.state;
    // console.log(this.state.articles);

    return (
      <View style={styles.container}>
        <Text style={styles.txt}>
          Halo, {currentUser && currentUser.email}!
        </Text>
        <TouchableOpacity
          onPress={() =>
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
          }
          style={styles.btn}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.articles}
          renderItem={({item}) => (
            <Article
              article={item}
              onPress={() => {
                this.props.navigation.navigate('Detail', {articleDetail: item});
              }}
            />
          )}
          keyExtractor={item => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {margin: 10},
  btn: {
    marginTop: 10,
    backgroundColor: '#009387',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default Main;
