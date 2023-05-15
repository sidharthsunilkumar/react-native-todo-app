import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function Test() {

    const [isThirdVisible, setIsThirdVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.first}>
            <Text>fdd</Text>
            </View>
            <View style={styles.second}>
            </View>
            {isThirdVisible && (
                <View style={styles.third}>
                    
                </View>
            )}
        </View>
    );



}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    first: {
        flex: 7,
        backgroundColor: 'red',
        height: '100%',
        padding: 15
    },
    second: {
        flex: 1,
        backgroundColor: 'green',
        height: '100%',
    },
    third: {
        flex: 1,
        backgroundColor: 'blue',
        height: '100%',
    },
})