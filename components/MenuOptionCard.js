import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default function MenuOptionCard(props) {
    return (
        <View style={styles.container}>
            <ImageBackground source={props.image} style={styles.imageBackground}>
                <View style={styles.infosContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.subtitle}>{props.subtitle}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: '20%',
        marginLeft: '5%',
    },
    title: {
        fontSize: '220%',
        fontWeight: 'bold',
        color: '#8B41F2',
    },
    subtitle: {
        fontSize: '70%',
        color: '#F5F5F5',
        marginLeft: '1%',
    },
});
