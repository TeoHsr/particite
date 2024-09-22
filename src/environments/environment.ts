// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyBxm6i8NO-IPe5u5cc62A-mXwwHJBAp2Rw",
        authDomain: "particite-fb33f.firebaseapp.com",
        projectId: "particite-fb33f",
        storageBucket: "particite-fb33f.appspot.com",
        messagingSenderId: "367844203548",
        appId: "1:367844203548:web:c346c0d7e7b2e8a70f93d9",
        measurementId: "G-839WHFMR8T",
    },
    useAnalytics: false
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);