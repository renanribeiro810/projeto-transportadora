import styled from "styled-components";

export const Empresa = styled.div`
  text-align: center;
  display: flex;
  width: 100%;

  .espacoInput {
    display: flex;
    justify-content: space-between;
  }

  #campoMenor {
    height: 10px;
    flex: 1;
  }

  .form {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
  }

  #campoMaior {
    height: 10px;
    flex: 1;
  }

  .textoRegistro {
    color: #191967;
    font-weight: bold;
    text-align: left;
  }

  .textoContato {
    color: #191967;
    font-weight: bold;
    text-align: left;
    padding-top: 30px;
  }

  .botao {
    padding-top: 20px;
    justify-content: space-between;
    display: flex;
    flex: 1;
  }
`;
