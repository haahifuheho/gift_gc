import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import abi from "./contracts/GiftNFT.json";
import "./Viewer.css";

function Viewer() {
    const [ req, setReq ] = useState(new URLSearchParams(useLocation().search));
    const [ message, setMessage] = useState();
    const [ id, setId ] = useState(req.get('id'));
    const [ web3, setWeb3 ] = useState(new Web3());

    web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new web3.eth.Contract(abi, contractAddress);
    const nft = contract.methods.tokenMessage(id).call();

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
	<div className="contents">
            <div className="card">
                <div className="card-header">
                    <h1>To You GIFT</h1>
                </div>
                <div className="card-body">
                    <p>{message}</p>
                </div>
            </div>
	</div>
    );
};

export default Viewer;

