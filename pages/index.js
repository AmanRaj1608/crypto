import React, { useEffect, useState } from 'react';

import Web3 from 'web3';
import Portis from '@portis/web3';

import { makeStyles } from '@material-ui/core/styles';
import Appbar from '../components/Appbar';
import Tabs from '../components/Tabs';


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
    height: '100px'
  }
}));


export default function Index() {
  const classes = useStyles();

  const [account, setAccount] = useState('0x2947F98C42597966a0ec25e92843c09ac17Fbaa7');
  const [contract, setContract] = useState();

  React.useEffect(() => {
    const connectWeb3 = async () => {
      // setLoading(true);
      const portis = new Portis('b9fa6e02-40e7-431c-9769-d051c1ca2622', 'maticMumbai');
      // const web3 = new Web3(Web3.givenProvider);
      const web3 = new Web3(portis.provider);
      await web3.eth.net.getNetworkType();
      const accounts = await web3.eth.getAccounts();
      // const contractObj = new web3.eth.Contract(abi, addr);
      // setContract(contractObj);
      if (accounts) {
        // setAccount(accounts[0]);
        console.log(accounts);
        // setLoading(false);
      } else {
        window.alert("No web3? You should consider trying MetaMask!")
      }
    }
    connectWeb3();
  }, [])

  const callContractFunc = async () => {
    await contract.methods.fetchCourseAddress().call({ from: account, gasLimit: 3000000 },
      (err, res) => {
        console.log(`Course ${res}`);
        t = res;
      });
  }
  // console.log(account)
  return (
    <React.Fragment>
      <Appbar setAccount={setAccount} />
      <main style={{ maxWidth: 1100, margin: 'auto', background: '#FFFFFF', textAlign: 'center' }}>
        <Tabs account={account} />
      </main>
    </React.Fragment>
  );
}
