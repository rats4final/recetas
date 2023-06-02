import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//vistas truchas
import { Icon } from '@mdi/react';
import { mdiAccount } from '@mdi/js';

import Reseñas from './src/views/Reseñas';
import Home from './src/views/Home';
import RecetaStackScreen from "./src/views/Recetas"
import EditReseña from './src/views/Reseñaedit';
import HomeStackScreen from './src/views/Home';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
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
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    

  return (
    <Tab.Navigator
    
    >
      <Tab.Screen
        name="Reseñas"
        component={MyStack}
        options={{
          title: 'Tus Reseñas',
          tabBarIcon: ({ focused, color, size }) => {
            <Icon
            path={mdiAccount}
              title="User Profile"
              size={1000}
              horizontal
              vertical
              rotate={90}
              color="black"
              spin
            />;
          },
        }}
      />
      <Tab.Screen name="App Recetas" component={HomeStackScreen}/>
      <Tab.Screen name="Recetas" component={RecetaStackScreen}/>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
