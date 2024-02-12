import { View, StyleSheet, Text } from 'react-native';

export default function Header(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 30,
    },
    title: {
        color: '#8B41F2',
        fontWeight: 'bold',
        fontSize: 40,
    },
    subtitle: {
        color: '#48227D',
        fontSize: 16,
    },
});