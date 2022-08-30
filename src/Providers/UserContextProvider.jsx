import React from "react";
import { useReducer } from "react";
import userReducer, { userInitial } from "../reducrs/UserReducers";
import UserContext from "../Contexts/UserContext";

const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, userInitial);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
