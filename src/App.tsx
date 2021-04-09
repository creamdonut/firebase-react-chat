import React from "react";

import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { Chat } from "./Chat";
import { SignIn } from "./SignIn";
import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";
import styled from "styled-components";

dayjs.extend(LocalizedFormat);

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  });
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const Wrapper = styled.div`
  text-align: center;
`;

export const App = () => {
  const [user] = useAuthState(auth);

  console.log({ user });

  return (
    <Wrapper>
      <section>{user ? <Chat /> : <SignIn />}</section>
    </Wrapper>
  );
};
