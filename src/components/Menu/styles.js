import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;

  .link {
    display: block;
    color: white;
    font-size: 13px;
    text-align: center;
    padding: 8px 8px;
    text-decoration: none;
    font-family: arial;
  }

  .linkRecolher {
    color: black;
    font-size: 13px;
    text-align: center;
    text-decoration: none;
    font-family: arial;
  }

  .botaoRecolher {
    text-transform: capitalize;
    color: black;
    font-size: 13px;
    font-family: arial;
    margin-left: -17px;
  }

  .header {
    background-color: rgb(15, 152, 171);
  }

  .logo {
    width: 65px;
  }

  .avatar {
    display: flex;
    margin: 1px;
    width: 40px;
    height: 40px;
  }

  .botao {
    text-transform: capitalize;
    display: block;
    color: white;
    font-size: 13px;
    font-family: arial;
    margin-bottom: 6px;
    margin-left: -10px;
    width: 50px;
  }

  .grow {
    flex-grow: 1;
  }
`;

export const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
