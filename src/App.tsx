import React, { useState } from "react";

import "./App.css";

import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyB5XavIrpzPOk4ZJlJj7nZit1RfijFBFP8",
    authDomain: "react-chat-f74ba.firebaseapp.com",
    projectId: "react-chat-f74ba",
    storageBucket: "react-chat-f74ba.appspot.com",
    messagingSenderId: "537544202873",
    appId: "1:537544202873:web:453f6f3a4b169be36f92a8",
    measurementId: "G-C4REG3K8ME",
  });
} else {
  firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

const SignIn = () => {
  const signWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signWithGoogle}>log me in</button>;
};

//@ts-ignore
const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;
  console.log({ message });

  const messageClass = uid === auth.currentUser?.uid ? "sent" : "recieved";

  return (
    <div className={`message ${messageClass}`}>
      <img alt="нахуй" src={photoURL} />
      <p>{text}</p>
    </div>
  );
};

const ChatRoom = () => {
  const messagesSrc = firestore.collection("messages");
  const query = messagesSrc.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [inputValue, setInputValue] = useState<string>("");

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    const { uid, photoURL } = auth.currentUser;

    await messagesSrc.add({
      text: inputValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setInputValue("");
  };

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => {
            return <ChatMessage key={msg.id} message={msg} />;
          })}
      </div>
      <form onSubmit={sendMessage}>
        <input onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">погнали</button>
      </form>
    </>
  );
};

// const SignOut = () => {
//   return (
//     auth.currentUser && (
//       <button onClick={() => auth.signOut()}>log me out</button>
//     )
//   );
// };

function App() {
  const [user] = useAuthState(auth);

  console.log({ user });

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}
