// Receta.jsx
import * as React from 'react'
import  { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Searchbar, Card, Paragraph } from 'react-native-paper';//ver luego lo de paperprovider
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DetalleReceta from './DetalleReceta';
import {API_URL} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'


const Receta = () => {
  const navigation = useNavigation();
  const [recetas, setRecetas] = useState([]);// mucho cuidao aca eh, que el map se pone loco
  const [searchQuery, setSearchQueary] = useState('');
  const url = `${API_URL}recetas`;//ejemplo de como usar el env
  const getRecetas = async () => {
    try{
      const response = await fetch(url);
      const data = await response.json();
      //console.log(data);
      setRecetas(data.data); // cuando usemos la api, borrar .categories
      await AsyncStorage.setItem('recetas',JSON.stringify(data.data));// el data dentro de la response, SI es un array
      console.log(await AsyncStorage.getItem('recetas'));
    }catch(error){
      console.error("Fallo al obtener los datos ", error)
      const datosGuardados = await AsyncStorage.getItem('recetas');
      if(datosGuardados !== null){
        setRecetas(JSON.parse(datosGuardados));
        console.log("gola");
      }
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if(state.isConnected) {
        getRecetas();
      } else {
        (async () => {
          const storedData = await AsyncStorage.getItem('recetas');
          if(storedData !== null) {
            setRecetas(JSON.parse(storedData));
            console.log("puta madre");
          }
        })();
      }
    });
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
