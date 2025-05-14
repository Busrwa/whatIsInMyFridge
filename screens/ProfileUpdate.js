import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase'; // Firebase authentication importu
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from 'firebase/auth'; // Şifre ve hesap silme işlemleri
//@Author: Busra Yacioglu

const ProfileUpdate = ({ navigation }) => { // 🔁 navigation prop'u eklendi
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordUpdate = () => {
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            setSuccessMessage('Password updated successfully!');
            setErrorMessage('');
          })
          .catch((error) => {
            setErrorMessage('An error occurred while updating the password. ' + error.message);
          });
      })
      .catch((error) => {
        setErrorMessage('The current password is incorrect. ' + error.message);
      });
  };

  // 🔴 Yeni Fonksiyon: Hesabı Sil
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const user = auth.currentUser;
            deleteUser(user)
              .then(() => {
                setSuccessMessage('Your account has been deleted.');
                setErrorMessage('');
                navigation.replace('Auth'); // 🔁 Auth ekranına yönlendirme
              })
              .catch((error) => {
                setErrorMessage('Error deleting account: ' + error.message);
              });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Your Password</Text>

      {/* Mevcut Şifre */}
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      {/* Yeni Şifre */}
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {/* Hata veya Başarı Mesajı */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      {/* Şifreyi Güncelleme Butonu */}
      <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      {/* 🔴 Hesabı Silme Butonu */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
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
  deleteButton: { // 🔴 Yeni stil
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 20,
  },
  successText: {
    color: '#388E3C',
    fontSize: 14,
    marginBottom: 20,
  },
});

export default ProfileUpdate;
