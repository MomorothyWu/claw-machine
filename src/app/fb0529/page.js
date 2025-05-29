"use client"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";


export default function FB0529() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDv7q1pGeQP2Tupw_6NQxxiGfnU5LJAzjQ",
    authDomain: "nccu-204012.firebaseapp.com",
    projectId: "nccu-204012",
    storageBucket: "nccu-204012.firebasestorage.app",
    messagingSenderId: "371171216729",
    appId: "1:371171216729:web:384fdc3b07872a25d99048",
    databaseURL: "https://nccu-204012-default-rtdb.firebaseio.com/"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dbRef = ref(database, "/");

  const auth = getAuth(); // 一定要寫在initializeApp的後面，初始化完才能登入
  const provider = new GoogleAuthProvider;

  useEffect(() => {

    
    onValue(dbRef, (snapshot) => {
      console.log(snapshot.val());
    });
    
    const userRef = ref(database, "/accounts/0000001");

    set(userRef, {
      points:200
    })

  }, []);

  const addNewAccount = () => {
    console.log("clicked");
    const accountRef = ref(database, "accounts/");

    push (accountRef, {
      name: "Wu",
      type: "User",
      points: "10"
    })
  }

  const login = () => {
    signInWithPopup(auth, provider), then((result)=>{
      console.log(result);
      console.log(result.user.uid);
      console.log(result.user.displayName);

      const uid = result.user.uid;
      const name = result.user.displayName;

      const accountRef = ref(database, "/accounts/" + uid);
      

      if(accountRef)(

      )else{

      }
    }); //then:執行下一步
  }

  return (
    <>
      <div onClick={addNewAccount} className="inline-block text-white border-white border-2 px-4 py-1">Add new Account</div>
      <div onClick={login} className="inline-block text-white border-white border-2 px-4 py-1">Login woth Google</div>
    </>
  );
}
