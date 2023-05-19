import React from 'react';
import {Text, TextInput} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';

class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleSignUp = () => {
    console.log('handleSignUp');

    if (this.state.email === '' || this.state.password === '') {
      ToastAndroid.show('Please fill email and password', ToastAndroid.SHORT);
    } else {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  render() {
    const image = {
      uri: 'https://img.freepik.com/free-vector/earth-blue-wave-background_1017-36678.jpg?w=2000',
    };

    return (
      <View style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="stretch"
          style={styles.image}>
          <Text variant="headlineSmall" style={styles.txt}>
            Sign Up
          </Text>
          {this.state.errorMessage && (
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          )}
          <TextInput
            label="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            mode="outlined"
          />
          <TextInput
            secureTextEntry
            label="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            mode="outlined"
            right={<TextInput.Icon icon="eye" />}
          />
          <TouchableOpacity style={styles.btn} onPress={this.handleSignUp}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Already have an account? Login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  txt: {
    justifyContent: 'center',
    // width: '30%',
    marginLeft: 130,
    marginRight: 130,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    // width: '100%',
  },
  textInput: {
    height: 40,
    // width: '90%',
    // borderColor: 'gray',
    // marginTop: 8,
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
