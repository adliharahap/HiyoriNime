import React, { useState } from "react";
import { View, Text, Pressable, Animated, FlatList } from "react-native";

const CustomDropdown = ({
  options = [],
  selectedOption,
  onSelect,
  width = 150,
  height = 30,
  backgroundColor = "rgba(255,255,255,0.1)",
  textColor = "#fff",
  dropdownColor = "#333",
  borderRadius = 10,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animatedValue = new Animated.Value(isOpen ? 1 : 0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    Animated.timing(animatedValue, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ width }}>
      {/* Tombol utama (pilihan yang dipilih) */}
      <Pressable onPress={toggleDropdown}>
        <View
          style={{
            height,
            backgroundColor,
            justifyContent: "center",
            paddingHorizontal: 10,
            borderRadius,
            borderWidth: 1,
            borderColor: "#555",
          }}
        >
          <Text style={{ color: textColor, textAlign: 'center', fontFamily: 'OpenSans_Condensed-SemiBold', fontSize: 16 }}>
            {options.find((opt) => opt.value === selectedOption)?.label || "Pilih Opsi"}
          </Text>
        </View>
      </Pressable>

      {/* Dropdown List */}
      {isOpen && (
        <Animated.View
          style={{
            backgroundColor: dropdownColor,
            position: "absolute",
            top: height + 5,
            left: 0,
            right: 0,
            zIndex: 10,
            borderRadius,
            borderWidth: 1,
            borderColor: "#555",
            maxHeight: 150, // Biar nggak kepanjangan
            overflow: "hidden",
          }}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item.value);
                  toggleDropdown();
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#444",
                }}
              >
                <Text style={{ color: textColor, fontFamily: 'OpenSans_Condensed-SemiBold', fontSize: 14 }}>{item.label}</Text>
              </Pressable>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default CustomDropdown;
