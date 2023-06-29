import React from "react";
import { View, Text } from "react-native";
import Colors from "../constants/Colors";

const Header = ({ containerStyle, title, leftComponent, rightComponent }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                ...containerStyle,
                borderBottomWidth: 0.3,
                borderBottomColor: Colors.darkGray,
            }}
        >
            {/* Left */}
            {leftComponent}

            {/* Title */}
            <View
                style={{
                    flex: 1,
                    //alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ fontSize: 15, fontFamily: "Quicksand-Medium" }}>
                    {title}
                </Text>
            </View>

            {/* Right */}
            {rightComponent}
        </View>
    );
};

export default Header;
