import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CharactersScreen from './screens/CharactersScreen';
import SpellsScreen from './screens/SpellsScreen';
import PotionsScreen from './screens/PotionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTransparent: true, title:''}} />
        <Stack.Screen name="Characters" component={CharactersScreen} />
        <Stack.Screen name="Spells" component={SpellsScreen} />
        <Stack.Screen name="Potions" component={PotionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}