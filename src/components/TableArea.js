import React from 'react';
import Paper from 'material-ui/Paper';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

const TableArea = ({ data }) =>
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell numeric>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(data).map(name => {
          return (
            <TableRow key={name}>
              <TableCell>
                {name}
              </TableCell>
              <TableCell numeric>
                {data[name]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>;

export default TableArea;
