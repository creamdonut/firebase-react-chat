import { Avatar } from "@material-ui/core";
import dayjs from "dayjs";
import React, { FC } from "react";
import styled, { css } from "styled-components";
import { isPropertySignature } from "typescript";
import { auth } from "../App";

import * as Typed from "./ChatMessage.typed";

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 5px 20px;
  border-radius: 15px;
  cursor: default;
  background: #f1f1f1;
  transition: all 0.12s;
  position: relative;
  min-width: 200px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  ${(props) =>
    props.typeof === "sent"
      ? css`
          background: palevioletred;
          color: white;
          margin-left: auto;
        `
      : css`
          margin-right: auto;
        `}
  &::after {
    content: "${(props) => props.about}";
    position: absolute;
    bottom: -15px;
    left: 10px;
    font-size: 11px;
    font-style: italic;
    color: #f1f1f1;
  }
`;

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const NameDisplay = styled.div`
  font-size: 13px;
  align-self: flex-start;
`;

const TimeStamp = styled.div`
  align-self: flex-start;
`;

const ChatMessage: FC<Typed.Props> = ({ message }) => {
  const { text, uid, photoURL, createdAt, displayName } = message;

  const date = dayjs.unix(createdAt).format("lll");

  const messageClass = uid === auth.currentUser?.uid ? "sent" : "recieved";

  return (
    <Container about={date} typeof={messageClass}>
      <Avatar alt={displayName} src={photoURL} />
      <InnerCard>
        <NameDisplay>{displayName}</NameDisplay>
        <TimeStamp>{text}</TimeStamp>
      </InnerCard>
    </Container>
  );
};

export { ChatMessage };
