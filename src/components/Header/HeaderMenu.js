import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PUBLIC_SERVICE, API_SURVER } from "../../config";
import { GithubOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginState,
  changeBucketPage,
  filterByUser,
} from "../../store/actions/exporterActions";

require("dotenv").config();

const HeaderMenu = () => {
  const isLogin = useSelector((store) => store.loginReducer);
  const isAdmin = useSelector((store) => store.adminReducer);
  const dispatch = useDispatch();

  const clientID = "e0766f48a0ed436d36d4";
  const url = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=http://localhost:3000/callback&scope=user,repo,delete_repo,admin:org`;

  // console.log('어드민이니? >>', )

  // console.log(API_SURVER);
  const {
    push,
    location: { pathname },
  } = useHistory();
  // console.log(PUBLIC_SERVICE);

  const handleSignOut = () => {
    dispatch(getLoginState(false));
    dispatch(filterByUser(""));
    sessionStorage.removeItem("access_token");
    push("/");
  };

  const handleBucketPage = (e) => {
    const page = e.target.innerHTML;
    if (page === "ADMIN") {
      dispatch(changeBucketPage(1));
      push("/mybucket");
    } else if (page === "MY BUCKET") {
      dispatch(changeBucketPage(0));
      push("/mybucket");
    }
  };

  return (
    <Div>
      {isLogin ? (
        <>
          {isAdmin && (
            <Button onClick={(e) => handleBucketPage(e)}>ADMIN</Button>
          )}
          <Button onClick={(e) => handleBucketPage(e)}>MY BUCKET</Button>
          <Button onClick={() => handleSignOut()}>SIGN OUT</Button>
        </>
      ) : (
        <Button>
          <a href={url}>SIGN IN</a>
        </Button>
      )}
      <GitHubLink
        href="https://github.com/NexClipper/exporterhub.io"
        target="_blank"
      >
        <GithubOutlined />
      </GitHubLink>

      {PUBLIC_SERVICE === "n" && (
        <span
          onClick={() => {
            push("/admin");
            window.location.reload();
          }}
        >
          Admin
        </span>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
  img {
    width: 38px;
    cursor: pointer;
  }
  span {
    margin-left: 30px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  color: #73c7aa;
  font-weight: 600;
  font-size: 14px;
  margin-left: 30px;

  a {
    color: inherit;
  }
`;

const GitHubLink = styled.a`
  font-size: 35px;
  color: #cccccc;
`;

export default HeaderMenu;
