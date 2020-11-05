import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;

  .form {
    border-radius: 20px;
  }

  .paper {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    display: flex;
    width: 185px;
    height: 185px;
  }

  .espaco {
    padding: 20px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo {
    width: 200px;
  }

  .bloco {
    background-color: #e6e6e6;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #email {
    height: 10px;
    width: 230px;
  }

  #password {
    height: 10px;
    width: 230px;
  }
`;
