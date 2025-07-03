import { colors } from '@/utils/globalStyles';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: colors.bg,
          paddingTop: 40,
        },
        // Use a transparent background on iOS to show the blur effect
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          //   tabBarIcon: ({ color }) => (
          //     <IconSymbol size={28} name="house.fill" color={color} />
          //   ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          //   tabBarIcon: ({ color }) => (
          //     <IconSymbol size={28} name="paperplane.fill" color={color} />
          //   ),
        }}
      />
    </Tabs>
  );
}
