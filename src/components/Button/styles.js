import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Botao = styled(Button)`
  && {
    margin: 3px 0px 2px 0px;
    background-color: rgb(15, 152, 171);
    color: white;
    margin-right: 10px;
    margin-left: 10px;
    width: 120px;

    :hover {
      background-color: rgb(15, 152, 171);
    }
  }
`;
