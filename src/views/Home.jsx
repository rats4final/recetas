import {useEffect, useState} from 'react';
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
import { Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const Home = () => {
  const [user, setUser] = useState({});
  const [recetas, setRecetas] = useState([]);
  // const [searchText, setSearchText] = useState('');
  // const [filteredRecetas, setFilteredRecetas] = useState([]);

  
  console.log(user);
  //console.log(url);
  
  const getUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');
    const usuarioJson = JSON.parse(usuario);
    setUser(usuarioJson);
    const url = `${API_URL}recetas/usuario/${usuarioJson.id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setRecetas(data.data);
  };


  useEffect(() => {
    getUser();
  }, []);

  const navigation = useNavigation();
  return (
    <View>
      <SearchBar/>
      <ScrollView>
      {recetas.map(receta => (
        <Card 
          key={receta.id}
        >
          <Card.Title title={receta.nombre} />
          <Card.Cover source={{uri: receta.thumbnail.url}} />
          <Card.Content>
            <Paragraph>{receta.instrucciones}</Paragraph>
          </Card.Content>
        </Card>
      ))}
      </ScrollView>
      <Button title='Insertar' onPress={()=>navigation.navigate('Crear una receta')}/>
    </View>
  );
};

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Tus Recetas" component={Home} />
      <HomeStack.Screen name="Crear una receta" component={InsertarReceta} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;

/*

En la mayoría de los casos, no deberías necesitar confiar en el valor inmediatamente actualizado del estado. Si necesitas realizar alguna acción después de que se haya actualizado el estado, puedes usar el hook useEffect para programar esa acción.

Por ejemplo, en tu caso, necesitas llamar a getRecetas después de que user se haya actualizado. En lugar de tratar de hacer esto inmediatamente después de llamar a setUser, puedes usar useEffect para programar getRecetas para que se ejecute después de que el estado user se haya actualizado.

useEffect(() => {
  // Esto se ejecuta después de que el estado `user` se ha actualizado.
  getRecetas();
}, [user]); // Pasamos `user` como dependencia para este useEffect.

*/