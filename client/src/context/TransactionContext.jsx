import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../Utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window; //can see ethereum objects via console in browser
                             //we can access the blockchain via this window function

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount')); //store in localhost because otherwise it is reset when we reload the browser
    const [transactions, setTransactions] = useState([]);

    //this is a function that recieve data from form in advance react experiences
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    
    const getAllTransactions = async () => {
        try {
          if (!ethereum) return alert("Please Install MetaMask");
            const transactionsContract = getEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
            
            console.log(availableTransactions);
        } catch (error) {
          console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert('Please Install Metamask Extension');

            const accounts = await ethereum.request({ method: 'eth_accounts'});

            if(accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            }else {
                console.log('No Accounts Found');
            }
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum Object');
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
            const transactionCount = await transactionsContract.getTransactionCount();//changed
    
            window.localStorage.setItem("transactionCount", transactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please Install Metamask Extension');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum Object');
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please Install Metamask Extension');

            //get data from frontent form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI in hexadecimal
                    value: parsedAmount._hex, //0.00001
                }]
            });

            //this function might take long time to do the transaction
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);

            throw new Error('No Ethereum Object');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionContext.Provider value = {{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, isLoading }}>
            {children}
        </TransactionContext.Provider>
    );
}