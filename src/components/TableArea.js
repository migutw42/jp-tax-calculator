import React from 'react';
import Paper from 'material-ui/Paper';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import numeral from 'numeral';

import TaxCalculator from '../libs/TaxCalculator';

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
                {TaxCalculator.translate(name)}
              </TableCell>
              <TableCell numeric>
                {'￥' + numeral(data[name]).format('0,0')}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>;

export default TableArea;
