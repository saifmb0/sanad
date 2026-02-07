import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Shield } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { USER_PROFILE } from '@/constants/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = CARD_WIDTH * 0.63;

export const EmiratesIDCard: React.FC = () => {
    const hologramAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(hologramAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false,
            })
        ).start();
    }, []);

    const hologramPosition = hologramAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-100%', '200%'],
    });

    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                {/* Holographic overlay effect */}
                <Animated.View
                    style={[
                        styles.hologram,
                        { left: hologramPosition }
                    ]}
                />

                {/* Card content */}
                <View style={styles.cardHeader}>
                    <Text style={styles.country}>UNITED ARAB EMIRATES</Text>
                    <Text style={styles.cardType}>IDENTITY CARD</Text>
                </View>

                <View style={styles.cardBody}>
                    <View style={styles.photoPlaceholder}>
                        <Shield size={32} color={Colors.dark.accent} />
                    </View>

                    <View style={styles.info}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.value}>{USER_PROFILE.name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>ID Number</Text>
                            <Text style={styles.idNumber}>{USER_PROFILE.emiratesId}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Nationality</Text>
                            <Text style={styles.value}>{USER_PROFILE.nationality}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.chipArea}>
                        <View style={styles.chip} />
                    </View>
                    <View style={styles.visaBadge}>
                        <Text style={styles.visaType}>{USER_PROFILE.visaType}</Text>
                    </View>
                </View>

                {/* Decorative elements */}
                <View style={styles.pattern} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        padding: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
    },
    hologram: {
        position: 'absolute',
        top: 0,
        width: 100,
        height: '100%',
        backgroundColor: 'transparent',
        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
        transform: [{ skewX: '-20deg' }],
    },
    cardHeader: {
        marginBottom: 16,
    },
    country: {
        fontSize: 10,
        fontWeight: '600',
        color: Colors.dark.accent,
        letterSpacing: 2,
    },
    cardType: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.dark.text,
        marginTop: 4,
    },
    cardBody: {
        flexDirection: 'row',
        flex: 1,
    },
    photoPlaceholder: {
        width: 70,
        height: 90,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        gap: 8,
    },
    infoRow: {
        marginBottom: 4,
    },
    label: {
        fontSize: 9,
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.dark.text,
        marginTop: 2,
    },
    idNumber: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.dark.accent,
        letterSpacing: 1,
        marginTop: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    chipArea: {
        width: 40,
        height: 28,
        backgroundColor: Colors.dark.accent,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip: {
        width: 24,
        height: 18,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 2,
    },
    visaBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.dark.success,
    },
    visaType: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.dark.success,
    },
    pattern: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 30,
        borderColor: 'rgba(212, 175, 55, 0.1)',
    },
});
