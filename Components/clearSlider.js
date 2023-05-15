import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ClearSlider(props) {
    const { showDelete, showDeleteHandler } = props;

    return (
        <View style={styles.container}>
            <Icon name="trash" size={20} color="gray" />
            <Switch
                trackColor={{ false: "#767577", true: "red" }}
                thumbColor={showDelete ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={showDeleteHandler}
                value={showDelete}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5
    },
})