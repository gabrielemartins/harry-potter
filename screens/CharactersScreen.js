import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default function CharactersScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/characters-background.jpg')} style={styles.container}>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});