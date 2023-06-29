import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Colors from "../constants/Colors";

import Checkbox from "expo-checkbox";

const EspecialidadSelect = ({ name, value, onValueChange }) => {
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
            <Text
                numberOfLines={2}
                style={{ fontSize: 16, fontFamily: "Quicksand-SemiBold" }}
            >
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
                    color={value ? Colors.green2 : undefined}
                />
            </View>
        </View>
    );
};

export default EspecialidadSelect;
