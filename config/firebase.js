import admin from "firebase-admin";
import path from "path";

// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(path.resolve('./nodejs-base-1df20-firebase-adminsdk-lhkah-5d946604a1.json')),
    storageBucket: 'nodejs-base-1df20.appspot.com',
});
const bucket = admin.storage().bucket()

export default {
    bucket
};