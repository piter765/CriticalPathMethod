/* eslint-disable react/prop-types */
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

export default function DataTable({ table }) {
  return (
    <>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Lp.</TableHeaderCell>
            <TableHeaderCell>Nazwa zdarzenia</TableHeaderCell>
            <TableHeaderCell>Czas trwania zdarzenia</TableHeaderCell>
            <TableHeaderCell>Następstwa</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {table.map((row, index) => (
            <TableRow key={index+1}>
              <TableCell>{index}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.from}</TableCell>
              <TableCell>{row.to}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
