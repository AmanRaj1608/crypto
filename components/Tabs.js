import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';

import Dashboard from './Dashboard';
import Loan from './Loan';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
    border: 0,
  },
  tabs: {
    border: 0,
    borderBottom: '1px solid #d7d7d7'
  }
}));

export default function ScrollableTabsButtonForce({ account }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Dashboard" icon={<DashboardIcon />} {...a11yProps(0)} />
          <Tab label="Loan" icon={<AccountBalanceRoundedIcon />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Dashboard account={account} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Loan />
      </TabPanel>
    </div>
  );
}
