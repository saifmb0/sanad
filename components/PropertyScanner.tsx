import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import { Search, Shield, AlertTriangle, XCircle, CheckCircle, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { PROPERTY_SCAN_RESULT } from '@/constants/mockData';

const { width } = Dimensions.get('window');

export const PropertyScanner: React.FC = () => {
    const [link, setLink] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const spinAnim = useRef(new Animated.Value(0)).current;

    const startScan = async () => {
        if (!link.trim()) return;

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsScanning(true);

        // Spinning animation
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();

        // Simulate scanning for 2 seconds
        setTimeout(async () => {
            setIsScanning(false);
            spinAnim.setValue(0);
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            setShowResults(true);
        }, 2000);
    };

    const closeModal = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowResults(false);
        setLink('');
    };

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Search size={20} color={Colors.dark.textSecondary} />
                <TextInput
                    style={styles.input}
                    placeholder="Paste Dubizzle/PropertyFinder link..."
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={link}
                    onChangeText={setLink}
                />
            </View>

            <TouchableOpacity
                style={[styles.scanButton, !link.trim() && styles.scanButtonDisabled]}
                onPress={startScan}
                disabled={!link.trim() || isScanning}
                activeOpacity={0.7}
            >
                {isScanning ? (
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Shield size={20} color="#FFFFFF" />
                    </Animated.View>
                ) : (
                    <Shield size={20} color="#FFFFFF" />
                )}
                <Text style={styles.scanButtonText}>
                    {isScanning ? 'Scanning...' : 'Verify Property'}
                </Text>
            </TouchableOpacity>

            {/* Risk Analysis Modal */}
            <Modal visible={showResults} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View style={styles.riskBadge}>
                                <AlertTriangle size={20} color="#FFFFFF" />
                                <Text style={styles.riskBadgeText}>HIGH RISK</Text>
                            </View>
                            <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
                                <X size={24} color={Colors.dark.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalTitle}>🚨 Risk Analysis Report</Text>

                        <View style={styles.resultItem}>
                            <Text style={styles.resultLabel}>Title Deed Status</Text>
                            <View style={styles.resultValue}>
                                <XCircle size={18} color={Colors.dark.danger} />
                                <Text style={[styles.resultText, styles.dangerText]}>MISMATCH</Text>
                            </View>
                        </View>

                        <View style={styles.resultItem}>
                            <Text style={styles.resultLabel}>Owner Name</Text>
                            <Text style={styles.resultText}>{PROPERTY_SCAN_RESULT.ownerName}</Text>
                        </View>

                        <View style={styles.resultItem}>
                            <Text style={styles.resultLabel}>Listing Agent</Text>
                            <View style={styles.resultValue}>
                                <XCircle size={18} color={Colors.dark.danger} />
                                <Text style={[styles.resultText, styles.dangerText]}>{PROPERTY_SCAN_RESULT.listingAgent} (No Match)</Text>
                            </View>
                        </View>

                        <View style={styles.resultItem}>
                            <Text style={styles.resultLabel}>Dispute History</Text>
                            <Text style={[styles.resultText, styles.dangerText]}>
                                2 active RDC cases for "Deposit Refund"
                            </Text>
                        </View>

                        <View style={styles.recommendation}>
                            <AlertTriangle size={24} color={Colors.dark.danger} />
                            <Text style={styles.recommendationText}>
                                {PROPERTY_SCAN_RESULT.recommendation}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.closeButton} onPress={closeModal} activeOpacity={0.7}>
                            <Text style={styles.closeButtonText}>Close Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.card,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: Colors.dark.text,
        paddingVertical: 14,
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.accent,
        borderRadius: 12,
        paddingVertical: 16,
        gap: 8,
    },
    scanButtonDisabled: {
        opacity: 0.5,
    },
    scanButtonText: {
        color: '#0A1628',
        fontSize: 16,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.dark.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    riskBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.danger,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 8,
    },
    riskBadgeText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.dark.text,
        marginBottom: 24,
    },
    resultItem: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
    },
    resultLabel: {
        fontSize: 13,
        color: Colors.dark.textSecondary,
        marginBottom: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    resultValue: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    resultText: {
        fontSize: 16,
        color: Colors.dark.text,
        fontWeight: '500',
    },
    dangerText: {
        color: Colors.dark.danger,
        fontWeight: '700',
    },
    recommendation: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 24,
        gap: 12,
    },
    recommendationText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: Colors.dark.danger,
    },
    closeButton: {
        backgroundColor: Colors.dark.border,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: '600',
    },
});
