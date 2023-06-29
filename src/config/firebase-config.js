import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { initializeAuth } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

// export const firebaseConfig = {
//     apiKey: Constants.manifest.extra.apiKey,
//     authDomain: Constants.manifest.extra.authDomain,
//     projectId: Constants.manifest.extra.projectId,
//     storageBucket: Constants.manifest.extra.storageBucket,
//     messagingSenderId: Constants.manifest.extra.messagingSenderId,
//     appId: Constants.manifest.extra.appId,
//     measurementId: Constants.manifest.extra.measurementId,
// };

export const firebaseConfig = {
    apiKey: "AIzaSyC6lrWpmo9Sqx4gJdhIk45x6r03ZjGJwcw",
    authDomain: "ektomie-7f1ca.firebaseapp.com",
    projectId: "ektomie-7f1ca",
    storageBucket: "ektomie-7f1ca.appspot.com",
    messagingSenderId: "153495515930",
    appId: "1:153495515930:web:7ed1abf3f0f7e2260d32a3",
    measurementId: "G-PPRLBG89R6",
};

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export const database = getFirestore(app);

if (!firebase.apps.length) {
    const defaultApp = firebase.initializeApp(firebaseConfig);

    initializeAuth(defaultApp, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}

export { firebase };
