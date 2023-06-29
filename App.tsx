import { useCallback } from "react";
import Navigation from "./src/Navigation";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export default function App() {
    useFonts({
        "Quicksand-Light": require("./assets/fonts/Quicksand/static/Quicksand-Light.ttf"),
        "Quicksand-Regular": require("./assets/fonts/Quicksand/static/Quicksand-Regular.ttf"),
        "Quicksand-Medium": require("./assets/fonts/Quicksand/static/Quicksand-Medium.ttf"),
        "Quicksand-SemiBold": require("./assets/fonts/Quicksand/static/Quicksand-SemiBold.ttf"),
        "Quicksand-Bold": require("./assets/fonts/Quicksand/static/Quicksand-Bold.ttf"),
    });

    return <Navigation />;
}
