// import CpmGraph from "./Graph";
// import {Button} from "semantic-ui-react";
import { Grid, GridRow, Button } from "semantic-ui-react";
import CpmForm from "./components/CpmForm";
import DataTable from "./components/DataTable";
import { useState } from "react";
import MyDiagramComponent from "./components/MyDiagramComponent";

let tableTest = [
  { lp: 1, name: "A", duration: 3, from: 1, to: 2 },
  { lp: 2, name: "B", duration: 4, from: 2, to: 3 },
  { lp: 3, name: "C", duration: 6, from: 2, to: 4 },
  { lp: 4, name: "D", duration: 7, from: 3, to: 5 },
  { lp: 5, name: "E", duration: 1, from: 5, to: 7 },
  { lp: 6, name: "F", duration: 2, from: 4, to: 7 },
  { lp: 7, name: "G", duration: 3, from: 4, to: 6 },
  { lp: 8, name: "H", duration: 4, from: 6, to: 7 },
  { lp: 9, name: "I", duration: 1, from: 7, to: 8 },
  { lp: 10, name: "J", duration: 2, from: 8, to: 9 },
];

let nodeDataArrayTest = [
  {
    key: 1,
    text: "1",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 2,
    text: "2",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 3,
    text: "3",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 4,
    text: "4",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 5,
    text: "5",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 6,
    text: "6",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 7,
    text: "7",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 8,
    text: "8",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
  {
    key: 9,
    text: "9",
    reserve: 0,
    earlyStart: 0,
    earlyFinish: 0,
    critical: false,
    successors: [],
    predecessors: [],
  },
];
let linkDataArrayTest = [
  { from: 1, to: 2, length: 3, name: "A", critical: false },
  { from: 2, to: 3, length: 4, name: "B", critical: false },
  { from: 2, to: 4, length: 6, name: "C", critical: false },
  { from: 3, to: 5, length: 7, name: "D", critical: false },
  { from: 5, to: 7, length: 1, name: "E", critical: false },
  { from: 4, to: 7, length: 2, name: "F", critical: false },
  { from: 4, to: 6, length: 3, name: "G", critical: false },
  { from: 6, to: 7, length: 4, name: "H", critical: false },
  { from: 7, to: 8, length: 1, name: "I", critical: false },
  { from: 8, to: 9, length: 2, name: "J", critical: false },
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
    ...nodeDataArrayTest,
  ]);
  const [linkDataArray, setLinkDataArray] = useState([...linkDataArrayTest]);
  const [showDiagram, setShowDiagram] = useState(false);

  const addRowToTable = (rowData) => {
    setTable([...table, rowData]);

    // if (nodeDataArray.find(node => node.key == rowData.from) && nodeDataArray.find(node => node.key == rowData.to)) {
    //   return;
    // }

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
        name: rowData.name,
        from: parseInt(rowData.from),
        to: parseInt(rowData.to),
        length: parseInt(rowData.duration),
      },
    ]);
    setShowDiagram(false);
  };

  const clearTable = () => {
    setTable([]);
    setNodeDataArray([
      {
        key: 1,
        text: "1",
        earlyStart: 0,
        lateFinish: 0,
        critical: false,
        successors: [],
        predecessors: [],
      },
    ]);
    setLinkDataArray([]);
    setShowDiagram(false); // Hide the diagram
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
        const link = linkDataArray.find(
          (link) => link.from == node.predecessors[0] && link.to == node.key
        );
        //if (!link) continue;
        node.earlyStart =
          parseInt(nodeDataArray[link.from - 1].earlyStart) +
          parseInt(link.length);
      } else if (node.predecessors.length > 1) {
        let links = linkDataArray.filter((link) => {
          return link.to == node.key;
        });
        //if (!links) continue;
        let max = 0;
        links.forEach((link) => {
          if (nodeDataArray[link.from - 1].earlyStart + link.length > max) {
            //from - 1, bo index tabeli będzie mniejszy o 1 od key
            max = nodeDataArray[link.from - 1].earlyStart + link.length;
          }
        });
        node.earlyStart = max;
      }
    }
    setNodeDataArray(nodeDataArray);
  };

  const calculateEarlyFinish = () => {
    for (let i = nodeDataArray.length - 1; i >= 0; i--) {
      if (nodeDataArray[i].successors.length == 0) {
        // For  nodeDataArray[i]s with no successors, set earlyFinish to the same value as earlyStart
        nodeDataArray[i].earlyFinish = nodeDataArray[i].earlyStart;
      } else {
        // For  nodeDataArray[i]s with successors, calculate the earlyFinish
        let min = Number.MAX_SAFE_INTEGER;
        for (let successorKey of nodeDataArray[i].successors) {
          const link = linkDataArray.find(
            (link) =>
              link.from === nodeDataArray[i].key && link.to === successorKey
          );
          if (!link) continue;

          // Calculate earlyFinish based on the successor's earlyFinish and link duration
          const successor = nodeDataArray.find(
            (node) => node.key === successorKey
          );
          const earlyFinishSuccessor = successor.earlyFinish;
          const earlyFinish = earlyFinishSuccessor - link.length;

          if (earlyFinish < min) {
            min = earlyFinish;
          }
        }
        nodeDataArray[i].earlyFinish = min;
      }
      calculateReserve(nodeDataArray[i]);
    }

    setNodeDataArray([...nodeDataArray]);
  };

  const calculateReserve = (node) => {
    node.reserve = node.earlyFinish - node.earlyStart;
  };

  let paths = [];
  let path = [];
  const findPaths = (node) => {
    if (node.reserve == 0) {
      path.push(node.key);

      for (const key of node.successors) {
        const successor = nodeDataArray.find((n) => n.key == key); // dont know if this is ok because is the last array element with the biggest key?
        findPaths(successor);

        let index = path.indexOf(node.key);
        if (index !== -1) {
          path = path.slice(0, index + 1); // include the found element
          if (key == nodeDataArray[nodeDataArray.length - 1].key) {
            paths.push([...path, key]);
          }
        } else {
          console.log("Element not found in the array.");
        }
      }
    }
  };

  const calculateCriticalPath = () => {
    if (paths.length == 0) return;
    let longestPath = paths[0].length;

    for (let i = 1; i < paths.length; i++) {
      if (paths[i].length > longestPath) {
        longestPath = paths[i].length;
      }
    }

    //throw away paths that are shorter and the only ones left are potential critical paths
    paths = paths.filter((path) => path.length === longestPath);
    console.log(paths, 'sciezki')
    let highestSum = 0,
      indexOfHighestSum = 0;
    if (paths.length !== 1) {
      for (let j = 0; j < paths.length - 1; j++) {
        let sum = 0;
        for (let i = 0; i < path.length - 2; i++) {
          const link = linkDataArray.find(
            (link) => link.from == path[i] && link.to == path[i + 1]
          );
          sum += link.length;
        }
        if (sum > highestSum) {
          highestSum = sum;
          indexOfHighestSum = j;
        }
      }
    }
    for (let j = 0; j < paths[indexOfHighestSum].length - 1; j++) {
      const p = paths[indexOfHighestSum];
      for (let i = 0; i < linkDataArray.length; i++) {
        if (linkDataArray[i].from == p[j] && linkDataArray[i].to == p[j + 1]) {
          linkDataArray[i].critical = true;
          break;
        }
      }
    }
    console.log(linkDataArray)
    setLinkDataArray([...linkDataArray]);
  };

  const handleGenerateDiagram = () => {
    setSuccessorsAndPredecessors();
    calculateEarlyStart();
    calculateEarlyFinish();
    findPaths(nodeDataArray[0]);
    console.log(paths);
    calculateCriticalPath();
    setShowDiagram(true); // Set state to show diagram
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
          <Button
            type="submit"
            inverted
            color="red"
            padded="true"
            onClick={handleGenerateDiagram}
          >
            Wygeneruj graf
          </Button>
          <Button
            type="submit"
            inverted
            color="red"
            padded="true"
            onClick={() => {
              clearTable();
            }}
          >
            Usuń tabelę
          </Button>
        </GridRow>
      </Grid>
      {showDiagram && (
        <MyDiagramComponent
          nodeDataArray={nodeDataArray}
          linkDataArray={linkDataArray}
        />
      )}
    </>
  );
}

export default App;
