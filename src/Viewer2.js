import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import abi from "./contracts/GiftNFT.json";
import "./Viewer2.css";

function Viewer2() {
    const [ req, setReq ] = useState(new URLSearchParams(useLocation().search));
    const [ message, setMessage] = useState();
    const [ id, setId ] = useState(req.get('id'));
    const [ web3, setWeb3 ] = useState(new Web3());

    web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
    const contractAddress = "0x447aFeCebe733c617Ab3a98149D10520cCc2188F";
    const contract = new web3.eth.Contract(abi, contractAddress);
    const nft = contract.methods.tokenMessage(id).call();

    useEffect(() => {
        (async() => {
            web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
            const contractAddress = "0x447aFeCebe733c617Ab3a98149D10520cCc2188F";
            const contract = new web3.eth.Contract(abi, contractAddress);
            const nft = await contract.methods.tokenMessage(id).call();
            setMessage(nft);
        })()
    });
    return (
        <div className="card2">
            <div className="card2-header">
                <h1>Messasge For You</h1>
            </div>
            <div className="card2-body">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Viewer2;

