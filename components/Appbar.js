import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Autorenew } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 1100,
    backgroundColor: 'white'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color: '#784ffe',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appBar: {
    backgroundColor: '#fffff'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#784ffe', 0.15),
    '&:hover': {
      backgroundColor: fade("#784ffe", 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    color: 'black',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: 'black',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ setAccount }) {
  const classes = useStyles();
  const [val, setVal] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setAccount(val);
    setVal("");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Crypto Portfolio
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSearch}>
              <InputBase
                placeholder="0x57Ac4E60a3fDaDec7e6b..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
