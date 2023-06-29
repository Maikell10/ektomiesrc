import React from "react";
import { TouchableOpacity, Text } from "react-native";
import COLORS from "../constants/Colors";

const TextButtonOnBoarding = ({
    buttonContainerStyle,
    label,
    labelStyle,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.greeEk,
                ...buttonContainerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontFamily: "Quicksand-Bold",
                    ...labelStyle,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default TextButtonOnBoarding;
