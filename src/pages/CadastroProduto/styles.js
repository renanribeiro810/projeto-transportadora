import styled from "styled-components";

export const Produto = styled.div`
  text-align: center;
  display: flex;
  width: 100%;
  min-height: calc(100%-64px);

  .espacoInput {
    display: flex;
    justify-content: space-between;
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

  .botao {
    padding-top: 20px;
    justify-content: space-between;
    display: flex;
    flex: 1;
  }

  .upload {
    height: 250px;
    width: 300px;
    border: 3px solid #191967;
  }
`;
