import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AddButton(props) {

    const { addButtonHandler } = props;

    return (
        <TouchableOpacity style={styles.button} onPress={addButtonHandler}>
            <Feather name="plus" size={32} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'coral',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
});
