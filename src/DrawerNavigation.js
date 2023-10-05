import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
const Drawer = createDrawerNavigator();


const DrawerNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation 