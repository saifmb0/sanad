import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { AlertTriangle, ChevronRight, Settings, LogOut, Bell, Shield } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { EmiratesIDCard } from '@/components/EmiratesIDCard';
import { Colors } from '@/constants/Colors';
import { USER_PROFILE } from '@/constants/mockData';

export default function ProfileScreen() {
    const handlePress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Digital ID</Text>
                    <Text style={styles.subtitle}>Your verified identity</Text>
                </View>

                <EmiratesIDCard />

                {/* Visa Warning */}
                <View style={styles.warningCard}>
                    <View style={styles.warningIcon}>
                        <AlertTriangle size={24} color={Colors.dark.warning} />
                    </View>
                    <View style={styles.warningContent}>
                        <Text style={styles.warningTitle}>Visa Expires in {USER_PROFILE.daysUntilExpiry} days</Text>
                        <Text style={styles.warningText}>
                            Review auto-renewal draft to maintain your Golden Visa status
                        </Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <TouchableOpacity style={styles.menuItem} onPress={handlePress} activeOpacity={0.7}>
                        <View style={styles.menuIconContainer}>
                            <Bell size={20} color={Colors.dark.text} />
                        </View>
                        <Text style={styles.menuText}>Notification Settings</Text>
                        <ChevronRight size={20} color={Colors.dark.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={handlePress} activeOpacity={0.7}>
                        <View style={styles.menuIconContainer}>
                            <Shield size={20} color={Colors.dark.text} />
                        </View>
                        <Text style={styles.menuText}>Security & Privacy</Text>
                        <ChevronRight size={20} color={Colors.dark.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={handlePress} activeOpacity={0.7}>
                        <View style={styles.menuIconContainer}>
                            <Settings size={20} color={Colors.dark.text} />
                        </View>
                        <Text style={styles.menuText}>App Settings</Text>
                        <ChevronRight size={20} color={Colors.dark.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={handlePress} activeOpacity={0.7}>
                    <LogOut size={20} color={Colors.dark.danger} />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={{ height: 100 }} />
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
        marginBottom: 8,
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
    warningCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 0,
        marginBottom: 24,
        padding: 16,
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.3)',
        gap: 14,
    },
    warningIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningContent: {
        flex: 1,
    },
    warningTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.dark.warning,
        marginBottom: 4,
    },
    warningText: {
        fontSize: 13,
        color: Colors.dark.textSecondary,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.dark.textSecondary,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuText: {
        flex: 1,
        fontSize: 15,
        color: Colors.dark.text,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        gap: 10,
    },
    logoutText: {
        fontSize: 16,
        color: Colors.dark.danger,
        fontWeight: '600',
    },
});
