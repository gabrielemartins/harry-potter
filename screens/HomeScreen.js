import { View, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native';
import MenuOptionCard from '../components/MenuOptionCard';

export default function HomeScreen() {
    const scrollX = new Animated.Value(0);
    let cardWidth = Dimensions.get('window').width * 0.7;

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
            <Animated.ScrollView
                horizontal={true}
                contentContainerStyle={styles.menuCards}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {Object.values(screens).map((screen, index) => {
                    const inputRange = [
                        (index - 1) * cardWidth,
                        index * cardWidth,
                        (index + 1) * cardWidth
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 0.8],
                        extrapolate: 'clamp'
                    });

                    return (
                        <Animated.View key={index} style={[styles.cardContainer, { transform: [{ scale }] }]}>
                            <MenuOptionCard
                                image={screen.image}
                                title={screen.title}
                                subtitle={screen.subtitle}
                            />
                        </Animated.View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuCards: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardContainer: {
        width: '80%',
        height: '70%',
    },
});
