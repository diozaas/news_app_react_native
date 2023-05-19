import React, {useEffect, Component} from 'react';
import {Text} from 'react-native-paper';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  View,
  Props,
} from 'react-native';
import auth from '@react-native-firebase/auth';

class Main extends React.Component {
  // state = {currentUser: null, listArticles: null};
  state = {currentUser: null};

  componentDidMount() {
    const {currentUser} = auth();

    this.setState({currentUser});
  }

  render() {
    const {currentUser} = this.state;

    // useEffect(() => {
    //   getListData();
    // }, []);

    const API_KEY = 'd02fe6fcc72945c581d36dad7cd36aaa';
    const url = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${API_KEY}`;
    // console.log(url);

    async function getListData() {
      try {
        let response = await fetch(url);
        let body = await response.json();
        // listArticles = await body.articles;
        // console.log(body.articles);
        return body.articles;
      } catch (error) {
        console.error(error);
      }
    }

    // const allData = async () => getListData();
    console.log(getListData());

    return (
      <View style={styles.container}>
        <View>{}</View>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <TouchableOpacity
          onPress={() =>
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
          }
          style={styles.btn}>
          <Text>Logout</Text>
        </TouchableOpacity>
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
  btn: {
    marginTop: 10,
    backgroundColor: '#009387',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default Main;
