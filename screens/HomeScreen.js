import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import MenuOptionCard from '../components/MenuOptionCard';

const { width } = Dimensions.get('screen');
const CARD_WIDTH = width * 0.8;

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
    },

};

export default function HomeScreen() {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Hello, Gabriele</Text>
                <Text style={styles.pageSubtitle}>What would you like to explore today?</Text>
            </View>

            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={styles.menuCards}
            >
                {Object.values(screens).map((screen, index) => {
                    const inputRange = [
                        (index - 1) * CARD_WIDTH,
                        index * CARD_WIDTH,
                        (index + 1) * CARD_WIDTH,
                    ];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 0.8],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.cardContainer,
                                { transform: [{ scale }] },
                            ]}
                        >
                            <MenuOptionCard
                                image={screen.image}
                                title={screen.title}
                                subtitle={screen.subtitle}
                                nextPage={screen.title}
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
    header: {
        marginTop: 110,
        marginHorizontal: 20,
    },
    pageTitle: {
        color: '#8B41F2',
        fontWeight: 'bold',
        fontSize: 40,
    },
    pageSubtitle: {
        color: '#48227D',
        fontSize: 16,
    },
    menuCards: {
        marginTop: 20,
        marginLeft: 5,
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: '85%',
        marginTop: 40,
    },
});