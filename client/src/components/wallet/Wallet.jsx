import { useState,useEffect } from "react";
import { connectWallet } from "../../utils/ConnectWallet";
import Web3Context from "../../context/Web3Context";
import Button from "../button/Button";
import { handleAccountChange } from "../../utils/HandleAccountChange";
import { handleChainChange } from "../../utils/HandleChainChange";
import { toast } from "react-hot-toast";
import "./Wallet.css";

const Wallet =({children})=>{
 const [state,setState]=useState({
    provider:null,
    account:null,
    stakingContract:null,
    stakeTokenContract:null,
    chianId:null
 })
 const [isLoading,setIsLoading]=useState(false);
 
 useEffect(()=>{
   window.ethereum.on('accountsChanged',()=>handleAccountChange(setState))
   window.ethereum.on('chainChanged',()=>handleChainChange(setState)) 
   
   return()=>{
    window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setState))
    window.ethereum.removeListener('chainChanged',()=>handleChainChange(setState)) 
   }
},[])
 const handleWallet = async()=>{
    try{
        setIsLoading(true);
        const { provider,selectedAccount,stakingContract,stakeTokenContract,chainId} = await connectWallet();
        setState({provider,selectedAccount,stakingContract,stakeTokenContract,chainId})

    }catch(error){
       toast.error("Error connecting wallet")
       console.error(error.message)
    }finally{
        setIsLoading(false)
    }
 }
 return (
   <div className="Connect-Wallet">
     <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
     {isLoading && <p>Loading...</p>}
     <Button onClick={handleWallet} type="button" label="Connect Wallet" />
   </div>
 )
}
export default Wallet;