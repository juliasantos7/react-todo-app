import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  // TODO OBJECT AND TODO LIST
  const makeTodo = (name, description) => {
    const [todo, setTodo] = useState({
      todoName: name,
      description: description,
      imagePath: undefined,
      done: False,
    });
    return todo, setTodo;
  }
  const [todoList, setTodoList] = useState([]);
  const [editTodos, setEditTodos] = useState([]);

  // =====================
  // EDITING TODO OBJECT
  // =====================

  // update name
  const updateName = (setCurrTodo, newName) => {
    setCurrTodo(previousState => {
      return { ...previousState, todoName: newName }
    });
  }

  // update description
  const updateDescription = (setCurrTodo, newDes) => {
    setCurrTodo(previousState => {
      return { ...previousState, description: newDes }
    });
  }

  // updateDone by setting done to the opposite of what it was
  const updateDone = (currTodo, setCurrTodo) => {
    const newDoneState = !currTodo.done;
    setCurrTodo(previousState => {
      return { ...previousState, done: newDoneState }
    });
  }

  // updateImage
  // TO BE DONE

  // ===================
  // CORE FUNCTIONALITY
  // ===================

  // add todo which is automatically set to not finished
  const handleAddTodo = (name, description) => {
    // make new todo and add to array
    const [newTodo, setNewTodo] = makeTodo(name, description);
    todoList.push(newTodo);
    editTodos.push(setNewTodo);
  };

  // update todo
  const handleUpdateTodo = (index, name, description) => {
    // get todo at index
    const setCurrTodo = editTodos[index];

    if (name != undefined) {
      updateName(setCurrTodo, name);
    }
    if (description != undefined) {
      updateName(setCurrTodo, name);
    }
  };

  // delete todo
  const handleDeleteTodo = (index) => {
    setTodoList(todoList.splice(index, index));
    setEditTodos(editTodos.splice(index, index));
  };

  // Marking off
  const handleMarking = (index) => {
    const currTodo = todoList[index];
    const setCurrTodo = editTodos[index];
    updateDone(currTodo, setCurrTodo);
  }

  // saving with persistence



  return (
    <View style={[styles.container, {flexDirection: 'column'},]}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      {/* title */}
      <Text>To-Do App</Text>
      {/* to do summary */}
      {/* to do section */}
      {/* dropdown list of finished/hidden todos */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
