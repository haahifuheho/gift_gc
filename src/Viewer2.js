import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import abi from "./contracts/GiftNFT.json";
import "./Viewer2.css";
import greeting from "./images/greeting1.jpg"
import logo_mob from "./images/logo1.png"

function Viewer2() {
    const [ req ] = useState(new URLSearchParams(useLocation().search));
    const [ message, setMessage] = useState();
    const [ id ] = useState(req.get('id'));
    const [ web3 ] = useState(new Web3());

    web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
    useEffect(() => {
        (async() => {
            web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
            const contract = new web3.eth.Contract(abi, contractAddress);
            const nft = await contract.methods.tokenMessage(id).call();
            setMessage(nft);
        })()
    });
    return (
        <div >
            <div className = "greeting">
            <p>NFT greeting card has been presented!</p>
            <p1>Message for You</p1>
            <p2>{message}</p2>
            <img src={greeting}  alt="greeting card" />
            </div>
            <div className = "logo">
                <br />
                <br />
                <img src={logo_mob} width="200px" alt="logo" />
            </div>
        </div>
    );
};

export default Viewer2;

