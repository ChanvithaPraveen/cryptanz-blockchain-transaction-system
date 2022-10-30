import React, { useContext } from 'react'; 
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { TransactionContext } from '../context/TransactionContext';
import { Loader } from './'; 
import { shortenAddress } from '../Utils/shortenAddress';

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gradient text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );

const Welcome = () => {
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;

        e.preventDefault();

        if(!addressTo || !amount || !keyword || !message) return;
        
        sendTransaction();
    }
    
    return (
        <div>
            <div className='flex w-full justify-center'>
                <div className = 'flex mf:flex-row flex-col items-start justify-between mf:p-5 py-50 px-10'>
                    <div className='flex flex-1 justify-start flex-col mf:mr-10'>;
                        <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                            Transfer Crypto <br /> Over the world
                        </h1>

                        <p className='text-left text-gradient mt-15 font-san-serif mf:w-9/12 w-11/12 text-base'>
                            Now Explore the Digital Currency World with Cryptanz Platform Easily
                        </p>
                        
                        {!currentAccount && ( //hide the connect button when already connect a wallet
                            <button
                            type="button"
                            onClick={connectWallet}
                            className='flex flex-row justify-center items-center my-2 bg-[#2952e3] hover:bg-[#2546bd] p-3 rounded-full cursor-pointer'
                            >
                                <p className='text-white text-base font-bold'>Connect Your Wallet</p>
                            </button>
                        )}

                        <div className='grid sm:grid-cols-3 grid-cols-2w-full mt-10'>
                            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                                Blockchain
                            </div>
                            <div className={companyCommonStyles}>Security</div>
                            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                                Reliability
                            </div>
                            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                                Web 3.0
                            </div>
                            <div className={companyCommonStyles}>Low Fees</div>
                            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                                Fast
                            </div>
                        </div>

                        <div className='flex flex-row flex-1 items-center justify-start w-full mf:mt-0 mt-10 mx-5'>
                            <div className='p-5 justify-end items-start flex-row rounded-xl h-40 sm:w-72 w-full my-10 eth-card white-glassmorphism'>
                                <div className='flex justify-between flex-col w-full h-full'>
                                    <div className='flex justify-between items-start'>
                                        <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                                            <SiEthereum fontSize={25} color='#fff'></SiEthereum>
                                        </div>
                                        <BsInfoCircle fontSize={18} color='#fff'/>
                                    </div>

                                    <div className='text-white font-light text-sm'>
                                        {shortenAddress(currentAccount)}
                                    </div>
                                    <div className='text-white font-semibold text-lg mt-1'>
                                        Ethereum 
                                    </div>
                                </div>
                            </div>

                            <div className='p-5 m-10 sm:w-96 w-full px-3 flex flex-col justify-start items-center blue-glassmorphism'>
                                <Input placeholder='Address To' name='addressTo' type='text' handleChange={handleChange} />
                                <Input placeholder='Amount (ETH)' name='amount' type='number' handleChange={handleChange} />
                                <Input placeholder='Keyword (Gif)' name='keyword' type='text' handleChange={handleChange} />
                                <Input placeholder='Enter Message' name='message' type='text' handleChange={handleChange} />
                                
                                <div className="h-[1px] w-full bg-gray-400 my-5 mx-14" />

                                {isLoading ? (
                                    <Loader />
                                    ) : (
                                        <button 
                                            type='button'
                                            onClick={handleSubmit}
                                            className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
                                        >
                                            Send Now
                                        </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;