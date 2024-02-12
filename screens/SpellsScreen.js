import React, { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, Image, StyleSheet, Pressable } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import SearchBar from "../components/SearchBar";
import { getSpells } from "../Api";

export default function SpellsScreen() {
    const [spells, setSpells] = useState([]);
    const [filteredSpells, setFilteredSpells] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const data = await getSpells(page);
                setSpells(prevSpells => {
                    const updatedSpells = [...prevSpells, ...data];
                    filterSpells(updatedSpells, searchTerm);
                    return updatedSpells;
                });
                setLoading(false);
                setLoadingMore(false);
                setError('');
            } catch (error) {
                console.error('Error fetching spells:', error);
                setError(error.message);
                setLoading(false);
                setLoadingMore(false);
            }
        }
        fetchSpells();
    }, [page]);

    useEffect(() => {
        filterSpells(spells, searchTerm);
    }, [spells, searchTerm]);

    const filterSpells = (spells, searchTerm) => {
        const filtered = spells.filter(spells =>
            spells.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSpells(filtered);
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
                <Text style={styles.pageTitle}>Spells</Text>
                <Text style={styles.pageSubtitle}>Are you a witch or what?</Text>
            </View>
            {error ? (
                <Text style={styles.errorMessage}>{error}</Text>
            ) : loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View>
                    <SearchBar onChangeText={setSearchTerm} />
                    <FlatList
                        data={filteredSpells}
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
                                            <Text style={styles.cardInfo}>{item.attributes.category}</Text>
                                            <Text style={styles.cardInfo}>{item.attributes.effect}</Text>
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