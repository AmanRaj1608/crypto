import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  divCont: {
    backgroundColor: '#cfe8fc',
    height: '100px',
    marginTop: 20
  }
}));

const Loan = ({ contract }) => {
  const classes = useStyles();

  const [val, setVal] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLoan = async (e) => {
    e.preventDefault();
    // setAccount(val);
    setLoading(true);
    await contract.methods.lendIntoPools("0x57Ac4E60a3fDaDec7e6b51b28488B392447801F4", 10).call({ from: account, gasLimit: 3000000 },
      (err, res) => {
        console.log(`Course ${res}`);
      });
    setLoading(false);
    setVal("");
  }

  return (
    <div>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>Borrow</Button>
        <Button>Lend</Button>
      </ButtonGroup>

      <Container maxWidth="sm">
        <div component="div" className={classes.divCont} >
          <form onSubmit={handleLoan} className={classes.root} noValidate autoComplete="off">
            <TextField
              id="filled-basic"
              label="Wallet"
              variant="filled"
              value={val}
              onChange={(e) => setVal(e.target.value)} />
          </form>
        </div>

        {
          loading && <CircularProgress />
        }
      </Container>
    </div>
  );
}

export default Loan;
