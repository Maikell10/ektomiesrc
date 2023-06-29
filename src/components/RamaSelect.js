import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Colors from "../constants/Colors";

import Checkbox from "expo-checkbox";

const RamaSelect = ({ name, value, onValueChange }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: value ? Colors.lightGray : Colors.light,
                marginVertical: 5,
                borderRadius: 15,
                height: 55,
                paddingHorizontal: 10,
            }}
        >
            <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: "600" }}>
                {name}
            </Text>
            <View
                style={{
                    marginVertical: 5,
                }}
            >
                <Checkbox
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                    value={value}
                    onValueChange={onValueChange}
                    color={value ? Colors.skyBlue : undefined}
                />
            </View>
        </View>
    );
};

export default RamaSelect;
