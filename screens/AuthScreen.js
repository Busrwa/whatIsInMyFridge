import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase'; // Firebase yapılandırman doğru import edildiğinden emin ol
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
//@Author: Busra Yacioglu

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Registration successful', userCredential.user.email);
        navigation.replace('Home'); // Kayıt olduktan sonra anasayfaya yönlendir
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Login successful', userCredential.user.email);
        navigation.replace('Home'); // Giriş yaptıktan sonra anasayfaya yönlendir
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={register}>Sign Up</Text>
      </View>
      <View style={[styles.button, styles.loginButton]}>
        <Text style={styles.buttonText} onPress={login}>Login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9f5f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2f8d7f',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    height: 40,
  },
  errorMessage: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#2f8d7f',
  },
});

export default AuthScreen;
