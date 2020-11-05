import React, { useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Menu from "../../components/Menu";
import { Form } from "@unform/web";
import Input from "../../components/Form/input";
import * as Yup from "yup";
import Button from "../../components/Button";
import { Empresa } from "./styles";
import { Divider, Typography, Container } from "@material-ui/core";

function CadastroEmpresa() {
  const formRef = useRef(null);

  const setEmpresa = async (data, { reset }) => {
    try {
      const schema = Yup.object().shape({
        razaoSocial: Yup.string().lowercase().required(),
        cnpj: Yup.string().min(18).max(18).required(),
        ramo: Yup.string().lowercase().required(),
        nomeFantasia: Yup.string().lowercase().required(),
        inscricaoEstadual: Yup.string().lowercase().required(),
        cep: Yup.string().min(9).max(9).required(),
        rua: Yup.string().lowercase().required(),
        numero: Yup.number().required(),
        bairro: Yup.string().lowercase().required(),
        cidade: Yup.string().lowercase().required(),
        estado: Yup.string().lowercase().required(),
        telefone: Yup.string().min(14).max(14).lowercase().required(),
        email: Yup.string().email().lowercase().required(),
        caixaPostal: Yup.string().lowercase().notRequired(),
        website: Yup.string().url().lowercase().notRequired(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      await firebase
        .firestore()
        .collection("empresas")
        .add({
          razaoSocial: data.razaoSocial,
          cnpj: data.cnpj,
          ramoAtividade: data.ramo,
          nomeFantasia: data.nomeFantasia,
          inscricaoEstadual: data.inscricaoEstadual,
          endereco: {
            cep: data.cep,
            rua: data.rua,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
          },
          contato: {
            telefone: data.telefone,
            email: data.email,
            caixaPostal: data.caixaPostal,
            website: data.website,
          },
        });

      reset();
    } catch (err) {
      console.log("error setEmpresa", err);
    }
  };

  return (
    <>
      <Menu />
      <Empresa>
        <Container fixed>
          <Typography className="textoRegistro" variant="h5">
            Registro
          </Typography>
          <Divider style={{ paddingTop: "5px" }} />
          <Form className="form" ref={formRef} onSubmit={setEmpresa}>
            <div className="espacoInput">
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                name="razaoSocial"
                label="Razão Social"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                name="nomeFantasia"
                label="Nome Fantasia"
              />
            </div>
            <div className="espacoInput">
              <Input
                id="campoMaior"
                fullWidth={true}
                mask="99.999.999/9999-99"
                type="text"
                name="cnpj"
                label="Cnpj"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                mask="999.999.999.999"
                name="inscricaoEstadual"
                label="Inscrição Estadual"
              />
            </div>
            <div className="espacoInput">
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                name="ramo"
                label="Ramo de Atividade"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMaior"
                fullWidth={true}
                mask="99999-999"
                type="text"
                name="cep"
                label="CEP"
              />
            </div>
            <div className="espacoInput">
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                name="rua"
                label="Rua"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMaior"
                fullWidth={true}
                type="number"
                name="numero"
                label="Numero"
              />
            </div>
            <div className="espacoInput">
              <Input
                id="campoMenor"
                fullWidth={true}
                type="text"
                name="bairro"
                label="Bairro"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMenor"
                fullWidth={true}
                type="text"
                name="cidade"
                label="Cidade"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMenor"
                fullWidth={true}
                type="text"
                name="estado"
                label="Estado"
              />
            </div>

            <div>
              <Typography className="textoContato" variant="h5">
                Contato
              </Typography>
              <Divider style={{ paddingTop: "5px" }} />
            </div>

            <div className="espacoInput">
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                mask="(99)99999-9999"
                name="telefone"
                label="Telefone"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                name="caixaPostal"
                label="Caixa Postal"
              />
            </div>
            <div className="espacoInput">
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                name="email"
                label="E-mail"
                style={{ marginRight: "20px" }}
              />
              <Input
                id="campoMaior"
                fullWidth={true}
                type="text"
                name="website"
                label="Website"
              />
            </div>
            <div className="botao">
              <div></div>
              <div>
                <Button>Cancelar</Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </div>
          </Form>
        </Container>
      </Empresa>
    </>
  );
}

export default CadastroEmpresa;
