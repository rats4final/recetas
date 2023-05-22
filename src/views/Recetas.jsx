// Receta.jsx
import * as React from 'react'
import  {useState, useEffect} from 'react';
import {StyleSheet, View, AsyncStorage, ScrollView} from 'react-native';
import {Searchbar, Card, Paragraph} from 'react-native-paper';//ver luego lo de paperprovider
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DetalleReceta from './DetalleReceta';


const Receta = () => {
  const navigation = useNavigation();
  const [recetas, setRecetas] = useState([]);
  const [searchQuery, setSearchQueary] = useState('');
  const url = 'http://192.168.1.110:8000/api/recetas';
  const getRecetas = async function () {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setRecetas(data.data); // cuando usemos la api, borrar .categories
  };
  useEffect(() => {
    getRecetas();
  }, []);

  const onChangeSearch = query => setSearchQueary(query);

  return (
    <View style={styles.container}>
      <Searchbar placeholder="buscar" value={searchQuery} onChangeText={onChangeSearch} mode="bar"/>
      <ScrollView>
        {recetas.map(receta => (
          <Card key={receta.id}onLongPress={() => navigation.navigate('DetalleReceta', {idReceta: receta.id})}>
            <Card.Title title={receta.nombre} />
            <Card.Cover source={{uri: receta.thumbnail.url}} />
            <Card.Content>
              <Paragraph>{receta.instrucciones}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

});


const RecetaStack = createStackNavigator();

const RecetaStackScreen = () => {
  return (
    <RecetaStack.Navigator>
      <RecetaStack.Screen name="Lista de Recetas" component={Receta} />
      <RecetaStack.Screen name="DetalleReceta" component={DetalleReceta} />
    </RecetaStack.Navigator>
  );
};

export default RecetaStackScreen;
