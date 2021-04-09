import firebase from "firebase/app";

import { auth } from "../App";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignIn = () => {
  const signWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Wrapper>
      <Button onClick={signWithGoogle}>log me in chat</Button>
    </Wrapper>
  );
};

export { SignIn };
