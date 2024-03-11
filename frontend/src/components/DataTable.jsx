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
            <TableHeaderCell>Nazwa czynności</TableHeaderCell>
            <TableHeaderCell>Czas trwania</TableHeaderCell>
            <TableHeaderCell>OD - DO</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {table.map((row, index) => (
            <TableRow key={index+1}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.duration}</TableCell>
              <TableCell>{row.from + "-" + row.to}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
