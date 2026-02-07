import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, StatusBar, SafeAreaView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { AlertCard } from '@/components/AlertCard';
import { PropertyScanner } from '@/components/PropertyScanner';
import { EnrollmentModal } from '@/components/EnrollmentModal';
import { Colors } from '@/constants/Colors';
import { ALERTS, Alert } from '@/constants/mockData';

export default function HomeScreen() {
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);
  const [refreshing, setRefreshing] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate refresh
    setTimeout(() => {
      setAlerts(ALERTS);
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleAction = (alert: Alert) => {
    if (alert.actionTarget === 'education_modal') {
      setShowEnrollment(true);
    }
  };

  const handleDismiss = async (id: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good Evening</Text>
        <Text style={styles.title}>Sanad سند</Text>
      </View>
      <View style={styles.liveBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>Live</Text>
      </View>
    </View>
  );

  const renderPropertyScanner = () => (
    <View style={styles.scannerSection}>
      <Text style={styles.sectionTitle}>🏠 Property Guardian</Text>
      <Text style={styles.sectionSubtitle}>Verify any listing before you rent</Text>
      <PropertyScanner />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderPropertyScanner()}
            <Text style={styles.feedTitle}>📋 Your Alerts</Text>
          </>
        }
        renderItem={({ item }) => (
          <AlertCard
            alert={item}
            onAction={() => handleAction(item)}
            onDismiss={() => handleDismiss(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.dark.accent}
          />
        }
      />

      <EnrollmentModal
        visible={showEnrollment}
        onClose={() => setShowEnrollment(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  list: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.dark.text,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.success,
  },
  liveText: {
    color: Colors.dark.success,
    fontSize: 12,
    fontWeight: '600',
  },
  scannerSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
});
