import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';

export default function SearchBar({ onChangeText }) {
    return (
        <View>
           <TextInput 
               style={styles.input} 
               placeholder="Search"
               placeholderTextColor={'#ffffff'}
               onChangeText={onChangeText} 
           />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        color: '#ffffff',
        fontSize: 12,
        padding: 7,
        outlineStyle: 'none',
        borderWidth: 1,
        borderColor: '#8B41F2',
        borderRadius: 15,
        marginHorizontal: 30,
        marginBottom: 40,   
    }
});