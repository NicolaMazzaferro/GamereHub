import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableContainer } from '@mui/material';
import { format } from 'date-fns';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down('sm')}`]: {
    fontSize: '10px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ game }) {
  const formattedDate = format(new Date(game.released), 'dd-MM-yyyy');

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>{`Release Date: ${formattedDate}`}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{`Genres: ${game.genres.map(genre => genre.name).join(', ')}`}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
          <StyledTableCell>{`Platform: ${game.parent_platforms.map(platform => platform.platform.name).join(', ')}`}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
