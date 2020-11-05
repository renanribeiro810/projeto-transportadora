import React, { useState, useCallback, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Divider,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  Grid,
} from "@material-ui/core";
import Menu from "../../components/Menu";
import "firebase/firestore";
import firebase from "firebase/app";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { StyledTableCell, Empresa, Root } from "./styles";
import PropTypes from "prop-types";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Modal from "../../components/Modal";
import Botao from "../../components/Button";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Root>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Root>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Relatorio() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empresas, setEmpresas] = useState([]);
  const [produtosVinculados, setProdutosVinculados] = useState([]);
  const [dataInicial, setDataInicial] = useState(Date);
  const [dataFinal, setDataFinal] = useState(Date);
  const [empresaSelec, setEmpresaSelec] = useState("");
  const [produtoSelec, setProdutoSelec] = useState("");
  const [relatFiltrado, setRelatFiltrado] = useState([]);
  const [apagar, setApagar] = useState(true);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, relatFiltrado.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const pegarEmpresas = useCallback(async () => {
    try {
      const resposta = await firebase.firestore().collection("empresas").get();
      const resp = [];

      resposta.forEach((doc) => {
        resp.push({ id: doc.id, ...doc.data() });
      });
      setEmpresas(resp);
    } catch (error) {
      console.log("error ao selecionar Empresas", error);
    }
  }, []);

  const pegarProdutos = useCallback(async (empresa) => {
    if (empresa === "") {
      setProdutosVinculados([]);
    } else {
      try {
        const resposta = await firebase
          .firestore()
          .collection("empresas")
          .doc(empresa.id)
          .collection("produtosVinculados")
          .get();

        const resp = [];

        resposta.forEach((doc) => {
          resp.push({ id: doc.id, ...doc.data() });
        });
        setEmpresaSelec(`${empresa.id}_${empresa.razaoSocial}`);
        setProdutosVinculados(resp);
      } catch (error) {
        console.log("error ao recuperar produtos", error);
      }
    }
  }, []);

  useEffect(() => {
    pegarEmpresas();
  }, [pegarEmpresas]);

  const filtrarProdutos = async () => {
    let diaInicial = new Date(dataInicial);
    diaInicial.setDate(diaInicial.getDate() + 1);
    diaInicial.setHours(23);
    diaInicial.setMinutes(59);
    diaInicial.setSeconds(59);

    let diaFinal = new Date(dataFinal);
    diaFinal.setDate(diaFinal.getDate() + 1);
    diaFinal.setHours(23);
    diaFinal.setMinutes(59);
    diaFinal.setSeconds(59);

    try {
      const response = await firebase
        .firestore()
        .collection("relatorios")
        .where("empresaEntrada", "==", `${empresaSelec}`)
        .orderBy("dataRealizada")
        .startAt(diaInicial)
        .endAt(diaFinal)
        .get();

      const resp = [];
      response.forEach((doc) => {
        let check = false;
        const data = doc.data();

        if (produtoSelec !== "") {
          data.produtos.filter((produto) =>
            produto.id === produtoSelec ? (check = true) : ""
          );
        } else {
          check = true;
        }

        if (check) {
          resp.push({ id: doc.id, ...data });
        }
      });

      setRelatFiltrado(resp);
    } catch (error) {
      console.log("erro no filtro", error);
    }
  };

  return (
    <>
      <Menu />
      <Empresa>
        <Container>
          <Typography className="textoRegistro" variant="h5">
            Filtro
          </Typography>
          <Divider style={{ paddingTop: "5px", marginBottom: "25px" }} />
          <Grid container spacing={3}>
            <Grid container item xs={6}>
              <Autocomplete
                id="empresa"
                options={empresas}
                getOptionLabel={(option) => option.razaoSocial}
                onChange={(event, option) =>
                  option ? pegarProdutos(option) : pegarProdutos("")
                }
                style={{ width: 580 }}
                renderInput={(params) => (
                  <TextField
                    id="empresa"
                    name="empresa"
                    {...params}
                    label="Selecione a empresa"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid container item xs={4} />

            <Grid container item xs={2}>
              <TextField
                name="inicial"
                label="Data Inicial"
                type="date"
                onChange={(date) => setDataInicial(date.target.valueAsDate)}
                fullWidth={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid container item xs={6}>
              <Autocomplete
                id="produto-vinculado"
                options={produtosVinculados}
                getOptionLabel={(option) => option.nome}
                onChange={(event, option) =>
                  option
                    ? setProdutoSelec(`${option.id}_${option.nome}`)
                    : setProdutoSelec("")
                }
                style={{ width: 580 }}
                renderInput={(params) => (
                  <TextField
                    name="produto"
                    {...params}
                    label="Selecione o produto"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid container item xs={4} />

            <Grid container item xs={2}>
              <TextField
                name="final"
                label="Data Final"
                type="date"
                onChange={(date) => setDataFinal(date.target.valueAsDate)}
                fullWidth={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid container item xs />

            <Grid container item xs={2} justify="flex-end">
              <Botao
                style={{ marginTop: 25, marginBotton: 25 }}
                onClick={() => filtrarProdutos()}
              >
                FILTRAR
              </Botao>
            </Grid>
          </Grid>
          <Typography className="textoRegistro" variant="h5">
            Resultado
          </Typography>
          <Divider style={{ paddingTop: "5px", marginBottom: "25px" }} />

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Empresas</StyledTableCell>
                  <StyledTableCell align="left">
                    Quantidade de produtos
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Descrição do Movimento
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Data da Transferencia
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Data de Entrega
                  </StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              {relatFiltrado.length < 1 ? (
                <TableBody></TableBody>
              ) : (
                <TableBody>
                  {(rowsPerPage > 0
                    ? relatFiltrado.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : relatFiltrado
                  ).map((rows) => (
                    <TableRow key={rows.id}>
                      <TableCell component="th" scope="row">
                        {rows.empresaEntrada.slice(
                          rows.empresaEntrada.indexOf("_") + 1
                        )}
                      </TableCell>
                      <TableCell style={{ width: 150 }} align="left">
                        {rows.produtos.length}
                      </TableCell>
                      <TableCell style={{ width: 300 }} align="left">
                        {rows.descricao}
                      </TableCell>
                      <TableCell style={{ width: 200 }} align="left">
                        {new Date(
                          rows.dataRealizada.seconds * 1000
                        ).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell style={{ width: 150 }} align="left">
                        {new Date(
                          rows.dataEntrega.seconds * 1000
                        ).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell style={{ width: 82 }} align="right">
                        <div>
                          <Modal rows={rows} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              )}

              <TableFooter>
                <TableRow>
                  <TablePagination
                    labelRowsPerPage={"Linhas por página"}
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={relatFiltrado.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Container>
      </Empresa>
    </>
  );
}
