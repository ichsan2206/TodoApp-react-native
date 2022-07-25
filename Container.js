import * as React from "react";

import { StyleSheet} from 'react-native';
import TodoAction from './Commponent/TodoAction';
import TodoList from './Commponent/TodoList';
import UpdateTodo from './Commponent/UpdateTodo';

//Import Navigation Container
import { NavigationContainer } from '@react-navigation/native'

// Import Stack Navigation
import { createStackNavigator } from "@react-navigation/stack"

//Import Bottom Tab Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Icon
import { Ionicons } from "@expo/vector-icons";

// Create Variabel
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

//Creat Component Tab Bottom
function Component() {
    return(
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerMode: "screen",
          tabBarIcon: ({focused, color}) => {
            let iconName;
  
            if(route.name == "Todo List"){
              iconName = focused ? "document-text" : "document-text-outline"
            } else if(route.name == "Form"){
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline"
            }
  
            return <Ionicons name={iconName} size={30} color={color} />
          },
  
          activeBackgroundColor: '#c4461c',
          inactiveBackgroundColor: '#b55031',
        })}
      >
  
        <Tab.Screen name="Todo List" component={TodoList} options={{headerShown:false}}/>
        <Tab.Screen name="Form" component={TodoAction} options={{headerShown:false}}/>
  
      </Tab.Navigator>
    )
  }

export default function Container() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Tab.Screen 
    name="Main"
    component={Component}
    options={{
      headerMode: "screen",
      headerShown: false
    }}
    />
    <Tab.Screen name="Update" component={UpdateTodo} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0583D2',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  