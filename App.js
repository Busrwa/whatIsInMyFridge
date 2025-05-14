import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import HomePage from './components/HomePage';
import RecipeListScreen from './screens/RecipeListScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import AuthScreen from './screens/AuthScreen';
import ProfileUpdate from './screens/ProfileUpdate';
//@Author: Busra Yacioglu

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => console.log('Logout successful!'))
      .catch((error) => console.error('Logout error:', error));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Auth'}>
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RecipeList" 
          options={{ title: 'Recipe Search' }}
        >
          {(props) => <RecipeListScreen {...props} userEmail={user?.email} />}
        </Stack.Screen>
        <Stack.Screen 
          name="RecipeDetail" 
          options={{ title: 'Recipe Detail' }}
        >
          {(props) => <RecipeDetailScreen {...props} userEmail={user?.email} />}
        </Stack.Screen>
        <Stack.Screen 
          name="ProfileUpdate" 
          component={ProfileUpdate} 
          options={{ title: 'Update Profile' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
