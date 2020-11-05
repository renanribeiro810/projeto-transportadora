import React, { useState, useCallback, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Grid, Container } from "@material-ui/core";
import { GrafStyle } from "./styles";
import firebase from "firebase/app";
import "firebase/firestore";

function Graficos() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [grafData, setGrafData] = useState([]);

  const getEmpresas = useCallback(async () => {
    try {
      const response = await firebase.firestore().collection("empresas").get();

      const finalArray = [["Empresa", "QtdProduto"]];
      const temp = [];
      response.forEach(async (doc) => {
        let countP = 0;
        const responseP = await firebase
          .firestore()
          .collection("empresas")
          .doc(doc.id)
          .collection("produtosVinculados")
          .get();
        responseP.forEach((prod) => (countP = countP + prod.data().quantidade));
        temp.push({
          id: doc.id,
          ...doc.data(),
          produtosVinculados: responseP.size || 0,
        });
        finalArray.push([doc.data().razaoSocial, countP || 0]);
      });
      setPieData(finalArray);
      getRelatoriosFull(temp);
    } catch (error) {
      console.log("error getEmpresas", error);
    }
  }, []);

  const getRelatoriosFull = async (lista) => {
    const relatRef = firebase.firestore().collection("relatorios");
    try {
      const responseFull = await relatRef.get();

      const finalArray = [["Empresa", "Em estoque", "Movimentado"]];
      lista.map((empresa) => {
        let temp = [];
        let count = 0;
        responseFull.forEach((doc) => {
          const data = doc.data();
          if (
            data.empresaEntrada === `${empresa.id}_${empresa.razaoSocial}` ||
            data.empresaSaida === `${empresa.id}_${empresa.razaoSocial}`
          ) {
            count++;
            temp = [empresa.razaoSocial, empresa.produtosVinculados, count];
          }
        });
        if (count === 0) {
          temp = [empresa.razaoSocial, empresa.produtosVinculados, count];
        }
        finalArray.push(temp);
      });
      setBarData(finalArray);
      getRelatoriosFilter();
    } catch (error) {
      console.log("error getRelatorios", error);
    }
  };

  const getRelatoriosFilter = async () => {
    let dia = new Date();
    dia.setDate(dia.getDate() - 30);
    dia.setHours(0);
    dia.setMinutes(0);
    dia.setSeconds(0);
    const response = await firebase
      .firestore()
      .collection("relatorios")
      .where("dataRealizada", ">=", dia)
      .orderBy("dataRealizada", "asc")
      .get();
    const finalArray = [["Dia", "Movimentação"]];
    let temp = [];
    let count = 0;
    let check = "";
    response.forEach((doc) => {
      const data = doc.data();
      const newData = new Date(data.dataRealizada.seconds * 1000);
      data.dataRealizada = `${newData.getDate()}/${
        newData.getMonth() + 1
      }/${newData.getFullYear()}`;
      if (temp.length === 0) {
        check = data.dataRealizada;
        count++;
        temp = [data.dataRealizada, count];
      } else if (data.dataRealizada === check) {
        count++;
        temp = [data.dataRealizada, count];
      } else {
        finalArray.push(temp);
        count = 1;
        check = data.dataRealizada;
        temp = [data.dataRealizada, count];
      }
    });

    finalArray.push(temp);
    setGrafData(finalArray);
  };

  useEffect(() => {
    getEmpresas();
  }, [getEmpresas]);

  return (
    <GrafStyle>
      <Container fixed>
        <div className="root">
          <Grid container spacing={1}>
            <Grid item xs>
              <Chart
                className="graficoColuna"
                width={550}
                height={340}
                chartType="BarChart"
                data={barData}
                options={{
                  title: "Gráfico de Movimentação",
                  chartArea: { width: "40%" },
                  colors: ["#0f98ab", "#9c0707"], // cor das barras
                  hAxis: {
                    title: "Movimentações",
                    minValue: 0,
                  },
                  vAxis: {
                    title: "Empresas",
                  },
                }}
              />
            </Grid>

            <Grid item xs>
              <Chart
                className="graficoPizza"
                width={550}
                height={340}
                chartType="PieChart"
                data={pieData}
                options={{
                  title: "Estoque Por Empresa",
                  pieHole: 0.4, // espaçamento central
                  colors: [
                    "#0f98ab",
                    "#a2c4c9",
                    "#76a5af",
                    "#45818e",
                    "#134f5c",
                    "#0c343d",
                  ], // Cores das fatias
                  pieSliceTextStyle: {
                    color: "white", // Cor do texto que vai dentro do Gráfico
                  },
                  // pieSliceText: 'percentage', // Tipo de exibição do dado no gráfico (% ou nome)
                  pieSliceBorderColor: "rgb(12,52,61)", //Cor de contorno do gráfico
                  //legend: 'labeled', //Define onde fica a Legenda do gráfico (labeled, none e direcionada)
                }}
                rootProps={{ "data-testid": "7" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <Chart
                className="graficoLinha"
                width={1170} //1170, 550 para deixar padrão
                height={340} //340
                chartType="LineChart"
                data={grafData}
                options={{
                  colors: ["#0f98ab"], // cor da linha
                  hAxis: {
                    title: "Movimento dos últimos 30 dias",
                    chartArea: { width: "100%" }, //40
                  },
                  //pointSize: 2, // Gera pontos visíveis em cada dia no gráfico, valor do tamanho
                  lineSize: 2, // Espessura da linha
                  vAxis: {
                    title: "Movimentação",
                  },
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </div>
      </Container>
    </GrafStyle>
  );
}

export default Graficos;
