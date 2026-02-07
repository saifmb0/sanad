import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { MapPin, Calendar, Clock, CheckCircle, PartyPopper } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { EDUCATION_PROGRAM } from '@/constants/mockData';

interface EnrollmentModalProps {
    visible: boolean;
    onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ visible, onClose }) => {
    const [enrolled, setEnrolled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleEnroll = async () => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setEnrolled(true);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
            onClose();
            // Reset for next time
            setTimeout(() => setEnrolled(false), 500);
        }, 2500);
    };

    const handleClose = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    {showSuccess ? (
                        <View style={styles.successContainer}>
                            <View style={styles.successIcon}>
                                <PartyPopper size={48} color={Colors.dark.success} />
                            </View>
                            <Text style={styles.successTitle}>🎉 Enrollment Confirmed!</Text>
                            <Text style={styles.successSubtitle}>
                                Schedule added to Calendar.{'\n'}See you on {EDUCATION_PROGRAM.startDate}!
                            </Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>100% FREE</Text>
                                </View>
                                <Text style={styles.provider}>{EDUCATION_PROGRAM.provider}</Text>
                            </View>

                            <Text style={styles.title}>Government Support Program</Text>
                            <Text style={styles.programName}>{EDUCATION_PROGRAM.name}</Text>

                            <View style={styles.details}>
                                <View style={styles.detailRow}>
                                    <MapPin size={18} color={Colors.dark.textSecondary} />
                                    <Text style={styles.detailText}>{EDUCATION_PROGRAM.location}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Calendar size={18} color={Colors.dark.textSecondary} />
                                    <Text style={styles.detailText}>Starts {EDUCATION_PROGRAM.startDate}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Clock size={18} color={Colors.dark.textSecondary} />
                                    <Text style={styles.detailText}>{EDUCATION_PROGRAM.schedule}</Text>
                                </View>
                            </View>

                            <View style={styles.subsidyCard}>
                                <CheckCircle size={24} color={Colors.dark.success} />
                                <View style={styles.subsidyText}>
                                    <Text style={styles.subsidyTitle}>Fully Subsidized</Text>
                                    <Text style={styles.subsidySubtitle}>
                                        This program is funded by the Ministry of Education
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.enrollButton}
                                onPress={handleEnroll}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.enrollButtonText}>Confirm Enrollment</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleClose}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.cancelButtonText}>Maybe Later</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: Colors.dark.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    badge: {
        backgroundColor: Colors.dark.success,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    provider: {
        color: Colors.dark.textSecondary,
        fontSize: 14,
    },
    title: {
        fontSize: 14,
        color: Colors.dark.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    programName: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.dark.text,
        marginBottom: 24,
    },
    details: {
        marginBottom: 24,
        gap: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    detailText: {
        fontSize: 15,
        color: Colors.dark.text,
    },
    subsidyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        gap: 16,
    },
    subsidyText: {
        flex: 1,
    },
    subsidyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.success,
        marginBottom: 4,
    },
    subsidySubtitle: {
        fontSize: 13,
        color: Colors.dark.textSecondary,
    },
    enrollButton: {
        backgroundColor: Colors.dark.info,
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 12,
    },
    enrollButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    cancelButton: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: Colors.dark.textSecondary,
        fontSize: 15,
    },
    successContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    successIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.dark.text,
        marginBottom: 12,
    },
    successSubtitle: {
        fontSize: 16,
        color: Colors.dark.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
});
