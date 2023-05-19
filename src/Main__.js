import {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const API_KEY = 'd02fe6fcc72945c581d36dad7cd36aaa';
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  const getListData = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        let data = res.articles;
        setList(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.txtHeader}>List Barang</Text>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  txtHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemList: {
    paddingVertical: 15,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  txtName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
