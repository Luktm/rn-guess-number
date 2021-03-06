import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors'
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [ buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4 );
    
    const numberInputHandler = inputText => {
        // replace non number regex to empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const reseInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }
        
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: reseInputHandler
                }]
            );
            return
        }

        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <Text style={styles.text}>Select a Number</Text>
                            {/* all props are passed as {...props} */}
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                keyboardType='numeric'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title="Reset"
                                        onPress={reseInputHandler}
                                        color={Colors.accent}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        title="Confirm"
                                        onPress={confirmInputHandler}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'open-sans-bold',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: '80%',
        // maxWidth: '80%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button: {
    //     width: Dimensions.get('window').width / 4,
    // },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'open-sans',
    }
});

export default StartGameScreen;