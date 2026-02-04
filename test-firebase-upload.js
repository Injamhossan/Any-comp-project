
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("Testing Firebase Storage Connection...");
console.log("Config Bucket:", firebaseConfig.storageBucket);

async function testUpload() {
  try {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    
    // Create a dummy file buffer
    const buffer = Buffer.from("Hello World, this is a test upload from connection script.");
    const uint8Array = new Uint8Array(buffer);
    
    const filename = `test_connection_${Date.now()}.txt`;
    const storageRef = ref(storage, `test_uploads/${filename}`);
    
    console.log(`Attempting to upload to: test_uploads/${filename}`);

    const snapshot = await uploadBytes(storageRef, uint8Array, {
        contentType: 'text/plain'
    });

    console.log("Upload successful!");
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at:", url);

  } catch (error) {
    console.error("❌ UPLOAD FAILED");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    if (error.customData) {
        console.error("Custom Data:", error.customData);
    }
  }
}

testUpload();
