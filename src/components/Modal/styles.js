import styled from "styled-components";
import { Button } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export const Botao = styled(Button)`
  && {
    margin: 25px 0px 25px 0px;
    background-color: rgb(15, 152, 171);
    color: white;

    :hover {
      background-color: rgb(15, 152, 171);
    }
  }
`;

export const Botao2 = styled(Button)`
  && {
    margin: 0px 0px 0px 0px;
    background-color: rgb(15, 152, 171);
    color: white;
    width: 80px;
    height: 40px;

    :hover {
      background-color: rgb(15, 152, 171);
    }
  }
`;

export const Empresa = styled.div`
  text-align: center;
  display: flex;
  width: 100%;

  .textoRegistro {
    color: #191967;
    font-weight: bold;
    text-align: left;
    margin: 20px 0px 10px 0px;
  }
`;

export const StyledTableCell = styled(TableCell)`
  && {
    background-color: rgb(15, 152, 171);
    color: white;
  }
`;

export const Root = styled.div`
  && {
    flex-shrink: 0;
    margin-left: 3px;
  }
`;
