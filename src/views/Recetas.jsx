// Receta.jsx
import * as React from 'react'
import  { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Searchbar, Card, Paragraph } from 'react-native-paper';//ver luego lo de paperprovider
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DetalleRecetaStackScreen from './DetalleReceta';
import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'


const Receta = ({route}) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [recetas, setRecetas] = useState([]);// mucho cuidao aca eh, que el map se pone loco
  const [filteredRecetas, setFilteredRecetas] =  useState([]);
  const [searchQuery, setSearchQueary] = useState('');
  const {id} = route.params.params;
  //console.log("este es");
  //console.log(route.params.params);
  const url = `${API_URL}recetas`;//ejemplo de como usar el env
  const getRecetas = async () => {
    try{
      //console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      //console.log(data);
      setRecetas(data.data); // cuando usemos la api, borrar .categories
      setFilteredRecetas(data.data);
      await AsyncStorage.setItem('recetas',JSON.stringify(data.data));// el data dentro de la response, SI es un array
      console.log(await AsyncStorage.getItem('recetas'));
      return (data.data);
    }catch(error){
      console.error('Fallo al obtener los datos', error)
      console.log(url);
      const datosGuardados = await AsyncStorage.getItem('recetas');
      if(datosGuardados !== null){
        setFilteredRecetas(JSON.parse(datosGuardados));
        setRecetas(JSON.parse(datosGuardados));
        console.log('gola');
      }
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if(state.isConnected) {
        getRecetas();
      } else {
        (async () => {//TODO: revisar si funciona esta parte sin esos parentesis raros
          const datosGuardados = await AsyncStorage.getItem('recetas');
          if(datosGuardados !== null) {
            setRecetas(JSON.parse(datosGuardados));
            setFilteredRecetas(JSON.parse(datosGuardados));
            console.log('puta madre');
          }
        })();
      }
    });
  }, [setRecetas]);

  const cargarRecetas = async () =>{
    setRefreshing(true);
    const nuevasRecetas = await getRecetas();
    setRecetas(nuevasRecetas);
    setRefreshing(false);
  }

  const buscador = (texto) => {
    setSearchQueary(texto);
    const filteredList = recetas.filter((item)=>
    item.nombre.toLowerCase().includes(texto.toLowerCase()))
    setFilteredRecetas(filteredList);
  }

  return (
    <View style={styles.container}>
      <Searchbar 
        placeholder="buscar" 
        value={searchQuery}  
        onChangeText={buscador} 
        mode="bar"
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={cargarRecetas}/>
        }
      >
      {filteredRecetas.map(receta => (
        <Card key={receta.id}onLongPress={() => navigation.navigate('DetalleRecetaScreen', {
          screen: 'DetalleReceta',
          params: {idReceta: receta.id, idUsuario: id}
        })}>
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

const RecetaStackScreen = ({route}) => {
  return (
    <RecetaStack.Navigator
      screenOptions={{headerShown:false}}
    >
      <RecetaStack.Screen name="Lista de Recetas" initialParams={route} component={Receta} />
      <RecetaStack.Screen name="DetalleRecetaScreen" component={DetalleRecetaStackScreen} />
    </RecetaStack.Navigator>
  );
};

export default RecetaStackScreen;
