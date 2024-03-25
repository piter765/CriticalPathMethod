
// import CpmGraph from "./Graph";
// import {Button} from "semantic-ui-react";
import { Grid, GridRow, Button } from "semantic-ui-react";
import CpmForm from "./components/CpmForm";
import DataTable from "./components/DataTable";
import { useEffect, useState } from "react";
import MyDiagramComponent from "./components/MyDiagramComponent";

let tableTest = [
  {lp: 1, name: "A", duration: 3, from: 1, to: 2 },
  {lp: 2, name: "B", duration: 4, from: 2, to: 3 },
  {lp: 3, name: "C", duration: 6, from: 2, to: 4 },
  {lp: 4, name: "D", duration: 7, from: 3, to: 5 },
  {lp: 5, name: "E", duration: 1, from: 5, to: 7 },
  {lp: 6, name: "F", duration: 2, from: 4, to: 7 },
  {lp: 7, name: "G", duration: 3, from: 4, to: 6 },
  {lp: 8, name: "H", duration: 4, from: 6, to: 7 },
  {lp: 9, name: "I", duration: 1, from: 7, to: 8 },
  {lp: 10, name: "J", duration: 2, from: 8, to: 9 },
];

let nodeDataArrayTest = [
  { key: 1, text: "1", length: 3, earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 2, text: "2", length: 4, earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 3, text: "3", length: 6,earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 4, text: "4", length: 7, earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 5, text: "5", length: 1,earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 6, text: "6", length: 2, earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 7, text: "7", length: 3, earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 8, text: "8", length: 4, earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] },
  { key: 9, text: "9", length: 1,earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] }
];
let linkDataArrayTest = [
  { from: 1, to: 2, length: 3, name: "A" },
  { from: 2, to: 3, length: 4, name: "B"  },
  { from: 2, to: 4, length: 6, name: "C"  },
  { from: 3, to: 5, length: 7, name: "D"  },
  { from: 5, to: 7, length: 1, name: "E"  }, 
  { from: 4, to: 7, length: 2, name: "F"  },
  { from: 4, to: 6, length: 3, name: "G"  },
  { from: 6, to: 7, length: 4, name: "H"  },
  { from: 7, to: 8, length: 1, name: "I"  },
  { from: 8, to: 9, length: 2, name: "J"  }
];

function App() {
  const [table, setTable] = useState(tableTest);
  const [nodeDataArray, setNodeDataArray] = useState([
    // {
    //   key: 0,
    //   text: "0",
    //   length: 0,
    //   earlyStart: 0,
    //   lateFinish: 0,
    //   critical: true,
    //   successors: [],
    //   predecessors: [],
    // },
    ...nodeDataArrayTest
  ]);
  const [linkDataArray, setLinkDataArray] = useState([...linkDataArrayTest]);

  useEffect(() => {
    setSuccessorsAndPredecessors();
    calculateEarlyStart();
  }, [nodeDataArray, linkDataArray]);

  const addRowToTable = (rowData) => {
    setTable([...table, rowData]);

    setNodeDataArray((prevNodeDataArray) => [
      ...prevNodeDataArray,
      {
        key: prevNodeDataArray.length + 1,
        text: prevNodeDataArray.length + 1,
        length: parseInt(rowData.duration),
        earlyStart: 0,
        lateFinish: 0,
        critical: false,
        successors: [],
        predecessors: [],
      },
    ]);
  
    setLinkDataArray((prevLinkDataArray) => [
      ...prevLinkDataArray,
      {
        from: parseInt(rowData.from),
        to: parseInt(rowData.to),
        length: parseInt(rowData.duration),
      },
    ]);
  };

  const clearTable = () => {
    setTable([]);
    setNodeDataArray([{ key: 1, text: "1", earlyStart: 0, lateFinish: 0, critical: false, successors: [], predecessors: [] }]);
    setLinkDataArray([]);
  };

  const setSuccessorsAndPredecessors = () => {
    linkDataArray.forEach((link) => {
      const fromNode = nodeDataArray.find((node) => node.key == link.from);
      const toNode = nodeDataArray.find((node) => node.key == link.to);
      if (fromNode && toNode) {
        if (!fromNode?.successors.includes(toNode.key)) {
          fromNode.successors.push(toNode.key);
          toNode.predecessors.push(fromNode.key);
        }
      }
    });
    setNodeDataArray(nodeDataArray);
  };

  const calculateEarlyStart = () => {
    if (nodeDataArray?.length > 0) {
      nodeDataArray[0].earlyStart = 0; 
      nodeDataArray[0].lateFinish = 0;
    }

    for (let node of nodeDataArray) {
      if (node.key == 1) continue;
      if (node.predecessors.length == 1) {
        const link = linkDataArray.find(link => link.from == node.predecessors[0] && link.to == node.key);
        node.earlyStart = parseInt(nodeDataArray[link.from-1].earlyStart) + parseInt(link.length);
      } else if (node.predecessors.length > 1) {
        let links = linkDataArray.filter((link) => {
          return link.to == node.key;
        })
        let max = 0;
        links.forEach((link) => {
          if (nodeDataArray[link.from-1].earlyStart + link.length > max) { //from - 1, bo index tabeli będzie mniejszy o 1 od key 
            max = nodeDataArray[link.from-1].earlyStart + link.length;
          }
        });
        node.earlyStart = max;
      }
    }
    setNodeDataArray(nodeDataArray);
  };

  return (
    <>
      <Grid columns={2} divided textAlign="center" padded="vertically">
        <GridRow>
          <Grid.Column width={5}>
            <CpmForm addRowToTable={addRowToTable} />
          </Grid.Column>
          <Grid.Column width={10}>
            <DataTable table={table} />
          </Grid.Column>
        </GridRow>
        <GridRow>
          <Button type="submit" inverted color="red" padded="true">
            Wygeneruj graf
          </Button>
          <Button type="submit" inverted color="red" padded="true" onClick={clearTable}>
            Usuń tabelę
          </Button>
        </GridRow>
      </Grid>
      <MyDiagramComponent
        nodeDataArray={nodeDataArray} //nodeDataArray}
        linkDataArray={linkDataArray} //linkDataArray}
      />
    </>
  );
}

export default App;
