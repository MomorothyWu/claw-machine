"use client"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useState, useEffect } from "react";

export default function FB() {

  const firebaseConfig = {
    apiKey: "AIzaSyDM4kNv7gTyRHL7vX_ZdBN20L-NY-nVg7I",
    authDomain: "fir-demo-cc753.firebaseapp.com",
    databaseURL: "https://fir-demo-cc753-default-rtdb.firebaseio.com",
    projectId: "fir-demo-cc753",
    storageBucket: "fir-demo-cc753.firebasestorage.app",
    messagingSenderId: "547407373138",
    appId: "1:547407373138:web:14b40e20e4b7fc773e108b",
    measurementId: "G-9S4KKT964F"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, "/");
  
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });


  }, []);

  const uploadData = () => {
    const dbRef = ref(database, "/");
    push(dbRef, {
      name: "John",
      age: 30,
      time: Date.now()
    });

  }

  return (
    <div className="w-full h-screen">
      <h1>FB</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => {
        uploadData();
      }}>Set Data</button>
    </div>
  );
}