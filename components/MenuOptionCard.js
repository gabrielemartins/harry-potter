import { View, Text, ImageBackground, StyleSheet, Pressable } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function MenuOptionCard(props) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <ImageBackground source={props.image} style={styles.imageBackground}>
                    <View style={styles.infosContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.subtitle}>{props.subtitle}</Text>
                    </View>
                </ImageBackground>
                <Pressable onPress={() => {navigation.navigate(props.nextPage)}} style={styles.revelioButton}>
                    <Text style={styles.revelioButtonText}>Revelio</Text>
                </Pressable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 40,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 40,
    },
    infosContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: '25%',
        marginLeft: '5%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#8B41F2',
    },
    subtitle: {
        fontSize: 12,
        color: '#F5F5F5',
        marginLeft: '1%',
    },
    revelioButton: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: '#8B41F2',
        padding: 15,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    revelioButtonText: {
        color: '#F5F5F5',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});
