import { useAuth } from '../hooks/useAuth'
import { View, Text, ImageBackground, TouchableHighlight, TextInput } from "react-native";
import styles from '../style'
import { useEffect, useState } from 'react';

export default function Login({ navigation }) {
    const { login, token, firstName, userId, vegan, image, setToken, setFirstName, setUserId, setVegan, setImage } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadName, setUploadName] = useState("")

    const handleEmailChange = (inputText) => {
        setEmail(inputText);
    }

    const handlePasswordChange = (inputText) => {
        setPassword(inputText);
    }

    const handleBackPress = () => {
        navigation.navigate("Landing")
    }

    const handleLogin = async (email, password) => {
        try {
            if (email === "" || password === "") {
                setErrorMessage("Email or password missing.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
                return;
            }
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
            const response = await fetch("https://mocktologist-backend.onrender.com/user/login", options);
            if (!response.ok) {
                setErrorMessage("Incorrect email or password.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
                return;
            }
            const data = await response.json();
            setUserId(data.user)
            setToken(data.token)
            setFirstName(data.fname)
            setVegan(data.vegan)
            setImage(data.image)
            navigation.navigate("Dashboard")
        } catch (error) {
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}> Existing User Login </Text>
                </View>
                <TouchableHighlight style={styles.backButton} underlayColor="transparent" onPress={handleBackPress}>
                    <Text style={styles.aboutText}>←</Text>
                </TouchableHighlight>
                <View style={styles.inputContainer1}>
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
                    <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={() => handleLogin(email, password)}>
                        <Text style={styles.buttonText}> Login </Text>
                    </TouchableHighlight>
                </View>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </ImageBackground>
    );
}