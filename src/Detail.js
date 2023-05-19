import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  View,
  Props,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Text} from 'react-native-paper';

class Detail extends Component {
  render() {
    // console.log(this.props);

    const {navigation} = this.props;

    // const {title} = this.route.params;
    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    } = navigation.getParam('articleDetail');
    console.log(urlToImage);

    const BASE_URI = 'https://source.unsplash.com/random?sig=';
    return (
      <SafeAreaView>
        <Image
          style={{width: '100%', height: '50%'}}
          source={
            urlToImage !== null
              ? {uri: urlToImage}
              : require('../assets/images/img_not_available.png')
          }
        />
        <Text variant="headlineSmall">{title}</Text>
        <Text variant="labelLarge">{description}</Text>
        <Text variant="labelLarge">{content}</Text>
        {/* <Text>
          articleDetail: {JSON.stringify(navigation.getParam('articleDetail'))}
        </Text> */}
      </SafeAreaView>
    );
  }
}

export default Detail;
