import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import React, {useState} from 'react';

let TODO_LIST_STORAGE_KEY = 'todoList';

export default function App() {
  // TODO OBJECT AND TODO LIST
  const makeTodo = (name, description, imagePath = undefined, done = false) => {
    return ({
      name: name,
      description: description,
      imagePath: imagePath,
      done: done,
    });
  }
  const [todoList, setTodoList] = useState([]);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  // =====================
  // EDITING TODO OBJECT
  // =====================

  // update name
  const updateName = (index, newName) => {
    const updatedTodos = todoList;
    updatedTodos[index] = {
      ... todoList[index],
      name : newName
    }
    setTodoList(updatedTodos)
  }

  // update description
  const updateDescription = (index, newDes) => {
    const updatedTodos = todoList;
    updatedTodos[index] = {
      ... todoList[index],
      description : newDes
    }
    setTodoList(updatedTodos)
  }

  // updateDone by setting done to the opposite of what it was
  const updateDone = (index) => {
    const updatedTodos = todoList;
    updatedTodos[index] = {
      ... todoList[index],
      done : true
    }
    setTodoList(updatedTodos)
  }

  // updateImage
  // TO BE DONE

  // ===================
  // CORE FUNCTIONALITY
  // ===================

  // add todo which is automatically set to not finished
  const handleAddTodo = () => {
    if (name == null) {
      return;
    }
    // make new todo and add to array
    const newTodo = makeTodo(name, des);
    setTodoList([... todoList, newTodo]);
  };

  // update todo
  const handleUpdateTodo = (index, name, description) => {
    // get todo at index
    const setCurrTodo = editTodos[index];

    if (name != undefined) {
      updateName(setCurrTodo, name);
    }
    if (description != undefined) {
      updateDescription(setCurrTodo, description);
    }
  };

  // delete todo
  const handleDeleteTodo = (index) => {
    const updatedTodoList = [...todoList]
    updatedTodoList.splice(index, 1)
    setTodoList(updatedTodoList);
  };

  // Marking off
  const handleMarking = (index) => {
    updateDone(index);
  }

  // ============
  // PERSISTENCE
  // ============

  // Save
  const saveTodoList = async () => {
    try {
      const jsonTodoList = JSON.stringify(todoList);
      await AsyncStorage.setItem(TODO_LIST_STORAGE_KEY, jsonTodoList);
    } catch (error) {
      console.error('error with todolist save', error);
    }
  }

  // Load
  const loadTodoList = async () => {
    try {
      const loadOutput = AsyncStorage.getItem(TODO_LIST_STORAGE_KEY);
      return loadOutput != null ? JSON.parse(loadOutput) : [];
    } catch (error) {
      console.error('error with todolist load', error);
      return [];
    }
  }

  const startLoad = () => {
    const loadedTodoList = loadTodoList();
    setTodoList(loadedTodoList)
  }

  const renderItem = ({item, index}) => {
    return (<View style={styles.todoItem}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.done ? 'done' : 'unfinished'}</Text>
      <TouchableOpacity
        onPress={() => handleMarking(index)}>
        <Text>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteTodo(index)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>)
  }


  return (
    <View style={[styles.container, {flexDirection: 'column'},]}>
      <StatusBar style="auto" />
      <Text>To-Do App</Text>
      <TextInput
        placeholder="Enter Todo"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Enter Description"
        value={des}
        onChangeText={(text) => setDes(text)}
      />
      <TouchableOpacity
        onPress={handleAddTodo}>
        <Text>Add todo</Text>
      </TouchableOpacity>
      <FlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
