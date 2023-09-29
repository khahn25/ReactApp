// import { View, Text } from 'react-native'
// import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Add from './Screens/Add';
import DetailTaskScreen from './Screens/DetailTaskScreen';
import Home from './Screens/Home';


const Stack = () => {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'}  >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name={'DetailTaskScreen'} component={DetailTaskScreen} />
            <Stack.Screen name={'Add'} component={Add} />
            
        </Stack.Navigator>
      </NavigationContainer>
        
    )
}

export default Stack