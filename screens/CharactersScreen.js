import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default function CharactersScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/characters-background.jpg')} style={styles.container}>
                <View style={styles.infosContainer}>
                    <Text style={styles.title}>Characters</Text>
                    <Text style={styles.subtitle}>List of Characters from the Harry Potter World</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infosContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 130,
        marginLeft: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#8B41F2',
    },
    subtitle: {
        fontSize: 12,
        color: '#F5F5F5',
        
    },
});
