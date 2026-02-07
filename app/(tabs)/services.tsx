import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { ShieldCheck, Plane, GraduationCap, Car, HeartPulse, Zap } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { SERVICES } from '@/constants/mockData';

const getServiceIcon = (iconName: string, color: string) => {
    const size = 28;
    switch (iconName) {
        case 'shield-check':
            return <ShieldCheck size={size} color={color} />;
        case 'passport':
            return <Plane size={size} color={color} />;
        case 'graduation-cap':
            return <GraduationCap size={size} color={color} />;
        case 'car':
            return <Car size={size} color={color} />;
        case 'heart-pulse':
            return <HeartPulse size={size} color={color} />;
        case 'zap':
            return <Zap size={size} color={color} />;
        default:
            return <ShieldCheck size={size} color={color} />;
    }
};

export default function ServicesScreen() {
    const handleServicePress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Government Services</Text>
                    <Text style={styles.subtitle}>All services in one place</Text>
                </View>

                <View style={styles.grid}>
                    {SERVICES.map((service) => (
                        <TouchableOpacity
                            key={service.id}
                            style={styles.serviceCard}
                            onPress={handleServicePress}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: service.color + '20' }]}>
                                {getServiceIcon(service.icon, service.color)}
                            </View>
                            <Text style={styles.serviceName}>{service.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>🔒 Secure Access</Text>
                    <Text style={styles.infoText}>
                        All services are protected with UAE PASS and require biometric authentication for sensitive operations.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.dark.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.dark.textSecondary,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        gap: 12,
    },
    serviceCard: {
        width: '47%',
        backgroundColor: Colors.dark.card,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    serviceName: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.dark.text,
        textAlign: 'center',
    },
    infoCard: {
        margin: 20,
        marginTop: 32,
        padding: 20,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.dark.accent,
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: Colors.dark.textSecondary,
        lineHeight: 20,
    },
});
