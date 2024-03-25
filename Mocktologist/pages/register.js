import { View, Text, ImageBackground, TouchableHighlight, TextInput } from "react-native";
import styles from '../style'
import { useState } from 'react';

export default function Register({ navigation }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleFirstNameChange = (inputText) => {
        setFirstName(inputText)
    }

    const handleLastNameChange = (inputText) => {
        setLastName(inputText)
    }

    const handleEmailChange = (inputText) => {
        setEmail(inputText)
    }

    const handlePasswordChange = (inputText) => {
        setPassword(inputText)
    }

    const handleBackPress = () => {
        navigation.navigate("Landing")
    }

    const handleRegister = async (firstName, lastName, email, password) => {
        try {
            if (firstName === "" || lastName === "" || email === "" || password === "") {
                setErrorMessage("One or more fields are empty")
                setTimeout(() => {
                    setErrorMessage("")
                }, 3000)
                return
            }
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fname: firstName,
                    lname: lastName,
                    email: email,
                    password: password,
                    vegan: false,
                    image: 'https://github.com/zmolla99/profile_pics/blob/main/download.png?raw=true'
                }),
            }
            const response = await fetch("https://mocktologist-backend.onrender.com/user/register", options)
            if (!response.ok) {
                setErrorMessage("Error during signup.")
                setTimeout(() => {
                    setErrorMessage("")
                }, 3000)
                return
            }
            navigation.navigate("Login")
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}> Register </Text>
                </View>
                <TouchableHighlight style={styles.backButton} underlayColor="transparent" onPress={handleBackPress}>
                    <Text style={styles.aboutText}>←</Text>
                </TouchableHighlight>
                <View style={styles.inputContainer1}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={styles.input.placeholder.color}
                        value={firstName}
                        onChangeText={handleFirstNameChange}
                    />
                </View>
                <View style={styles.inputContainer2}>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={styles.input.placeholder.color}
                        value={lastName}
                        onChangeText={handleLastNameChange}
                    />
                </View>
                <View style={styles.inputContainer2}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={styles.input.placeholder.color}
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                </View>
                <View style={styles.inputContainer2}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor={styles.input.placeholder.color}
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                </View>
                <View style={styles.buttonContainer2}>
                    <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={() => handleRegister(firstName, lastName, email, password)}>
                        <Text style={styles.buttonText}> Register </Text>
                    </TouchableHighlight>
                </View>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </ImageBackground>
    );
}
