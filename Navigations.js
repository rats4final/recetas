import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//vistas truchas

import Reseñas from "./src/views/Reseñas"
import Home from "./src/views/Home"
import Receta from "./src/views/Receta"


const Tab = createBottomTabNavigator();

function MyTabs(){
    return (
        <Tab.Navigator >
            
            <Tab.Screen  name="Reseñas" options={{ tabBarBadge: 3 }} component={Reseñas}/>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Receta" component={Receta}/>

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