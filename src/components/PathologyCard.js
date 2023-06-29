import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../context/redux";

const PathologyCard = ({ containerStyle, imageStyle, item, onPress }) => {
    const [subPathologies, setSubPathologies] = useState([]);

    useEffect(() => {
        getSubPathologies();
    }, []);

    const getSubPathologies = async () => {
        const colRef = collection(db, "sub_pathology_ek");
        const result = await getDocs(colRef);
        //console.log(result.size);

        let subPathologies = [];
        let cont = 0;
        result.forEach((doc, index) => {
            if (item.id === doc.data().pathology_id) {
                subPathologies[cont] = doc.data();
                cont++;
            }
        });
        //console.log(subPathologies.length);
        setSubPathologies(subPathologies);
    };

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
            <Image source={{ uri: item.image }} style={imageStyle} />

            {/* Info */}
            <View style={{ flex: 1, marginLeft: 7, marginRight: 10 }}>
                {/* Name */}
                <Text
                    style={{ fontSize: 18, fontWeight: "600" }}
                    numberOfLines={2}
                >
                    {item.name}
                </Text>

                {/* Description */}
                <Text style={{ color: "gray", fontSize: 14 }} numberOfLines={2}>
                    {item.descripcion}
                </Text>

                <Text style={{ color: "gray", fontSize: 14 }}>
                    Sub-Patologías Disponibles: {subPathologies.length}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PathologyCard;
