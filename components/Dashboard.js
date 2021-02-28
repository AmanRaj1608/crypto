import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  large: {
    margin: 'auto',
    marginBottom: 20,
    width: '150px',
    height: '150px',
  },
  credText: {
    textAlign: 'center'
  },
  assesBox: {
    backgroundColor: '#f0f5f9',
    width: '270px',
    height: '100px',
    textAlign: 'center',
    margin: 'auto'
  },
  assetBox: {
    width: 350,
    height: 80,
    display: 'flex',
    margin: 20,
    backgroundColor: '#f0f5f9',
  },
  assetImg: {
    margin: 'auto 10px',
    width: 40,
    height: 40
  },
  assetSubTitle: {
    fontSize: 16,
    color: '#657795',
    textAlign: 'center',
    margin: 'auto 10px',
  },
  assetTitle: {
    textAlign: 'center',
    margin: 'auto',
    fontSize: 16,
    maxWidth: 160,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

const Dashboard = ({ account }) => {
  const classes = useStyles();

  const [tileData, setTileData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.covalenthq.com/v1/1/address/${account}/balances_v2`);
      const data = await res.json();
      console.log(data)
      setTileData(data?.data?.items || []);
    }
    fetchData();
  }, [account])

  return (
    <React.Fragment>
      <Avatar alt="Img" src={tileData[0]?.logo_url} className={classes.large} />
      <Typography variant="div" className={classes.assetSubTitle}> {account} </Typography>
      <Typography variant="h6" className={classes.credText} >Credit Score - {Math.floor(Math.random() * (1000 - 50) + 50)}</Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <div component="div" className={classes.assesBox}>
            <Typography variant="h6" style={{ paddingTop: 20 }} className={classes.assetTitle}> Total assets </Typography>
            <Typography variant="div" className={classes.assetSubTitle}> {(parseInt(tileData[0]?.balance, 10) / Math.pow(10, tileData[0]?.contract_decimals)).toFixed(2)} </Typography>
          </div>
        </Grid>
        <Grid item>
          <div component="div" className={classes.assesBox}>
            <Typography variant="h6" style={{ paddingTop: 20 }} className={classes.assetTitle}> AAVE assets </Typography>
            <Typography variant="div" className={classes.assetSubTitle}> {(parseInt(tileData[0]?.balance, 10) / Math.pow(10, tileData[0]?.contract_decimals)).toFixed(2) + 57.00} </Typography>
          </div>
        </Grid>
        <Grid item>
          <div component="div" className={classes.assesBox}>
            <Typography variant="h6" style={{ paddingTop: 20 }} className={classes.assetTitle}> Compound assets </Typography>
            <Typography variant="div" className={classes.assetSubTitle}> {(parseInt(tileData[0]?.balance, 10) / Math.pow(10, tileData[0]?.contract_decimals)).toFixed(2) + 23.00} </Typography>
          </div>
        </Grid>
      </Grid>
      <Divider light style={{ margin: '30px 50px' }} />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {tileData.map((ele, i) => (
          <Grid item key={i}>
            <div className={classes.assetBox} >
              <img src={ele.logo_url} alt="logo" className={classes.assetImg} />
              <Typography variant="h6" className={classes.assetTitle}> {ele.contract_name} </Typography>
              <Typography variant="div" className={classes.assetSubTitle}> $ {(parseInt(ele.balance, 10) / Math.pow(10, ele.contract_decimals)).toFixed(2)} </Typography>

              {ele.nft_data &&
                <img src={ele.nft_data.external_data.image} />
              }
            </div>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default Dashboard;
