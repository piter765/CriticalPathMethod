// import CpmGraph from "./Graph";
// import {Button} from "semantic-ui-react";
import { Grid, GridRow, Button } from "semantic-ui-react";
import CpmForm from "./components/CpmForm";
import DataTable from "./components/DataTable";
import { useState } from "react";

function App() {
  const [table, setTable] = useState([]);

  const addRowToTable = (rowData) => {
    setTable([...table, rowData]);
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
          <Button type="submit" inverted color="red" padded>
            Wygeneruj graf
          </Button>
          {/* tu bedzie graf */}
        </GridRow>
      </Grid>
    </>
  );
}

export default App;
