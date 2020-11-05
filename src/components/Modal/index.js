import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@material-ui/core";
import { StyledTableCell } from "./styles";
import Botao from "../../components/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function ModalRelatorios(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Botao style={{ fontSize: 12 }} onClick={handleOpen}>
        Produtos +
      </Botao>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">
                      Nome do Produto
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Quantidade Movimentada
                    </StyledTableCell>
                    <StyledTableCell align="left">Valor (R$)</StyledTableCell>
                    <StyledTableCell align="left">Descrição</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.rows.produtos.map((prod) => (
                    <TableRow key={prod.id}>
                      <TableCell>{prod.nome}</TableCell>
                      <TableCell style={{ width: 350 }}>
                        {prod.qtdSelecionada}
                      </TableCell>
                      <TableCell>{prod.valor}</TableCell>
                      <TableCell>{prod.descricao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}

export default ModalRelatorios;
