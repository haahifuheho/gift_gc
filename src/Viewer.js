import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import abi from "./contracts/GiftNFT.json";

function Viewer() {
    const [ req, setReq ] = useState(new URLSearchParams(useLocation().search));
    const [ message, setMessage] = useState();
    const [ id, setId ] = useState(req.get('id'));
    const [ web3, setWeb3 ] = useState(new Web3());

    web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
    const contractAddress = "0x4AAbbb31f44941eFAd14f019Efe876916b57a293";
    const contract = new web3.eth.Contract(abi, contractAddress);
    const nft = contract.methods.tokenMessage(id).call();

    useEffect(() => {
        (async() => {
            web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
            const contractAddress = "0x4AAbbb31f44941eFAd14f019Efe876916b57a293";
            const contract = new web3.eth.Contract(abi, contractAddress);
            const nft = await contract.methods.tokenMessage(id).call();
            setMessage(nft);
        })()
    });
    return (
        <>{message}</>
    );
};

export default Viewer;
