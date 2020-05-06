import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

const AsteroidDetails = ({ navigation }) => {
    const detail = navigation.getParam('detail')
    return (
        <View style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#fff'
        }}>
            <Text style={styles.text}>
                Name:{detail.name}
            </Text>
            <Text style={styles.text}>
                Is potentially Hazardous Asteroid:{JSON.stringify(detail.isHazardous)}
            </Text>
            <Text style={styles.text}>
                NASA j/p URL:{detail.url}
            </Text>
        </View>
    )
}

export default AsteroidDetails

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        marginVertical: 10
    }
})