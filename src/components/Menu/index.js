import React from "react";
import { useAuth } from "../../hooks/auth";
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { Nav } from "./styles";
import logo from "../../assets/logo_menu.png";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import MoreIcon from "@material-ui/icons/MoreVert";

export default function MenuNovo() {
  const classes = useStyles();
  const { signOut } = useAuth();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Nav>
        <MenuItem>
          <Link className="linkRecolher" to="/dashboard">
            Dashboard
          </Link>
        </MenuItem>

        <MenuItem>
          <Link className="linkRecolher" to="/cadastro/produto">
            Cadastro de produto
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="linkRecolher" to="/cadastro/empresa">
            Cadastro de Empresas
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="linkRecolher" to="/relatorio">
            Relatórios
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="linkRecolher" to="/transferencia">
            Transferências
          </Link>
        </MenuItem>
        <MenuItem>
          <Button className="botaoRecolher" onClick={signOut}>
            sair
          </Button>
        </MenuItem>
      </Nav>
    </Menu>
  );

  return (
    <Nav>
      <div className="grow">
        <AppBar className="header" position="static">
          <Toolbar>
            <Avatar className="avatar">
              <img className="logo" src={logo} alt="logo" />
            </Avatar>
            <div className="grow" />
            <div className={classes.sectionDesktop}>
              <Link className="link" to="http://localhost:3000/"></Link>
              <Link className="link" to="/dashboard">
                Dashboard
              </Link>
              <Link className="link" to="/cadastro/produto">
                Cadastro de produto
              </Link>
              <Link className="link" to="/cadastro/empresa">
                Cadastro de Empresas
              </Link>
              <Link className="link" to="/relatorio">
                Relatórios
              </Link>
              <Link className="link" to="/transferencia">
                Transferências
              </Link>
              <div className="espacoBotao">
                <div></div>
                <Button className="botao" onClick={signOut}>
                  sair
                </Button>
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    </Nav>
  );
}