import styled from "styled-components";

export const Transf = styled.div`
  display: flex;
  min-height: calc(100%-64px);
  flex: 1;

  .textoTransf {
    color: #191967;
    font-weight: bold;
    text-align: left;
  }

  .espacoInput {
    display: flex;
    padding: 10px 10px;
  }

  #empresa-saida {
    height: 10px;
  }

  #empresa-entrada {
    height: 10px;
  }

  #data {
    height: 10px;
  }

  #descricao {
    height: 10px;
  }

  #produto {
    height: 10px;
  }

  .espaco {
    margin-right: 20px;
    height: 10px;
  }

  .textoProduto {
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

  .adicionar {
    background-color: rgb(15, 152, 171);
    color: white;
    width: 40px;
    height: 40px;
    margin-left: 20px;

    :hover {
      background-color: rgb(15, 152, 171);
    }
  }

  .textoAdicional {
    padding-bottom: 20px;
  }

  .espacoDivider {
    padding-top: 15px;
  }
`;
