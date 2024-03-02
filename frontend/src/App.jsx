// import CpmGraph from "./Graph";
// import {Button} from "semantic-ui-react";
import { Grid, GridRow } from "semantic-ui-react";
import CpmForm from "./ui/CpmForm";
import DataTable from "./ui/DataTable";

function App() {
  return (
    <>
      <Grid columns={2} divided textAlign="center">
        <GridRow>
          <Grid.Column width={5}>
            <CpmForm />
          </Grid.Column>
          <Grid.Column width={10}>
            <DataTable />
          </Grid.Column>
        </GridRow>
      </Grid>
    </>
  );
}

export default App;
