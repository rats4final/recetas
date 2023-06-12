import {useEffect, useState} from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View} from 'react-native';
//vistas truchas
// import { Icon } from '@mdi/react';
// import { mdiAccount } from '@mdi/js';

import Icon from 'react-native-vector-icons/FontAwesome';

// console.log(mdiAccount);
import Reseñas from './src/views/Reseñas';
import Home from './src/views/Home';
import RecetaStackScreen from './src/views/Recetas';
import EditReseña from './src/views/Reseñaedit';
import Login from './src/views/Login';
import Registro from './src/views/Registro';
import Ingredientes from './src/views/Ingredientes';
import IngredientesCreate from './src/views/IngredienteCreate';
import Categorias from './src/views/Categorias';
import CategoriaCreate from './src/views/CategoriaCreate'; 
import OpcionesStackScreen from './src/views/Opciones';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'date-fns';

const Stack = createNativeStackNavigator();



function MyStack() {
//  const  [Cargando, setCargando] = useState(true);

  const [usuario, setUsuario] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const getUsuario = async () => {
    const response = await AsyncStorage.getItem('usuario');
    const data = await JSON.parse(response);
    setUsuario(data);
    // setCargando(false);
    setLoadingUser(false);
  }

  useEffect(() => {
    getUsuario();
  },[])

  if(loadingUser){  
    return null;
  }
  

  console.log('usuario navigation');
  console.log(usuario);


  const Tab = createBottomTabNavigator();

function MyTabs() {

  const [usuario, setUsuario] = useState({});
  const getUsuario = async () => {
    const response = await AsyncStorage.getItem('usuario');
    const data = await JSON.parse(response);
    setUsuario(data);
  }

  useEffect(() => {
    getUsuario();
  },[])

  return (
    <Tab.Navigator 
      initialRouteName='Recetas' // la puse para que no se muera tu coso
    > 
      <Tab.Screen
        name="Reseñas"
        initialParams={usuario}
        component={Reseñas}
        options={{
          title: 'Tus Reseñas',
          tabBarIcon: ({ size }) => (
            <Icon name="star" size={size} color="gold" />
          ),
        }}
      />
      <Tab.Screen
        name="Home1"
        component={Home}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ size }) => (
            <Icon name="home" size={size} color="red" />
          ),
        }}
      />
      <Tab.Screen
        name="Recetas"
        initialParams={usuario}
        component={RecetaStackScreen}
        options={{
          title: 'Recetas',
          tabBarIcon: ({ size }) => (
            <Icon name="cutlery" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Ingredientes"
        component={Ingredientes}
        options={{
          title: 'Ingredientes',
          tabBarIcon: ({  size }) => (
            <Icon name="qq" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={Categorias}
        options={{
          title: 'Categorias',
          tabBarIcon: ({ size }) => (
            <Icon name="pie-chart" size={size} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Opciones"
        component={OpcionesStackScreen}
        options={{
          title: 'Opciones',
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Icon name="gear" size={size} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


  return (
    <Stack.Navigator 
      initialRouteName={usuario == null ? 'login' : 'Home'}
      screenOptions={{headerShown:false}}
    >
      <Stack.Screen
        name="ReseñaScreen"
        //initialParams={usuario}
        component={Reseñas}
        options={{ title: 'Reseñas' }}
      />

      <Stack.Screen
        name="Stack"
        component={EditReseña}
        options={{ title: 'Editar mi reseña' }}
      />

      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: 'login' }}
      />

      <Stack.Screen
        name="Registro"
        component={Registro}
        options={{ title: 'Registro' }}
      />

     <Stack.Screen
        name="IngredientesCreate"
        component={IngredientesCreate}
        options={{ title: 'IngredientesCreate' }}
      />
      <Stack.Screen
        name="CategoriaCreate"
        component={CategoriaCreate}
        options={{ title: 'CategoriaCreate' }}
      />

      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{ title: 'La Caserita' }}
      />
    </Stack.Navigator>
  );
}


export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
