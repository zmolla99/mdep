import { View, Text, ImageBackground, TextInput, TouchableHighlight, TouchableOpacity, Switch, Image } from "react-native";
import { useAuth } from '../hooks/useAuth';
import { useOverlayPopup } from "../hooks/useOverlayPopup";
import styles from '../style';
import { useEffect, useState } from "react";
import { PopupText } from "../components";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from "@react-navigation/native";

export default function Profile() {

    const isFocused = useIsFocused()

    const { token, userId, firstName, setFirstName, image, setImage, setVegan, vegan } = useAuth()

    const [editingFirstName, setEditingFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [systemMessage, setSystemMessage] = useState("")
    const [newpfp, setNewpfp] = useState(image)
    const [newVegan, setNewVegan] = useState(false)

    const handleFirstNameChange = (inputText) => {
        setEditingFirstName(inputText);
    }

    const handleLastNameChange = (inputText) => {
        setLastName(inputText);
    }

    const handleEmailChange = (inputText) => {
        setEmail(inputText);
    }

    const toggleVegan = () => {
        setNewVegan(previousValue => !previousValue);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            try {
                const uploadedImage = await uploadImageToGitHub(result.assets[0].uri);
                console.log('Uploaded image details:', uploadedImage);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const uploadImageToGitHub = async (imageUri) => {
        try {
            const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

            const owner = 'zmolla99';
            const repo = 'profile_pics';
            const path = `${userId}/pfp/${Date.now()}.jpg`;
            const message = 'Upload image';
            const accessToken = '';
            const content = {
                message,
                content: base64Image,
            };
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            });

            if (!response.ok) {
                throw new Error('Failed to upload image to GitHub');
            }

            const responseData = await response.json();
            console.log('Image uploaded successfully:', responseData);
            setNewpfp(responseData.content.download_url);
            return newpfp;
        } catch (error) {
            console.error('Error uploading image to GitHub:', error);
            throw error;
        }
    };

    const updateUserDetails = async () => {
        try {
            const options = {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({
                    fname: editingFirstName,
                    lname: lastName,
                    email: email,
                    vegan: newVegan,
                    image: newpfp
                }),
            }
            const response = await fetch(`https://mocktologist-backend.onrender.com/user/${userId}`, options)
            if (!response.ok) {
                setSystemMessage("Could not update user details.");
                setTimeout(() => {
                    setSystemMessage("");
                }, 3000);
                return;
            }
            setSystemMessage("User details updated.");
            setImage(newpfp)
            setFirstName(editingFirstName)
            setVegan(newVegan)
            setTimeout(() => {
                setSystemMessage("");
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (isFocused) {
            const fetchUserDetails = async () => {
                setSystemMessage("")
                try {
                    if (!token) {
                        return
                    }
                    const response = await fetch(`https://mocktologist-backend.onrender.com/user/${token}`)
                    if (!response.ok) {
                        setSystemMessage("Failed to fetch user details. Please refresh the page.")
                    }
                    const data = await response.json()
                    setFirstName(data.fname)
                    setLastName(data.lname)
                    setEmail(data.email)
                    setNewVegan(data.vegan)
                    setNewpfp(data.image)
                } catch (error) {
                    console.error(error);
                }
            }
            setEditingFirstName(firstName)
            fetchUserDetails()
        }
    }, [isFocused])

    const { showOverlay, setShowOverlay, showPopup, setShowPopup } = useOverlayPopup();

    const handlePopupPress = () => {
        setShowOverlay(false)
        setShowPopup(false)
    }

    const Overlay = () => {
        return (
            <View style={styles.overlay} />
        );
    }

    const Popup = () => {
        return (
            <View style={styles.popupBox}>
                <TouchableOpacity style={styles.popupButton} onPress={handlePopupPress}>
                    <Text style={styles.popupButtonText}>X</Text>
                </TouchableOpacity>
                <PopupText />
            </View>
        )
    }

    return (
        <ImageBackground source={require("../assets/background.png")} style={styles.background}>
            <View style={styles.container2}>
                {showOverlay && <Overlay />}
                {showPopup && <Popup />}
                <View style={styles.textContainer2}>
                    <Text style={styles.heading}> Profile </Text>
                </View>
                <View style={styles.pfp}>
                    <Image
                        source={{ uri: newpfp }}
                        style={styles.pfp2image}
                    />
                    <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={pickImage}>
                        <Text style={styles.buttonText}> Update Photo </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={[styles.inputContainer2, { width: '30%', marginHorizontal: '8%' }]}>
                            <TextInput
                                style={styles.input}
                                value={editingFirstName}
                                onChangeText={handleFirstNameChange}
                                placeholder="First Name"
                            />
                        </View>
                        <View style={[styles.inputContainer2, { width: '30%', marginHorizontal: '8%' }]}>
                            <TextInput
                                style={styles.input}
                                value={lastName}
                                onChangeText={handleLastNameChange}
                                placeholder="Last Name"
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput
                            style={styles.input2}
                            value={email}
                            onChangeText={handleEmailChange}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.vegan}>Vegan:</Text>
                        <Switch
                            value={newVegan}
                            onValueChange={toggleVegan}
                            thumbColor={newVegan ? '#ffffff' : '#ffffff'}
                            trackColor={{ false: '#353535', true: '#ED91C8' }}
                            style={styles.toggle}
                        />
                    </View>
                    <Text style={styles.errorText}>{systemMessage}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button} underlayColor="#ED91C8" onPress={() => updateUserDetails()}>
                        <Text style={styles.buttonText}> Update Details </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ImageBackground>
    )
}
