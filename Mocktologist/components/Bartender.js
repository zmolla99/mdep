import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import styles from '../style'

function Bartender({ type }) {
    const bartenderAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bartenderAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(bartenderAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                })
            ]),
            {
                iterations: -1
            }
        ).start();
    }, []);

    const interpolatedRotateAnimation = bartenderAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['-3deg', '3deg']
    });

    const transformStyle = {
        transform: [{ rotate: interpolatedRotateAnimation }]
    };

    return (
        <Animated.Image
                    style={[styles.bartender, transformStyle]}
                    source={require('../assets/bartender.png')}
        />
    )
}

export default Bartender