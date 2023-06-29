import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import React from "react";

import Colors from "../constants/Colors";
import { icons } from "../constants";

import ModalSelector from "react-native-modal-selector";

const SelectModal = ({
    data,
    onChange,
    label,
    placeholder,
    value,
    marginLeft,
    selectStyle,
}) => {
    if (!value) {
        value = placeholder;
    }
    return (
        <ModalSelector
            data={data}
            supportedOrientations={["portrait"]}
            accessible={true}
            scrollViewAccessibilityLabel={"Scrollable options"}
            cancelButtonAccessibilityLabel={"Cancel Button"}
            animationType="slide"
            cancelStyle={{
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "red",
                borderRadius: 15,
            }}
            cancelTextStyle={{
                color: "white",
                fontSize: 18,
                fontFamily: "Quicksand-Bold",
            }}
            cancelText="Cancelar"
            onChange={onChange}
            optionTextStyle={{ fontFamily: "Quicksand-Regular" }}
        >
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    height: 50,
                    alignItems: "center",
                    backgroundColor: Colors.light2,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 3.84,
                    elevation: 3,
                    ...selectStyle,
                }}
            >
                <Text
                    style={{
                        padding: 10,
                        width: "80%",
                        color: Colors.dark,
                        fontFamily: "Quicksand-Regular",
                        fontSize: 12,
                    }}
                    numberOfLines={2}
                >
                    {value}
                </Text>
                <Image
                    source={icons.abajo}
                    style={{ width: 20, height: 20, marginLeft: marginLeft }}
                />
            </TouchableOpacity>
        </ModalSelector>
    );
};

export default SelectModal;

const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        width: "100%",
        //color: "gray",
        fontSize: 15,
        //textAlign: "center",
        fontFamily: "Quicksand-Medium",
    },
});
