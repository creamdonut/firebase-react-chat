import React, { useEffect, useRef, useState } from "react";

import styles from "./Chat.module.css";

import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { ChatMessage } from "../ChatMessage";
import { auth, firestore } from "../App";
import { SignOut } from "../SignOut";

import styled from "styled-components";
import { Button, Input } from "@material-ui/core";
import { EmptyMessages } from "../EmptyMessages";

const Messages = styled.div`
  background-color: black;
  height: 500px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SignOutContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 30px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  padding: 50px 0;
  margin: 0 auto;
`;

const Chat = () => {
  const messagesSrc = firestore.collection("messages");
  const query = messagesSrc.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [inputValue, setInputValue] = useState<string>("");

  const messageEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messageEl.current) return;

    messageEl.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      if (!target) return;
      //@ts-ignore
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const onSendMessage = async (e: any) => {
    e.preventDefault();
    if (inputValue === "") return;

    if (!auth.currentUser) return;
    console.log(auth.currentUser);

    const { uid, photoURL, displayName } = auth.currentUser;

    await messagesSrc.add({
      text: inputValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });

    setInputValue("");
  };

  return (
    <>
      <SignOutContainer>
        <SignOut />
      </SignOutContainer>
      <Messages ref={messageEl}>
        <MessagesContainer>
          {messages &&
            (messages.length > 0 ? (
              messages.map((msg) => {
                return <ChatMessage key={msg.id} message={msg} />;
              })
            ) : (
              <EmptyMessages />
            ))}
        </MessagesContainer>
      </Messages>
      <form onSubmit={onSendMessage}>
        <Input
          placeholder="Aa"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button type="submit">send</Button>
      </form>
    </>
  );
};

export { Chat };
