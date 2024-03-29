import React, { useState } from "react";
import { View, Text, ImageBackground, Image, Animated } from "react-native";
import { constants, SIZES } from "../../constants";
import COLORS from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

import TextButtonOnBoarding from "../../components/TextButtonOnBoarding";

import { store, setUser } from "../../context/redux";

const logoEk = require("../../../assets/icons/logo-ek.jpg");

const OnBoarding = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const flatListRef = React.useRef();

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const onViewChangeRef = React.useRef(({ viewableItems, changed }) => {
        setCurrentIndex(viewableItems[0].index);
    });

    React.useEffect(() => {
        getPersistedAuth();
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("@email");
                if (value !== null) {
                    navigation.navigate("Login");
                }
                console.log(value);
            } catch (e) {
                // error reading value
            }
        };
        getData();
    }, []);

    const getPersistedAuth = async () => {
        const jsonValue = await AsyncStorage.getItem("@auth");
        //console.log("jsonValue", JSON.stringify(jsonValue));
        if (jsonValue != null) {
            setLoading(false);
            const authFromJson = JSON.parse(jsonValue);
            //setAuthGoogle(authFromJson);
            navigation.replace("Home");
        } else {
            setLoading(false);
            await AsyncStorage.clear();
            store.dispatch(setUser(null));
        }
    };

    const Dots = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {constants.onboarding_screens.map((item, index) => {
                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [
                            COLORS.gray2,
                            COLORS.primary,
                            COLORS.gray2,
                        ],
                        extrapolate: "clamp",
                    });

                    const dotWidth = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [10, 30, 10],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            style={{
                                borderRadius: 5,
                                marginHorizontal: 6,
                                width: dotWidth,
                                height: 10,
                                backgroundColor: dotColor,
                            }}
                        />
                    );
                })}
            </View>
        );
    };

    function renderHeaderLogo() {
        return (
            <View
                style={{
                    position: "absolute",
                    top: SIZES.height > 800 ? 50 : 25,
                    left: 0,
                    right: 0,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={logoEk}
                    resizeMode="contain"
                    style={{ width: SIZES.width * 0.5, height: 100 }}
                />
            </View>
        );
    }

    function renderFooter() {
        return (
            <View
                style={{
                    height: 160,
                }}
            >
                {/* Pagination / Dots */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Dots />
                </View>

                {/* Buttons */}
                {currentIndex < constants.onboarding_screens.length - 1 && (
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding,
                            justifyContent: "space-between",
                            width: SIZES.width,
                        }}
                    >
                        <TextButtonOnBoarding
                            label="Saltar"
                            buttonContainerStyle={{ backgroundColor: null }}
                            labelStyle={{ color: COLORS.darkGray2 }}
                            onPress={() => navigation.replace("PreviewScreen")}
                        />

                        <TextButtonOnBoarding
                            label="Siguiente"
                            buttonContainerStyle={{
                                height: 60,
                                width: 200,
                                borderRadius: SIZES.radius,
                            }}
                            onPress={() => {
                                flatListRef?.current?.scrollToIndex({
                                    index: currentIndex + 1,
                                    animated: true,
                                });
                            }}
                        />
                    </View>
                )}
                {currentIndex == constants.onboarding_screens.length - 1 && (
                    <View
                        style={{
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding,
                        }}
                    >
                        <TextButtonOnBoarding
                            label="¡Empecemos!"
                            buttonContainerStyle={{
                                height: 60,
                                width: SIZES.width - 30,
                                borderRadius: SIZES.radius,
                            }}
                            onPress={() => navigation.replace("PreviewScreen")}
                        />
                    </View>
                )}
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {renderHeaderLogo()}

            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: SIZES.width }}>
                            {/* Header */}
                            <View style={{ flex: 3 }}>
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        height: "80%",
                                        width: "100%",
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode="contain"
                                        style={{
                                            width: SIZES.width * 0.8,
                                            height: SIZES.width * 0.8,
                                            marginBottom: -SIZES.padding,
                                        }}
                                    />
                                </ImageBackground>
                            </View>

                            {/* Detail */}
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingHorizontal: SIZES.radius,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontFamily: "Quicksand-Bold",
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: SIZES.radius,
                                        textAlign: "center",
                                        color: COLORS.darkGray,
                                        paddingHorizontal: SIZES.padding,
                                        fontSize: SIZES.body3,
                                        fontFamily: "Quicksand-Medium",
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />

            {renderFooter()}

            <StatusBar style="auto" />
        </View>
    );
};

export default OnBoarding;
