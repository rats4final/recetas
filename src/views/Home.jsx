import * as React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  Section,
  Image,
  Alert,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import InsertarReceta from './InsertarReceta';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Este si es el home</Text>
      <Button title='Insertar' onPress={()=>navigation.navigate('Crear una receta')}/>
    </View>
  );
};

const styles = StyleSheet.create({}); // usa tailwind bro

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Crear una receta" component={InsertarReceta} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
