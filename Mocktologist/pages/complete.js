import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, Image, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { useAuth } from '../hooks/useAuth';
import styles from '../style';
import { useIsFocused } from '@react-navigation/native';

export default function Complete({ navigation }) {

    const { userId, token } = useAuth()

    const [rating, setRating] = useState(5)
    const [image, setImage] = useState('')
    const [uploadImg, setUploadImg] = useState('')
    const [done, setDone] = useState(false)
    const [id, setId] = useState(0)

    const isFocused = useIsFocused()

    const placeholders = [
        'https://media.istockphoto.com/id/1303977605/photo/five-cocktails-in-hands-joined-in-celebratory-toast.jpg?s=612x612&w=0&k=20&c=QtnWuVeQCwKOfXIISxfkuDhQTe15qnnKOFKgpcH1Vko=',
        'https://t4.ftcdn.net/jpg/00/83/43/35/360_F_83433594_0xo0M4r8WPJFqVktFUu7ubkn831t4kpu.jpg',
        'https://media.istockphoto.com/id/917737514/photo/barmans-hands-sprinkling-the-juice-into-the-cocktail-glass.jpg?s=612x612&w=0&k=20&c=9gWN7LlTLDxal1QUpVYHSLUwJ6U9NoYWG52K2GVVFPI=',
        'https://media.istockphoto.com/id/1319973261/photo/people-hands-toasting-multicolored-fancy-drinks-young-friends-having-fun-together-drinking.jpg?s=612x612&w=0&k=20&c=_laIepgjipbjSO_E-6KD-hGvJuRl-qb6M60rB946Tvg=',
        'https://www.shutterstock.com/image-photo/friends-toasting-saying-cheers-holding-600nw-780298633.jpg',
        'https://cdn.pixabay.com/photo/2017/08/03/21/48/drinks-2578446_640.jpg',
        'https://cdn.create.vista.com/api/media/small/647087706/stock-photo-bright-glowing-colourful-cocktails-reflecting-glass-black-background',
        'https://thumbs.dreamstime.com/b/margaritas-most-popular-cocktails-series-6780543.jpg'
    ]


    useEffect(() => {
        if (isFocused) {
            const getId = async () => {
                try {
                    const options = {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: token,
                        }
                    }
                    const response = await fetch(`https://mocktologist-backend.onrender.com/drink/current/${userId}`, options)
                    const data = await response.json()
                    if (response.ok) {
                        setId(data.id)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            getId()
            setImage('https://github.com/zmolla99/profile_pics/blob/main/360_f_565224180_qnrirqkf9fw0dkrozgwuknmmfk51suss__5__360.png?raw=true')
            setRating(5)
            const newIndex = Math.floor(Math.random() * placeholders.length);
            setUploadImg(placeholders[newIndex])
        }
    }, [isFocused])

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
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
            const path = `${userId}/drinks/${Date.now()}.jpg`;
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
            setImage(responseData.content.download_url);
            setUploadImg(responseData.content.download_url)
            return image;
        } catch (error) {
            console.error('Error uploading image to GitHub:', error);
            throw error;
        }
    };

    const handleDone = async () => {
        setDone(true)
        try {
            const options = {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    image: uploadImg,
                    rating: rating,
                    done: true
                }),
            }
            const response = await fetch(`https://mocktologist-backend.onrender.com/drink/${id}`, options)
            if (response.ok) {
                setTimeout(() => {
                    setDone(false)
                    navigation.navigate("Dashboard")
                }, 1500);
            }
        } catch (error) {
            setDone(false)
            console.error(error);
        }


    }

    if (done) {
        return (
            <View style={styles.completebg}>
                <Text style={styles.completemsg}>Cheers!</Text>
                <Image
                    source={{ uri: 'https://media2.giphy.com/media/jj0cTIyyiCWrBKM73f/giphy.gif?cid=6c09b952oczhf1e4kiasjrpk3utrrdqi9c62gp6754qsddfp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s' }}
                    style={styles.done}
                />
            </View>
        )
    }

    return (
        <View style={styles.completebg}>
            <Text style={styles.completemsg}>Thirst Quenched!</Text>
            <Image
                source={{ uri: 'https://img1.picmix.com/output/stamp/normal/1/9/4/1/1061491_26600.gif' }}
                style={styles.completeimg}
            />
            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={{ uri: image }}
                    style={styles.completeup}
                />
            </TouchableOpacity>
            <View style={styles.ddboxc}>
                <Text style={styles.dropdownMess}> Drink Rating </Text>
                <Dropdown
                    style={styles.dropDownc}
                    placeholder={rating}
                    data={[
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                        { label: '6', value: 6 },
                        { label: '7', value: 7 },
                        { label: '8', value: 8 },
                        { label: '9', value: 9 },
                        { label: '10', value: 10 },
                    ]}
                    labelField="label"
                    valueField="value"
                    value={rating}
                    onChange={item => setRating(item.value)}
                    selectedTextStyle={[{ color: 'white' }, { marginLeft: '45%' }, { fontWeight: 'bold' }]}
                    placeholderStyle={[{ color: 'white' }, { marginLeft: '45%' }]}
                />
            </View>
            <TouchableHighlight style={styles.buttonc} underlayColor="#ED91C8" onPress={handleDone}>
                <Text style={styles.buttonText}> Complete </Text>
            </TouchableHighlight>
        </View>
    );
}