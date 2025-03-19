import React, { useState, useEffect } from "react";
import { View, Animated, Pressable, Text } from "react-native";

const ProfileSwitch = ({
  value,
  onChange,
  onText = "ON",
  offText = "OFF",
  width = 50,
  height = 25,
  disabled = false,
}) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const toggleSwitch = () => {
    if (disabled) return; // Jangan bisa di-tap kalau disabled
    onChange(!value);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, width - height], // Posisi bulatan ON/OFF
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#bbb", "#4CAF50"], // Warna OFF & ON
  });

  return (
    <Pressable
      onPress={toggleSwitch}
      style={{
        flexDirection: "row",
        alignItems: "center",
        opacity: disabled ? 0.5 : 1, // Efek transparan kalau disabled
      }}
      disabled={disabled}
    >
      <View style={{ marginRight: 10 }}>
        <Text style={{ color: value ? "#4CAF50" : "#bbb", fontWeight: "bold" }}>
          {value ? onText : offText}
        </Text>
      </View>
      <Animated.View
        style={{
          width,
          height,
          borderRadius: height / 2,
          backgroundColor,
          padding: 2,
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={{
            width: height - 5,
            height: height - 5,
            borderRadius: (height - 5) / 2,
            backgroundColor: "#fff",
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </Pressable>
  );
};

export default ProfileSwitch;
