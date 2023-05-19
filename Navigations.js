import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//vistas truchas
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

import Reseñas from "./src/views/Reseñas"
import Home from "./src/views/Home"
import RecetaStackScreen from "./src/views/Recetas"
const Tab = createBottomTabNavigator();

function MyTabs(){
    return (
        <Tab.Navigator >
            <Tab.Screen  name="Reseñas"
            component={Reseñas}
            options={{
                title: 'Tus Reseñas',
                tabBarIcon: ({ focused, color, size }) => {
                    <Icon path={mdiAccount}
        title="User Profile"
        size={100}
        horizontal
        vertical
        rotate={90}
        color="black"
        spin
      />

                }
                
                  

            }}
             />
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Recetas" component={RecetaStackScreen}/>

        </Tab.Navigator>

    );
}

export default function Navigation(){
    return(
        < NavigationContainer>
   <MyTabs />

   </NavigationContainer>

    );
   
}