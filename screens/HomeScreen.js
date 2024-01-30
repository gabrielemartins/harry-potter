import { View, StyleSheet } from 'react-native';
import MenuOptionCard from '../components/MenuOptionCard';

export default function HomeScreen() {
    const screens = {
        characters: {
            image: require('../assets/characters-background.jpg'),
            title: 'Characters',
            subtitle: 'List of all characters in the Harry Potter World.',
        },
        spells: {
            image: require('../assets/spells-background.jpg'),
            title: 'Spells',
            subtitle: 'List of all spells in the Harry Potter World.',
        },
        potions: {
            image: require('../assets/potions-background.jpg'),
            title: 'Potions',
            subtitle: 'List of all potions in the Harry Potter World.',
        }
    };

    return (
        <View style={styles.container}>
            <MenuOptionCard
                image={screens.spells.image}
                title={screens.spells.title}
                subtitle={screens.spells.subtitle}
            />
            <MenuOptionCard
                image={screens.characters.image}
                title={screens.characters.title}
                subtitle={screens.characters.subtitle}
            />
            <MenuOptionCard
                image={screens.potions.image}
                title={screens.potions.title}
                subtitle={screens.potions.subtitle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
