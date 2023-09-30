"use client";

import { graphqlClient } from "@/lib/client";
import { graphql } from "../../../gql";
import styles from ".//Header.module.scss";
import { useEffect, useState } from "react";

// const input: UserInput = { name: "name", password: "pass" };

export default function Header() {
  const [accessToken, setAccessToken] = useState('');
  const [userName, setUserName] = useState('');

  const CreateUser = graphql(/* GraphQl*/ `
    mutation CreateUser($user: UserInput) {
      CreateUser(user: $user) {
        message
        accessToken
        refreshToken
      }
    }
  `);

  const UserInformation = graphql(/* GraphQl*/ `
  query UserInformation {
    UserInformation {
      name
    }
  }
`);


useEffect(() => {
  if (!localStorage.getItem('accessToken')) return
    setAccessToken(localStorage.getItem("accessToken")!)
    
    graphqlClient.request(
      UserInformation,
      {},
      {accessToken:localStorage.getItem('accessToken')!}).then(data=>{
        setUserName(data.UserInformation?.name!)
      })
    
}, []);

  const login = async () => {
    const response = await graphqlClient.request(CreateUser, {
      user: { name: "name", password: "password" },
    },{accessToken:"tokne"}).catch(e=>{

    });
  
    if (!response?.CreateUser?.accessToken && !response?.CreateUser?.refreshToken)
      return;
    localStorage.setItem("accessToken", response.CreateUser?.accessToken);
    localStorage.setItem("refreshToken", response.CreateUser?.refreshToken);
    setAccessToken(localStorage.getItem("accessToken")!);

    const responseUser = await graphqlClient.request(
      UserInformation,
      {},
      {accessToken:response.CreateUser?.accessToken})
    console.log(responseUser);
    
    setUserName(responseUser.UserInformation?.name!)
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken("");
  };

  // const login = ()=>{
  //   localStorage.setItem('access-token', )
  // }

  return (
    <div className={styles.Header}>
      <div className={styles.header_menu}>
        <div className={styles.left_part}></div>

        <div className={styles.central_part}>
          <input type="text" />
        </div>

        <div className={styles.right_part}>
          {accessToken ? (
            <>
             <div>{userName}</div>
             <div onClick={() => logOut()}> Выйти</div>
            </>
          ) : (
            <div onClick={() => login()}>Войти</div>
          )}
        </div>
      </div>
    </div>
  );
}
