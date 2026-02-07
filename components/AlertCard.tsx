import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { GraduationCap, Plane, Home, Car, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/Colors';
import { Alert } from '@/constants/mockData';

const { width } = Dimensions.get('window');

interface AlertCardProps {
    alert: Alert;
    onAction?: () => void;
    onDismiss?: () => void;
}

const getIcon = (category: string, color: string) => {
    const size = 24;
    switch (category) {
        case 'EDUCATION':
            return <GraduationCap size={size} color={color} />;
        case 'VISA':
            return <Plane size={size} color={color} />;
        case 'HOUSING':
            return <Home size={size} color={color} />;
        case 'TRAFFIC':
            return <Car size={size} color={color} />;
        default:
            return <Info size={size} color={color} />;
    }
};

const getSeverityStyles = (severity: string) => {
    switch (severity) {
        case 'critical':
            return { borderColor: Colors.dark.danger, bgColor: 'rgba(239, 68, 68, 0.1)', iconColor: Colors.dark.danger };
        case 'warning':
            return { borderColor: Colors.dark.warning, bgColor: 'rgba(245, 158, 11, 0.1)', iconColor: Colors.dark.warning };
        case 'success':
            return { borderColor: Colors.dark.success, bgColor: 'rgba(16, 185, 129, 0.1)', iconColor: Colors.dark.success };
        default:
            return { borderColor: Colors.dark.info, bgColor: 'rgba(59, 130, 246, 0.1)', iconColor: Colors.dark.info };
    }
};

const getSeverityIcon = (severity: string, color: string) => {
    const size = 16;
    switch (severity) {
        case 'critical':
            return <AlertCircle size={size} color={color} />;
        case 'warning':
            return <AlertTriangle size={size} color={color} />;
        case 'success':
            return <CheckCircle size={size} color={color} />;
        default:
            return <Info size={size} color={color} />;
    }
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onAction, onDismiss }) => {
    const severityStyles = getSeverityStyles(alert.severity);

    const handleAction = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onAction?.();
    };

    const handleDismiss = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onDismiss?.();
    };

    return (
        <View style={[styles.card, { borderLeftColor: severityStyles.borderColor, backgroundColor: severityStyles.bgColor }]}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: severityStyles.borderColor + '20' }]}>
                    {getIcon(alert.category, severityStyles.iconColor)}
                </View>
                <View style={styles.headerText}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{alert.title}</Text>
                        {getSeverityIcon(alert.severity, severityStyles.iconColor)}
                    </View>
                    <Text style={styles.subtitle}>{alert.subtitle}</Text>
                </View>
            </View>

            <Text style={styles.description}>{alert.description}</Text>

            <View style={styles.actions}>
                {alert.actionLabel && (
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: severityStyles.borderColor }]}
                        onPress={handleAction}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.actionButtonText}>{alert.actionLabel}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss} activeOpacity={0.7}>
                    <Text style={styles.dismissButtonText}>Dismiss</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.dark.text,
        flex: 1,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.dark.textSecondary,
        marginTop: 2,
    },
    description: {
        fontSize: 14,
        color: Colors.dark.textSecondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    dismissButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    },
    dismissButtonText: {
        color: Colors.dark.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
});
