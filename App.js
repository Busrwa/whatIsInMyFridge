import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/HomePage';  
import RecipeListScreen from './screens/RecipeListScreen';  
import RecipeDetailScreen from './screens/RecipeDetailScreen';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RecipeList" 
          component={RecipeListScreen} 
          options={{ title: 'Recipe Search' }} 
        />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetailScreen} 
          options={{ title: 'Recipe Detail' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
