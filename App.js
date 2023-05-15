import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './Components/header';
import Test from './Components/test';
import { useEffect, useState } from 'react';
import AddButton from './Components/addButton';
import ClearSlider from './Components/clearSlider';
import AddItemDialog from './Components/addItemDialog';
import Item from './Components/item';
import uuid from 'uuid-random';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

    const localStorageVarName = "my-react-native-app-todos-info";

    const [showDelete, setShowDelete] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Load todos from storage
        AsyncStorage.getItem(localStorageVarName)
            .then((data) => {
                if (data !== null) {
                    setTodos(JSON.parse(data));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        // Save todos to storage
        AsyncStorage.setItem(localStorageVarName, JSON.stringify(todos))
            .catch((error) => {
                console.log(error);
            });
    }, [todos]);


    const showDeleteHandler = () => {
        setShowDelete(!showDelete)
        console.log(showDelete)
    }
    const addButtonHandler = (e) => { setShowAddDialog(true) }
    const cancelTodoHandler = (e) => { setShowAddDialog(false) }

    const addTodoHandler = (e) => {
        const newTodo = { todo: e.todo, isCompleted: false, key: uuid() };
        if (e.hasDeadline) {
            newTodo.deadline = e.deadline;
        }
        setTodos([...todos, newTodo]);

    }

    const todoCompletedHandler = (key) => {
        setTodos((todos) =>
            todos.map((todo) => {
                if (todo.key === key) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                } else {
                    return todo;
                }
            })
        );
    };

    const handleDeleteTodo = (key) => {
        setTodos((todos) => todos.filter((todo) => todo.key !== key));
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header />
            <ClearSlider showDelete={showDelete} showDeleteHandler={showDeleteHandler} />
            {(todos.length == 0) && (
                <View style={styles.nothingContainer}>
                    <Text style={styles.nothingTitle}>Nothing left to do!</Text>
                </View>
            )}
            <ScrollView>
                {todos.filter(item => !item.deadline).length != 0 && (
                    <View>
                        <Text style={styles.title}>To do-</Text>
                    </View>
                )}
                {todos.filter(item => !item.deadline).map(item => (
                    <Item
                        item={item}
                        key={item.key}
                        todoCompletedHandler={todoCompletedHandler}
                        showDelete={showDelete}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                ))}

                {todos.filter(item => item.deadline).length != 0 && (
                    <View>
                        <Text style={styles.title}>Deadlines-</Text>
                    </View>
                )}
                {todos.filter(item => item.deadline).map(item => (
                    <Item
                        item={item}
                        key={item.key}
                        todoCompletedHandler={todoCompletedHandler}
                        showDelete={showDelete}
                        handleDeleteTodo={handleDeleteTodo}
                    />
                ))}
                <View style={styles.blankSpace}></View>
            </ScrollView>

            <AddButton addButtonHandler={addButtonHandler} />
            <AddItemDialog showAddDialog={showAddDialog} addTodoHandler={addTodoHandler} cancelTodoHandler={cancelTodoHandler} />
            {/* <Test /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    blankSpace: {
        height: 80,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    },
    nothingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nothingTitle: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    }
});
