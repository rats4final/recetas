import * as React from 'react'
import  {useState, useEffect} from 'react';
import {StyleSheet,Dimensions, Text, View} from 'react-native';

const DetalleReceta = ({route}) => {//no olvidar el return de mierda
    const [receta,setReceta] = useState({});// investigar mas sobre useState();
    const url = 'http://192.168.1.110:8000/api/recetas/'// extra / para el endpoint
    const {idReceta} = route.params;
    const getReceta = async () => {
        const response = await fetch(`${url}${idReceta}`);
        const data = await response.json();
        console.log(data);
        setReceta(data.data);
    };
    useEffect(() => {
        getReceta();
      }, []);
    console.log(idReceta);
    return (
    <View>
        <Text style={{color:"black"}}>{receta.nombre}</Text>
        <Text style={{color:"black"}}>{receta.categoria && receta.categoria.nombre}</Text>
    </View>
    )
}

export default DetalleReceta;