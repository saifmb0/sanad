import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { ScanFace } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface FaceIDScanProps {
    onComplete: () => void;
}

export const FaceIDScan: React.FC<FaceIDScanProps> = ({ onComplete }) => {
    const scanAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Scan line animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(scanAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Complete after 2.5 seconds
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => onComplete());
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const scanLineY = scanAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 50],
    });

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.content}>
                <View style={styles.scanFrame}>
                    <ScanFace size={80} color={Colors.dark.accent} />
                    <Animated.View
                        style={[
                            styles.scanLine,
                            { transform: [{ translateY: scanLineY }] }
                        ]}
                    />
                </View>
                <Text style={styles.title}>Authenticating...</Text>
                <Text style={styles.subtitle}>Look at your device to continue</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.dark.background,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    content: {
        alignItems: 'center',
    },
    scanFrame: {
        width: 140,
        height: 140,
        borderRadius: 24,
        borderWidth: 3,
        borderColor: Colors.dark.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        overflow: 'hidden',
    },
    scanLine: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: Colors.dark.accent,
        shadowColor: Colors.dark.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.dark.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.dark.textSecondary,
    },
});
