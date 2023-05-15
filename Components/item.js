import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Item(props) {
    const { item, todoCompletedHandler, showDelete, handleDeleteTodo } = props;

    const [isDeleteVisible, setIsDeleteVisible] = useState(showDelete);

    useEffect(() => {
        setIsDeleteVisible(showDelete);
    }, [showDelete]);

    const toggleCheck = () => {
        todoCompletedHandler(item.key);
    };

    const dateTimeString = (dateTime) => {
        const date = new Date(item.deadline);
        const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' }) + ', ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return formattedDate
    }

    return (
        <View>
            {item.deadline && (
                <View style={styles.deadlineContainer}>
                    <Text style={styles.deadline}>By {dateTimeString(item.deadline)}</Text>
                </View>
            )}
            <View style={styles.container}>
                <View style={styles.first}>
                    <Text style={[styles.todoText, item.isCompleted && styles.todoTextCompleted]}>{item.todo}</Text>
                </View>
                <TouchableOpacity style={styles.second} onPress={toggleCheck}>
                    <View
                        style={[
                            styles.circle,
                            item.isCompleted ? styles.circleChecked : styles.circleUnchecked,
                        ]}
                    >
                        {item.isCompleted && (
                            <Icon name="check" size={15} color="#fff" style={styles.check} />
                        )}
                    </View>
                </TouchableOpacity>
                {isDeleteVisible && (
                    <TouchableOpacity onPress={() => handleDeleteTodo(item.key)}>
                        <View style={styles.delete}>
                            <Icon name="trash" size={20} color="red" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ccc',
        marginVertical: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    first: {
        flex: 7,
    },
    second: {
        flex: 1,
        alignItems: 'center',
        padding: 3
    },
    delete: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleChecked: {
        backgroundColor: 'coral',
        borderColor: 'coral',
    },
    circleUnchecked: {
        backgroundColor: '#fff',
    },
    check: {
        textAlign: 'center',
    },
    todoText: {
        color: '#000',
        textDecorationLine: 'none',
    },
    todoTextCompleted: {
        color: '#ccc',
        textDecorationLine: 'line-through',
    },
    deadline: {
        marginLeft: 10,
        marginTop: 10,
        fontWeight: '500',
        fontStyle: 'italic'
    }
});
