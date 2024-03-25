import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { useIsFocused } from '@react-navigation/native'
import styles from '../style'
import medalNone from '../assets/medal-none.png'
import medalBronze from '../assets/medal-bronze.png'
import medalSilver from '../assets/medal-silver.png'
import medalGold from '../assets/medal-gold.png'

function Medal() {
    const { userId, token } = useAuth()
    const isFocused = useIsFocused()
    const [count, setCount] = useState(0)
    const [image, setImage] = useState(medalNone)
    const [rankText, setRankText] = useState("Beginner")

    useEffect(() => {
        setCount(0)
        const fetchCount = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                };
                const response = await fetch(`https://mocktologist-backend.onrender.com/user/count/${userId}`, options);
                const data = await response.json();
                setCount(data);
            } catch (error) {
                console.error(error)
            }
        }
        if (isFocused) {
            fetchCount();
        }
    }, [isFocused]);

    useEffect(() => {
        const chooseImage = count => {
            if (count < 5) {
                return medalNone;
            } else if (count < 10) {
                return medalBronze;
            } else if (count < 15) {
                return medalSilver;
            } else {
                return medalGold;
            }
        };
        const chooseText = count => {
            if (count < 5) {
                return "Beginner";
            } else if (count < 10) {
                return "Apprentice";
            } else if (count < 15) {
                return "Adept";
            } else {
                return "Master";
            }
        };
        setImage(chooseImage(count));
        setRankText(chooseText(count))
    }, [count]);

    return (
        <View>
            <Image source={image} style={styles.medal} resizeMode="contain" />
            <Text style={styles.rankText}>{rankText} Mocktologist</Text>
            <Text style={styles.rankText}>Mocktails mixed: {count}</Text>
        </View>
    );
}

export default Medal;