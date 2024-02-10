import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, Image, StyleSheet, Linking, Pressable } from "react-native";
import { getCharacters } from "../Api";

export default function CharactersScreen() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getCharacters(page);
                setCharacters(prevCharacters => [...prevCharacters, ...data]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        }
        fetchCharacters();
    }, [page]);

    const loadMore = () => {
        setPage(page + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Characters</Text>
            <Text style={styles.pageSubtitle}>I swear I am not up to good</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={characters}
                    keyExtractor={(item) => item.wiki}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => Linking.openURL(item.attributes.wiki)}>
                            <View style={styles.card}>
                                    {item.attributes.image ? (
                                        <Image source={{ uri: item.attributes.image }} style={styles.image} />
                                    ) : (
                                        <Image source={require('../assets/generic-character.png')} style={styles.image} />
                                    )}
                                    <Text style={styles.cardTitle}>{item.attributes.name}</Text>
                            </View>
                        </Pressable>
                    )}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => setLoadingMore(false)}
                    onMomentumScrollEnd={() => setLoadingMore(true)}
                    ListFooterComponent={() => {
                        return (
                            loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null
                        );
                    }}
                />
            )}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F071A',
    },
    pageTitle: {
        color: '#8B41F2',
        fontWeight: 'bold',
        fontSize: 30,
        marginHorizontal: 30,
        marginTop: 70,
    },
    pageSubtitle: {
        color: '#48227D',
        fontSize: 14,
        marginHorizontal: 30,
        marginBottom: 30,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#261243',
        borderBottomWidth: 1,
        padding: 25,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#8B41F2'
    },

});