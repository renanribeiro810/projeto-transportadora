import React from "react";
import { Typography } from "@material-ui/core";
import { Fot } from "./styles";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function Footer() {
  return (
    <Fot>
      <div className="root">
        <footer className="footer">
          <Typography className="texto">
            © 2020 Bimer 2 | Todos os direitos reservados
          </Typography>
          <a
            className="icone"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Biimok/Alterdata-Projeto"
            title="GitHub do projeto"
            alt="Link GitHub do projeto"
          >
            <GitHubIcon color="primary" title="GitHub do projeto!" />
          </a>
        </footer>
      </div>
    </Fot>
  );
}
