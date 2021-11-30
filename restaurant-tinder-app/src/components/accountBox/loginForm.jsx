import React, { useContext, useRef } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

import axios from 'axios';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const username = useRef(null);
  const password = useRef(null);

  const handleClick = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //get all queries that match username and password
    let checkUser = function(username,pass){
        return axios.get("http://localhost:3001/find/UserInfo/" + username + 
        "/" + pass)
        .then(response => {return response.data})
    };

    let users = checkUser(username, password);
    users.then(function(result){
        console.log(result)

        if (result === undefined || result.length == 0){
            //invalid input
        }
        else
        {
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            document.cookie = username;
            window.location.href = "http://localhost:3000/filter";
        }
    });
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="username" placeholder="Username" id="username" ref={username}/>
        <Input type="password" placeholder="Password" id="password" ref={password}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/*<MutedLink href="#">Forget your password?</MutedLink>*/}
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleClick}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
