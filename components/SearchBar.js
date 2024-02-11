import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react'; // Removed useState as it's no longer needed here

export default function SearchBar({ onChangeText }) {
    return (
        <View>
           <TextInput 
               style={styles.input} 
               placeholder="Search" 
               onChangeText={onChangeText} // Use the prop here
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
        borderColor: '#ffffff',
        borderRadius: 10,
        marginHorizontal: 40,
        marginBottom: 20,   
    }
});