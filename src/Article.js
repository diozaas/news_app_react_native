import * as React from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Text, Card, Divider} from 'react-native-elements';
import moment from 'moment';

// import defaultImage from '../assets/image/news-placeholder.png';

class Article extends React.Component {
  render() {
    // const navigation = useNavigation();
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url,
      author,
      content,
    } = this.props.article;

    const time = moment(publishedAt || moment.now()).fromNow();

    return (
      <TouchableHighlight>
        <Card>
          <Card.Title>{title}</Card.Title>
          <Card.Image
            source={
              urlToImage !== null
                ? {uri: urlToImage}
                : require('../assets/images/img_not_available.png')
            }></Card.Image>
          <Text style={{marginBottom: 10}}>
            {description || 'Read more...'}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.onPress()}>
            <Text style={{color: '#FFF'}}>Read more ...</Text>
          </TouchableOpacity>
          <Divider style={{backgroundColor: '#dfe6e9'}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                margin: 5,
                fontStyle: 'italic',
                color: '#b2bec3',
                fontSize: 10,
              }}>
              {source.name.toUpperCase()}
            </Text>
            <Text
              style={{
                margin: 5,
                fontStyle: 'italic',
                color: '#b2bec3',
                fontSize: 10,
              }}>
              {time}
            </Text>
          </View>
        </Card>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#0A61D3',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Article;
