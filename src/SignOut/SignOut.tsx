import { Button } from "@material-ui/core";
import React from "react";
import { auth } from "../App";

export const SignOut = () => {
  return (
    auth.currentUser && (
      <Button variant="contained" onClick={() => auth.signOut()}>
        log me out
      </Button>
    )
  );
};
