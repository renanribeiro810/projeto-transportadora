import React, { useRef, useState } from "react";
import firebase, { storage } from "firebase/app";
import "firebase/firestore";
import Menu from "../../components/Menu";
import { Form } from "@unform/web";
import Input from "../../components/Form/input";
import * as Yup from "yup";
import Button from "../../components/Button";
import { Produto } from "./styles";
import { Divider, Typography, Container, Grid } from "@material-ui/core";

function CadastroProduto() {
  const formRef = useRef(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const setProduto = async (data, { reset }) => {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().lowercase().required(),
        valor: Yup.number().positive().min(0.01).required(),
        categoria: Yup.string().lowercase().required(),
        descricao: Yup.string().lowercase().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await storage().ref().child(`images/${data.nome}`).put(image);

      await firebase.firestore().collection("produtos").add({
        nome: data.nome,
        valor: data.valor,
        categoria: data.categoria,
        descricao: data.descricao,
      });

      reset();
      setUrl("");
    } catch (error) {
      console.log("error setProduto", error);
    }
  };

  const handleUpload = async (image) => {
    if (image) {
      setImage(image);
      setUrl(URL.createObjectURL(image));
    }
  };

  return (
    <>
      <Menu />
      <Produto>
        <Container fixed>
          <Typography className="textoRegistro" variant="h5">
            Registro
          </Typography>
          <Divider style={{ paddingTop: "5px" }} />
          <Form className="form" onSubmit={setProduto} ref={formRef}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className="espacoInput">
                  <Input
                    fullWidth={true}
                    id="campoMaior"
                    type="text"
                    name="nome"
                    label="Nome do Produto"
                  />
                </div>

                <div className="espacoInput">
                  <Input
                    fullWidth={true}
                    id="campoMaior"
                    type="number"
                    inputProps={{
                      step: "0.1",
                    }}
                    name="valor"
                    label="Valor"
                  />
                </div>

                <div className="espacoInput">
                  <Input
                    fullWidth={true}
                    id="campoMaior"
                    type="text"
                    name="categoria"
                    label="Categoria"
                  />
                </div>

                <div className="espacoInput">
                  <Input
                    fullWidth={true}
                    id="campoDescricao"
                    type="text"
                    name="descricao"
                    label="Descrição"
                    multiline
                    rows={4}
                  />
                </div>
              </Grid>
              <Grid className="foto" item xs={12} sm={6}>
                <div style={{ paddingTop: "10px" }}>
                  <img
                    className="upload"
                    src={url || "https://via.placeholder.com/300x250"}
                    alt="Uploaded imagens"
                  />
                </div>
                <Button type="button">
                  <label
                    style={{ cursor: "pointer" }}
                    htmlFor="file"
                    accept="image/*"
                  >
                    Upload
                  </label>
                </Button>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => handleUpload(e.target.files[0])}
                />
              </Grid>
              <div className="botao">
                <div></div>
                <div>
                  <Button>Cancelar</Button>
                  <Button type="submit">Cadastrar</Button>
                </div>
              </div>
            </Grid>
          </Form>
        </Container>
      </Produto>
    </>
  );
}

export default CadastroProduto;
