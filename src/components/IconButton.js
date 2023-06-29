import React from "react";
import { TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";

const IconButton = ({ containerStyle, icon, iconStyle, onPress }) => {
    return (
        <TouchableOpacity style={{ ...containerStyle }} onPress={onPress}>
            <Image
                source={icon}
                style={{
                    width: 30,
                    height: 30,
                    tintColor: Colors.white,
                    ...iconStyle,
                }}
            />
        </TouchableOpacity>
    );
};

export default IconButton;
