import { StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList, View, Heading, HStack} from 'native-base';
import { useState, useEffect } from 'react';
import { ListItem } from 'react-native-elements';

import axios from 'axios'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function TodoList({navigation}) {

    const [todos, setTodo] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [idDelete, setIdDelete] = useState(null)

    const getTodos = async() => {
      try {
        setIsLoading(true)
        const response = await axios.get("https://api.kontenbase.com/query/api/v1/559f3e89-67db-4cd5-95de-4ca78873d23f/TodoApp")   
        setTodo(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }

const handleDelete = async (id) => {
   try {
    setIdDelete(id);
    await axios.delete(`https://api.kontenbase.com/query/api/v1/559f3e89-67db-4cd5-95de-4ca78873d23f/TodoApp/${id}`)
     window.location.reload()
  } catch (error) {
    console.log(error);
   }
 };

useEffect(()=> {
      getTodos()
}, []);

//   Create Component List
const _renderItem = ({item}) => {
  return(
    <ListItem
    key={item._id}
    containerStyle={{backgroundColor:"#0583D2"}}
    >
      <ListItem.Content style={{backgroundColor: '#3792cb', borderRadius: 5, padding:10, shadowColor: '#0e2433', shadowRadius:5, shadowOpacity:15}}>
        <ListItem.Title numberOfLines={1} style={{color:'white', fontSize:18}}>
          {item.name}
        </ListItem.Title>
        
        <ListItem.Subtitle numberOfLines={2} style={{color:'white'}}>
          {item.description}
        </ListItem.Subtitle>
      <HStack space={2}>
        <TouchableOpacity onPress={() => {handleDelete(item._id); }} style={{backgroundColor: '#3792cb', marginTop: 10}}><AntDesign name="delete" size={20} color="black" /></TouchableOpacity>
        <TouchableOpacity  onPress={()=> navigation.navigate("Update", item)} style={{backgroundColor: '#3792cb', marginTop: 10}}><MaterialIcons name="update" size={20} color="black" /></TouchableOpacity>
      </HStack>
      </ListItem.Content>
      
    </ListItem>
  )
}
  return (
    <View style={styles.containerForm}>
    <Heading style={{color:'white', marginBottom: 8, marginTop: 9, textAlign: 'left', marginLeft: 20, marginRight: 20}}>Your Todo List</Heading>
    <FlatList 
          style={{backgroundColor: '0583D2'}}
          data={todos}
          renderItem={_renderItem}
          keyExtractor={(item) => item._id}
          refreshing={isLoading}
          onRefresh={getTodos}
        />
  </View>
  )
}

const styles = StyleSheet.create({
    containerForm: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#0583D2',
      color: 'white',
    },
});