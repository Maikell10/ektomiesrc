import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../context/redux";

const RamaCard = ({ containerStyle, imageStyle, item, onPress }) => {
    const [subPathologies, setSubPathologies] = useState([]);

    useEffect(() => {
        //console.log(item);
    }, []);

    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                borderRadius: 15,
                backgroundColor: "#EAEAEA",
                ...containerStyle,
            }}
            onPress={onPress}
        >
            {/* Image */}
            <Image source={{ uri: item.ramas.image }} style={imageStyle} />

            {/* Info */}
            <View style={{ flex: 1, marginLeft: 7, marginRight: 10 }}>
                {/* Name */}
                <Text
                    style={{ fontSize: 18, fontFamily: "Quicksand-Bold" }}
                    numberOfLines={2}
                >
                    {item.ramas.name}
                </Text>

                {/* Description */}
                <Text
                    style={{
                        color: "gray",
                        fontSize: 14,
                        fontFamily: "Quicksand-Medium",
                    }}
                    numberOfLines={2}
                >
                    {item.ramas.short_desc}
                </Text>

                <Text
                    style={{
                        color: "skyblue",
                        fontSize: 14,
                        textAlign: "right",
                        marginTop: 6,
                        fontFamily: "Quicksand-Bold",
                    }}
                >
                    {item.nombre_especialidad}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default RamaCard;
