import React, { useState, useRef } from "react";
import { useAuth } from "../../hooks/auth";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Form/input";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { Avatar, InputAdornment, Container } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import logo from "../../assets/logo.png";
import { Wrap } from "./styles";

function Login() {
  const history = useHistory();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  async function handleSubmit(data) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    setLoading(true);

    try {
      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push("/dashboard");
    } catch (error) {
      console.log("error handleSubmit", error);
      console.log("usuario ou senha não confere");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Wrap>
        <Container className="bloco" component="main" maxWidth="xs">
          <Form className="form" onSubmit={handleSubmit} ref={formRef}>
            <div className="espaco">
              <div className="paper">
                <Avatar className="avatar">
                  <img className="logo" src={logo} alt="personagem login" />
                </Avatar>

                <Input
                  required
                  id="email"
                  label="Endereço de e-mail"
                  name="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <Input
                  required
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button type="submit" variant="contained" color="primary">
                  {loading ? "Carregando..." : "Entrar"}
                </Button>
              </div>
            </div>
          </Form>
        </Container>
      </Wrap>
    </>
  );
}

export default Login;
