import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import HomeStackScreen from './src/views/Home';
import Registro from './src/views/Registro';
import Ingredientes from './src/views/Ingredientes';
import IngredientesCreate from './src/views/IngredienteCreate';
import Categorias from './src/views/Categorias';
import CategoriaCreate from './src/views/CategoriaCreate'; 

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator 
      initialRouteName='login'
      screenOptions={{headerShown:false}}
    >
      <Stack.Screen
        name="ReseñaScreen"
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

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator > 
      <Tab.Screen
        name="Reseñas"
        component={Reseñas}
        options={{
          title: 'Tus Reseñas',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="star" size={size} color="gold" />
          ),
        }}
      />
      <Tab.Screen
        name="Home1"
        component={Home}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" size={size} color="red" />
          ),
        }}
      />
      <Tab.Screen
        name="Recetas"
        component={RecetaStackScreen}
        options={{
          title: 'Recetas',
          tabBarIcon: ({ focused, color, size }) => (
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
        }}/>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
