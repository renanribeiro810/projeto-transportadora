import React, { useState, useCallback, useEffect } from "react";
import firebase, { firestore } from "firebase/app";
import { useHistory, useParams } from "react-router-dom";
import "firebase/firestore";
import {
  TextField,
  Divider,
  Container,
  Typography,
  Fab,
  Grid,
  ListItemSecondaryAction,
  ListItem,
  List,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuNovo from "../../components/Menu";
import { Transf } from "./styles";
import Button from "../../components/Button";
import DeleteIcon from "@material-ui/icons/Delete";
// import { Container } from './styles';

function Transferencia() {
  const history = useHistory();
  const { transferencia } = useParams();

  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produtosSelec, setProdutosSelec] = useState([]);
  const [empresaEntrada, setEmpresaEntrada] = useState({
    razaoSocial: "",
    id: "",
  });
  const [empresaSaida, setEmpresaSaida] = useState({ razaoSocial: "", id: "" });
  const [dataEntrega, setDataEntrega] = useState(Date);
  const [descricao, setDescricao] = useState("");
  const [produto, setProduto] = useState({});
  const [qtdSelecionada, setQtdSelecionada] = useState(0);

  const getEmpresas = useCallback(async () => {
    try {
      const response = await firebase.firestore().collection("empresas").get();
      const temp = [];

      response.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      setListaEmpresas(temp);
    } catch (error) {
      console.log("error getEmpresas", error);
    }
  }, []);

  const getProdutos = useCallback(async (empresa) => {
    try {
      if (empresa === "" || !empresa) {
        const response = await firebase
          .firestore()
          .collection("produtos")
          .get();

        const temp = [];

        response.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        setListaProdutos(temp);
      } else {
        const response = await firebase
          .firestore()
          .collection("empresas")
          .doc(empresa)
          .collection("produtosVinculados")
          .get();

        const temp = [];

        response.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        setListaProdutos(temp);
      }
    } catch (error) {
      console.log("error getProdutos", error);
    }
  }, []);

  const upRelatorios = () => {
    const batch = firebase.firestore().batch();

    new Promise((resolve, reject) => {
      let check = produtosSelec.length;
      produtosSelec.forEach(async (produto) => {
        const id = produto.id.slice(0, produto.id.indexOf("_"));
        // debugger
        if (empresaEntrada.id !== "") {
          let docEntRef = firestore()
            .collection("empresas")
            .doc(empresaEntrada.id)
            .collection("produtosVinculados")
            .doc(id);
          await docEntRef.get().then(async function (doc) {
            // debugger
            if (doc.exists) {
              batch.update(docEntRef, {
                quantidade: firebase.firestore.FieldValue.increment(
                  produto.qtdSelecionada
                ),
              });
            } else {
              await firebase
                .firestore()
                .collection("empresas")
                .doc(empresaEntrada.id)
                .collection("produtosVinculados")
                .doc(id)
                .set({
                  categoria: produto.categoria,
                  descricao: produto.descricao,
                  nome: produto.nome,
                  quantidade: produto.qtdSelecionada,
                  valor: produto.valor,
                });
            }
          });
        }

        if (empresaSaida.id !== "") {
          let docSaiRef = firestore()
            .collection("empresas")
            .doc(empresaSaida.id)
            .collection("produtosVinculados")
            .doc(id);

          await docSaiRef.get().then(function (doc) {
            if (doc.exists) {
              batch.update(docSaiRef, {
                quantidade: firebase.firestore.FieldValue.increment(
                  -produto.qtdSelecionada
                ),
              });
            }
          });
        }
        check--;
        if (check === 0) {
          resolve();
        }
      });
    })
      .then(() => {
        batch
          .commit()
          .then(async function () {
            await firestore()
              .collection("relatorios")
              .add({
                empresaEntrada: `${empresaEntrada.id}_${empresaEntrada.razaoSocial}`,
                empresaSaida: `${empresaSaida.id}_${empresaSaida.razaoSocial}`,
                dataEntrega: firestore.Timestamp.fromDate(dataEntrega),
                dataRealizada: firestore.Timestamp.fromDate(new Date()),
                // new Date().toLocaleDateString('pt-BR')
                descricao: descricao,
                produtos: produtosSelec,
              })
              .then(() => {
                console.log("success relatorio");
              })
              .catch((error) => {
                console.log("error relatorio", error);
              });

            window.location.reload();
          })
          .catch((error) => {
            console.log("algo deu errado no batch", error);
          });
      })
      .catch((error) => console.log("error promise", error));
  };

  const addProduto = () => {
    let check = false;
    if (produtosSelec.length > 0) {
      produtosSelec.forEach((item) => {
        if (item.id === `${produto.id}_${produto.nome}`) {
          check = true;
        }
      });
    }

    if (!check) {
      setProdutosSelec([
        ...produtosSelec,
        {
          ...produto,
          id: `${produto.id}_${produto.nome}`,
          qtdSelecionada: qtdSelecionada,
        },
      ]);
    } else {
      setProdutosSelec(
        produtosSelec.filter((item) =>
          item.id === `${produto.id}_${produto.nome}`
            ? (item.qtdSelecionada = qtdSelecionada)
            : item
        )
      );
    }
  };

  useEffect(() => {
    getEmpresas();
    getProdutos();
  }, [getEmpresas, getProdutos]);

  return (
    <>
      <MenuNovo />
      <Transf>
        <Container fixed>
          <Typography className="textoTransf" variant="h5">
            Transferência
          </Typography>
          <Divider style={{ paddingTop: "5px" }} />

          <Grid className="espacoDivider" container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <div className="espacoInput">
                <Autocomplete
                  id="empresa-entrada"
                  options={listaEmpresas}
                  getOptionLabel={(option) => option.razaoSocial}
                  onChange={(value, text) =>
                    text
                      ? setEmpresaEntrada({
                          razaoSocial: text.razaoSocial,
                          id: text.id,
                        })
                      : setEmpresaEntrada({ razaoSocial: "", id: "" })
                  }
                  style={{ width: 600 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Empresa de entrada"
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div className="espacoInput">
                <Autocomplete
                  id="empresa-saida"
                  options={listaEmpresas}
                  onChange={(value, text) =>
                    text
                      ? (setEmpresaSaida({
                          razaoSocial: text.razaoSocial,
                          id: text.id,
                        }),
                        getProdutos(text.id))
                      : (setEmpresaSaida({ razaoSocial: "", id: "" }),
                        getProdutos(""))
                  }
                  getOptionLabel={(option) => option.razaoSocial}
                  style={{ width: 600 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Empresa de saída"
                      variant="outlined"
                    />
                  )}
                />
              </div>

              <div className="espacoInput">
                <TextField
                  className="espaco"
                  id="data"
                  type="date"
                  variant="outlined"
                  onChange={(date) => setDataEntrega(date.target.valueAsDate)}
                />
                <TextField
                  label="Descrição"
                  style={{ width: 390 }}
                  multiline
                  rowsMax={1}
                  variant="outlined"
                  onChange={(text) => setDescricao(text.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs></Grid>
          </Grid>

          <Typography className="textoProduto" variant="h5">
            Produtos
          </Typography>
          <Divider style={{ paddingTop: "5px" }} />

          <Grid className="espacoDivider" container spacing={3}>
            <Grid item xs></Grid>

            <Grid item xs={6}>
              <div className="espacoInput">
                <Autocomplete
                  className="espaco"
                  id="produto"
                  options={listaProdutos}
                  onChange={(value, text) =>
                    text ? setProduto(text) : setProduto("")
                  }
                  getOptionLabel={(option) => option.nome}
                  style={{ width: 420 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Produto" variant="outlined" />
                  )}
                />
                <TextField
                  type="number"
                  inputProps={{
                    max: produto.quantidade ? produto.quantidade : "",
                    min: 0,
                  }}
                  style={{ width: 75 }}
                  defaultValue={0}
                  onChange={(number) =>
                    setQtdSelecionada(number.target.valueAsNumber)
                  }
                />
                <div>
                  {produto.quantidade ? (
                    <Typography variant="caption">
                      Max: {produto.quantidade > 0 ? produto.quantidade : "N/A"}
                    </Typography>
                  ) : null}
                </div>

                <Fab className="adicionar" onClick={addProduto}>
                  <AddIcon />
                </Fab>
              </div>
              <div>
                {produtosSelec.map((produto) => (
                  <div className="textoAdicional" key={produto.id}>
                    <List>
                      <ListItemSecondaryAction>
                        <ListItem>
                          <p>
                            Nome:{" "}
                            {produto.id.slice(produto.id.indexOf("_") + 1)}
                          </p>
                          <ListItem>
                            <p>Quantidade: {produto.qtdSelecionada}</p>
                            <ListItem>
                              <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </ListItem>
                          </ListItem>
                        </ListItem>
                      </ListItemSecondaryAction>
                    </List>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs></Grid>
          </Grid>

          <div className="botao">
            <div></div>
            <div>
              <Button>Cancelar</Button>
              <Button onClick={() => upRelatorios()}>Finalizar</Button>
            </div>
          </div>
        </Container>
      </Transf>
    </>
  );
}

export default Transferencia;
