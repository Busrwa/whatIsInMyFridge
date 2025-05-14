import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';

const HomePage = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('RecipeList');
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigation.replace('Auth');
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  };

  const handleProfile = () => {
    navigation.navigate('ProfileUpdate');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Profil butonu ve yazısı - logo.png'nin üstünde ve sola yaslı */}
        <TouchableOpacity style={styles.profileRow} onPress={handleProfile}>
          <Feather name="user" size={24} color="#2f8d7f" style={{ marginRight: 8 }} />
          <Text style={styles.profileText}>Profile Update</Text>
        </TouchableOpacity>

        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
          <Text style={styles.secondaryButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fdfb',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // sola yasla
    marginBottom: 50, // logo ile araya boşluk
    backgroundColor: '#e0f2ef',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 2,
  },
  profileText: {
    fontSize: 16,
    color: '#2f8d7f',
    fontWeight: '600',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomePage;
