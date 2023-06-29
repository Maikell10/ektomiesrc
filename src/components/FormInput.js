import React from "react";
import { View, Text, TextInput } from "react-native";

import Colors from "../constants/Colors";

const FormInput = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    errorMsg = "",
    maxLength,
    value = "",
    input2Style,
    editable = true,
}) => {
    return (
        <View style={{ ...containerStyle }}>
            {/* Label & Error Msg */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        color: "gray",
                        fontSize: 15,
                        fontFamily: "Quicksand-Regular",
                    }}
                >
                    {label}
                </Text>
                <Text
                    style={{
                        color: "red",
                        fontSize: 15,
                        fontFamily: "Quicksand-Regular",
                    }}
                >
                    {errorMsg}
                </Text>
            </View>

            {/* Text Input */}
            <View
                style={{
                    marginTop: 5,
                    flexDirection: "row",
                    height: 35,
                    paddingHorizontal: 5,
                    //marginTop: 5,
                    borderRadius: 15,
                    backgroundColor: Colors.light,
                    ...input2Style,
                }}
            >
                {prependComponent}

                <TextInput
                    style={{ flex: 1, ...inputStyle }}
                    placeholder={placeholder}
                    placeholderTextColor={"gray"}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                    maxLength={maxLength}
                    value={value}
                    editable={editable}
                    selectTextOnFocus={editable}
                />

                {appendComponent}
            </View>
        </View>
    );
};

export default FormInput;
