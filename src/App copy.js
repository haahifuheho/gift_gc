import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import GiftNFT from "./contracts/GiftNFT.json";

function App() {
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("");
    const [tokenId, setTokenId] = useState("");

    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    const accounts = await web3.eth.getAccounts();
                    setWeb3(web3);
                    setAccounts(accounts);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error("Please install MetaMask!");
            }
        };
        initWeb3();
    }, []);

    useEffect(() => {
        const initContract = async () => {
            const contractAddress = "0xaed8166414dc429365e56e3b873c1d651879d154"; // コントラクトアドレスを入力
            const contract = new web3.eth.Contract(GiftNFT.abi, contractAddress);
            setContract(contract);
        };
        if (web3) {
            initContract();
        }
    }, [web3]);

    const giftNFT = async () => {
        try {
            const tx = await contract.methods.giftNFT(recipient, message).send({ from: accounts[0] });
            const event = tx.events[0];
            const newTokenId = event.args[2].toNumber();
            setTokenId(newTokenId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Gift NFT</h1>
            <label>
                Message:
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
            </label>
            <br />
            <label>
                Recipient:
                <input type="text" onChange={(e) => setRecipient(e.target.value)} />
            </label>
            <br />
            <button onClick={giftNFT}>Gift</button>
            {tokenId && (
                <div>
                    <p>Gifted NFT with Token ID: {tokenId}</p>
                    <p>Message: {message}</p>
                    <p>Recipient: {recipient}</p>
                </div>
            )}
        </div>
    );
}

export default App;