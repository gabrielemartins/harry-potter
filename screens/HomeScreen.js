import { View, StyleSheet } from 'react-native';
import MenuOptionCard from '../components/MenuOptionCard';

const characters = {
    image: require('../assets/characters-background.jpg'),
    title: 'Characters',
    subtitle: 'List of all characters in the Harry Potter World.',
}

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <MenuOptionCard
                image={characters.image}
                title={characters.title}
                subtitle={characters.subtitle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
