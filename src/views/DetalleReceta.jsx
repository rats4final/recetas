import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button, Card, Paragraph} from 'react-native-paper'
import {StyleSheet, Dimensions, Text, View, ActivityIndicator, Image, ScrollView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {API_URL} from "@env"
import { createStackNavigator } from '@react-navigation/stack';
import InsertarReseña from './InsertarReseña';
import { useNavigation } from '@react-navigation/native';


const DetalleReceta = ({route}) => {
  const navigation = useNavigation();
  //no olvidar el return de mierda
  const ancho = Dimensions.get('window').width;
  const [receta, setReceta] = useState({images:[],ingredientes:[],reseñas:[]}); // investigar mas sobre useState(), muy importante;
  const url = `${API_URL}recetas/`; // extra / para el endpoint
  //console.log(url);
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
    <View style={{ flex: 1 }}>
      <Text className="text-black bg-white rounded-lg p-3 font-bold">{receta.nombre}</Text>
      <Text style={{color: 'black'}}>
        {receta.categoria && receta.categoria.nombre}
      </Text>
      <Carousel
        mode='parallax'
        loop
        width={ancho}
        height={ancho / 2}
        autoPlay={false}
        scrollAnimationDuration={1000}
        data={receta.images}
        renderItem={({item})=>(//esto es como un foreach basicamente
            <Image
                className="rounded-lg"
                key={item.id}
                style={{width: ancho, height: ancho / 2}}
                source={{uri:item.url}}
            />
        )}
      />
      <Text className="text-black">Ingredientes:</Text>
      <Carousel
      vertical={true}
      loop
      width={ancho}
      height={ancho/2}
      autoPlay={false}
      scrollAnimationDuration={1000}
      data={receta.ingredientes}
      renderItem={({item})=>(
        <Text style={{color:'black', textAlign:'center'}}>{item.nombre}</Text>
      )}
      />
      <ScrollView>
        {
            receta.reseñas.map((reseña)=>(
                <Card key={reseña.id}>
                    <Card.Title title={`Escrito por:${reseña.user_owner.name},${reseña.estrellas} estrellas`}/>
                    <Card.Content>
                        <Paragraph>{reseña.cuerpo}</Paragraph>
                    </Card.Content>
                </Card>
            ))
        }
      </ScrollView>
      <Button
        onPress={()=>navigation.navigate('AgregarReseña',{idReceta: idReceta , images:receta.images})}
      >Agregar un Comentario</Button>
    </View>
  );
};


const DetalleRecetaStack = createStackNavigator();

const DetalleRecetaStackScreen = () => {
  return (
    <DetalleRecetaStack.Navigator 
      screenOptions={{headerShown:true}}// nice
    >
      <DetalleRecetaStack.Screen name='DetalleReceta' component={DetalleReceta}/>
      <DetalleRecetaStack.Screen name='AgregarReseña' component={InsertarReseña}/>
    </DetalleRecetaStack.Navigator>
  );
}

export default DetalleRecetaStackScreen
//export default DetalleReceta;
