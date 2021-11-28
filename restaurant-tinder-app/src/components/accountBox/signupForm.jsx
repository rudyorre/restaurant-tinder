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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const handleClick = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (password != passwordConfirm) {
      return;
    }

    //get all queries that match username
    let checkUser = function(username){
        return axios.get("http://localhost:3001/find/User/" + username)
        .then(response => {return response.data})
    };

    let users = checkUser(username);
    users.then(function(result){
        //output for debugging
        //no user exists so add to DB
        if (result === undefined || result.length == 0){
            const userinfo = { username: username, password: password };
            axios
            .post("http://localhost:3001/record/User", userinfo)
            .then((res) => console.log(res.data));

            document.cookie = username;
            window.location.href = "http://localhost:3000/filter";
        }
        else{
            //user already exists
        }

    })
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="username" placeholder="Username" id="username"/>
        <Input type="password" placeholder="Password" id="password"/>
        <Input type="password" placeholder="Confirm Password" id="passwordConfirm"/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleClick}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
