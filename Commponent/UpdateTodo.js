import * as React from "react";

import { StyleSheet, Text } from 'react-native';
import { Input, Stack, FormControl, View, TextArea, Button } from 'native-base';
import { useState } from "react";
import axios from 'axios';  

export default function UpdateTodo({route}) {
  
const [name, setName]=useState("");
const [description, setDesc]=useState("");

const {_id} = route.params

const updateTodo = async () => {
  try {
    const data = JSON.stringify({
      name: name,
      description: description,})

    await axios.patch('https://api.kontenbase.com/query/api/v1/559f3e89-67db-4cd5-95de-4ca78873d23f/TodoApp/'+_id, data)
    window.location.reload()
  } catch (error) {
    console.log();
  }
  
}

  return (
       <View style={styles.containerForm}>
      <Text style={styles.labelTodo}>Update Your Todos</Text>
        <FormControl>
      <Stack space={5} style={styles.formAdd}>
        <Stack>
          <Text style={{color: 'white', fontSize: 15}}>Todo</Text>
          <Input variant="underlined" p={2} placeholder="Todo" style={{color: 'white'}} 
          value={name} onChangeText={(text) => setName(text)} />
        </Stack>
        <Stack>
          <Text style={{color: 'white', fontSize: 15}}>Description</Text>
          <TextArea h={20} mt={3} placeholder="Description" w="100%" maxW="300" style={{color: 'white'}}
          value={description} onChangeText={(text) => setDesc(text)} />
        </Stack>
        <Button style={{backgroundColor:'#0e2433', color:'white'}} onPress={updateTodo}>Send</Button>
      </Stack>
    </FormControl>
    </View>
  )
}

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0583D2',
  },
  labelTodo :{
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formAdd: {
    width: 'auto',
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'center',
    color: 'white',
  }
});
