import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15, // Horizontal padding
    // paddingTop: 30,   // Vertical padding
    backgroundColor: "#f5f5f5", // Optional background color
  },
});
