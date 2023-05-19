import * as React from 'react';
import {Text, TextInput} from 'react-native-paper';
import {
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  View,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';

class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');

    if (this.state.email === '' || this.state.password === '') {
      ToastAndroid.show('Please fill email and password', ToastAndroid.SHORT);
    } else {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('Logged In');
        })
        .catch(error => {
          // if (error.code === 'auth/email-already-in-use') {
          //   console.log('That email address is already in use!');
          // }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
  render() {
    // const image = {uri: 'https://reactjs.org/logo-og.png'};
    const image = {
      uri: 'https://img.freepik.com/free-vector/earth-blue-wave-background_1017-36678.jpg?w=2000',
    };

    return (
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text variant="headlineSmall" style={styles.txt}>
            Login
          </Text>
          {this.state.errorMessage && (
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          )}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            label="Email"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            mode="outlined"
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            label="Password"
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            mode="outlined"
            right={<TextInput.Icon icon="eye" />}
          />
          <TouchableOpacity style={styles.btn} onPress={this.handleLogin}>
            <Text style={{color: '#FFF'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    // width: '100%',
  },
  txt: {
    justifyContent: 'center',
    // width: '30%',
    marginLeft: 150,
    marginRight: 150,
  },
  textInput: {
    height: 40,
    // width: '90%',
    // borderColor: 'gray',
    // borderWidth: 1,
    margin: 10,
  },
  btn: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#0A61D3',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Login;
