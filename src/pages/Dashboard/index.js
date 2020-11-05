import React from "react";
import Grafico from "../../components/Graficos/graficos";
import Menu from "../../components/Menu";
import { Dash } from "./styles";

function Dashboard() {
  return (
    <>
      <Menu />
      <Dash>
        <Grafico />
      </Dash>
    </>
  );
}

export default Dashboard;
