import React, { Component } from 'react'
import {
    View, Text, Alert, StyleSheet
} from 'react-native'
import { Form, Item, Input, Button, Toast } from 'native-base'
import { getDataFromAsteroidId, getBrowseAsteroidData } from './api'

class HomeScreen extends Component {
    state = {
        inputValue: null,
        loadingData: false
    }



    handleInputTextChange = (value) => {
        this.setState({
            inputValue: value ? value : null
        })
    }

    handleSubmitPress = value => {
        const { navigation: { navigate } } = this.props;
        this.setState({
            loadingData: true
        })
        getDataFromAsteroidId(value)
            .then(response => {
                this.setState({
                    loadingData: false
                })
                console.log('recieved data', response)
                if (response && response.data && response.data.name) {
                    const detail = {
                        isHazardous: response.data.is_potentially_hazardous_asteroid,
                        name: response.data.name,
                        url: response.data.nasa_jpl_url
                    }
                    navigate('Detail', { detail })
                } else {
                    this.showToast('Sorry, Something went wrong')
                }
            })
            .catch(err => {
                this.setState({
                    loadingData: false
                })
                this.showToast(err.message)
            })

    }
    getRandomItem = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    handleRandomAsteroid = () => {
        this.setState({
            loadingData: true
        })
        getBrowseAsteroidData()
            .then(response => {
                if (response && response.data && response.data.near_earth_objects && response.data.near_earth_objects.length > 0) {
                    let randomAsteroid = this.getRandomItem(response.data.near_earth_objects)
                    this.handleSubmitPress(randomAsteroid.id)
                } else {
                    this.showToast('Sorry, Something went wrong')
                }
            }).catch(err => {
                this.setState({
                    loadingData: true
                })
                this.showToast(err.message)
            }
            )
    }

    showToast = (txt) => {
        Toast.show({
            txt,
            duration: 4000
        })
    }
    render() {
        const {
            inputValue,
            loadingData
        } = this.state;
        return (
            <View style={styles.mainView}>
                {loadingData && <Text style={{
                    alignSelf: 'center'
                }}>
                    Loading...
                </Text>}
                <Text>
                    Asteroid Id for testing:3542519
                </Text>
                <Form>
                    <Item>
                        <Input
                            placeholder='Enter Asteroid Id'
                            value={inputValue}
                            onChangeText={this.handleInputTextChange}
                            editable={!loadingData}
                        />
                    </Item>
                    <Button
                        onPress={() => this.handleSubmitPress(inputValue)}
                        style={styles.submitButton}
                        disabled={inputValue ? false : true}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </Button>
                    <Button
                        style={styles.submitButton}
                        onPress={this.handleRandomAsteroid}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Success
                        </Text>
                    </Button>
                </Form>
            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'white',
        flex: 1
    },
    buttonText: {
        color: '#fff',
        alignSelf: 'center',
    },
    submitButton: {
        margin: 10,
        justifyContent: 'center'
    },

})