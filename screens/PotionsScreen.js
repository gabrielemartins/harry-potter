import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, Image, StyleSheet, Pressable } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import SearchBar from "../components/SearchBar";
import { getPotions } from "../Api";

export default function PotionsScreen() {
    const [potions, setPotions] = useState([]);
    const [filteredPotions, setFilteredPotions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPotions = async () => {
            try {
                const data = await getPotions(page);
                setPotions(prevPotions => {
                    const updatedPotions = [...prevPotions, ...data];
                    filterPotions(updatedPotions, searchTerm);
                    return updatedPotions;
                });
                setLoading(false);
                setLoadingMore(false);
                setError('');
            } catch (error) {
                console.error('Error fetching potions:', error);
                setError(error.message);
                setLoading(false);
                setLoadingMore(false);
            }
        }
        fetchPotions();
    }, [page]);

    useEffect(() => {
        filterPotions(potions, searchTerm);
    }, [potions, searchTerm]);

    const filterPotions = (potions, searchTerm) => {
        const filtered = potions.filter(potions =>
            potions.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPotions(filtered);
    };

    const loadMore = () => {
        if (!loadingMore) { 
            setLoadingMore(true);
            setPage(page + 1);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Potions</Text>
                <Text style={styles.pageSubtitle}>There’s no need to call me ‘sir,’ Professor</Text>
            </View>
            {error ? (
                <Text style={styles.errorMessage}>{error}</Text>
            ) : loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    <SearchBar onChangeText={setSearchTerm} />
                    <FlatList
                        data={filteredPotions}
                        keyExtractor={(item) => item.wiki}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => WebBrowser.openBrowserAsync(item.attributes.wiki)}>
                                <View style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        {item.attributes.image ? (
                                            <Image source={{ uri: item.attributes.image }} style={styles.image} />
                                        ) : (
                                            <Image source={require('../assets/generic-character.png')} style={styles.image} />
                                        )}
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.cardTitle}>{item.attributes.name}</Text>
                                            {item.attributes.effect ? <Text style={styles.cardInfo}>{item.attributes.effect}</Text> : <Text style={styles.cardInfo}>No published effect</Text>}
                                        </View>
                                    </View>
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
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginHorizontal: 30,   
        marginTop: 70,
        marginBottom: 30,
    },
    pageTitle: {
        color: '#8B41F2',
        fontWeight: 'bold',
        fontSize: 45,
    },
    pageSubtitle: {
        color: '#48227D',
        fontSize: 16,
    },
    card: {
        flex: 1,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        padding: 25,
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 20,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#8B41F2',
        marginBottom: 5,
    },
    cardInfo: {
        color: '#48227D',
        fontSize: 12,

    },
    errorMessage: {
        color: '#FF2314',
        fontSize: 16,
        marginHorizontal: 30,
        marginTop: 20,
    },
});