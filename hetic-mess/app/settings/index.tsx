import { router } from 'expo-router';
import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

import { pb } from '../../db/pocket';

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={styles.setting}
        onPress={() => {
          router.push('/settings/profile');
        }}
      >
        <Text style={styles.settingText}>Profile</Text>
      </TouchableOpacity>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Enable Notifications (🚧 Work In Progress)</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationsToggle}
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingText}>Dark Mode (🚧 Work In Progress)</Text>
        <Switch value={darkModeEnabled} onValueChange={handleDarkModeToggle} />
      </View>

      <TouchableOpacity
        onPress={() => {
          pb.authStore.clear();
          router.push('/auth/login');
        }}
      >
        <Text style={{ color: 'red' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, paddingTop: 45
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
  },
});

export default SettingsPage;
