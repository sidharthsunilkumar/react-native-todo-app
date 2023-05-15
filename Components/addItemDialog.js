import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Switch, Text, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AddItemDialog(props) {

    const { showAddDialog, addTodoHandler, cancelTodoHandler } = props;
    const [newTodo, setNewTodo] = useState('');

    const [hasDeadline, setHasDeadline] = useState(false);
    const [mode, setMode] = useState("date");
    const [date, setDate] = useState(new Date());
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const handleCancel = () => {
        setNewTodo('');
        cancelTodoHandler();
        setHasDeadline(false);
        refreshDateTime();
    };

    const refreshDateTime = () => {
        const now = new Date();
        setDate(now)
    }

    const handleAdd = () => {
        if (newTodo) { // only add if there's a newTodo
            if(hasDeadline){
                addTodoHandler({ todo: newTodo, hasDeadline: hasDeadline, isCompleted: false, deadline: selectedDateTime });
            }else{
                addTodoHandler({ todo: newTodo, hasDeadline: hasDeadline, isCompleted: false });
                refreshDateTime()
            }
            setNewTodo('');
            setHasDeadline(false);
        }
    };

    const toggleDeadline = () => {
        if (hasDeadline) {
            setSelectedDateTime(null);
            setShowDateTimePicker(false);
        }
        else {
            setShowDateTimePicker(true);
        }
        setHasDeadline(!hasDeadline);
    };

    const onTouchDateTime = () => {
        setShowDateTimePicker(true);
    }

    const dateTimePickerHandler = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (event.type === 'dismissed') {
            // Cancel was pressed
            setHasDeadline(false)
            console.log('cancel');
        } else {
            // A date was selected
            if (mode === "date") {
                setDate(currentDate);
                setMode("time");
                setShowDateTimePicker(true);
            } else {
                setSelectedDateTime(currentDate);
                setMode("date");
                console.log('confirm');
            }
        }
        setTimeout(() => {
            setShowDateTimePicker(false);
        }, 0);
    };

    return (
        <Modal
            visible={showAddDialog}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Add to-do item...</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a new to-do item"
                    value={newTodo}
                    onChangeText={setNewTodo}
                />
                <TouchableOpacity onPress={toggleDeadline}>
                    <View style={styles.checkboxContainer}>
                        <Text>Add deadline: </Text>
                        <View
                            style={[
                                styles.circle,
                                hasDeadline ? styles.circleChecked : styles.circleUnchecked,
                            ]}
                        >
                            {hasDeadline && (
                                <Icon name="check" size={15} color="#fff" style={styles.check} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {hasDeadline && (
                    <>
                        <TouchableOpacity onPress={()=>onTouchDateTime()}>
                            <Text style={styles.dateText}>
                                {selectedDateTime
                                    ? selectedDateTime.toLocaleString()
                                    : "Select a date and time"}
                            </Text>
                        </TouchableOpacity>
                        {showDateTimePicker && (
                            <DateTimePicker
                                colo
                                value={selectedDateTime || date}
                                mode={mode}
                                display="default"
                                onChange={dateTimePickerHandler}
                            />
                        )}
                    </>
                )}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleAdd}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 64,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    },
    button: {
        marginLeft: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
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
});
