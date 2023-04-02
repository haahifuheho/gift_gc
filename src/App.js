import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import "./App.css";
import abi from "./contracts/GiftNFT.json";
import giftbox from "./images/giftbox.jpg";

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
        if (web3) {
            const initContract = async () => {
//                const contractAddress = "0x4AAbbb31f44941eFAd14f019Efe876916b57a293"; // コントラクトアドレスを入力
                const contractAddress = "0x2e7292d31c9439122ae7c8f54a145f5f446c8a18"; // コントラクトアドレスを入力

                const contract = new web3.eth.Contract(abi, contractAddress);
                setContract(contract);
            };
            initContract();
        }
    }, [web3]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const giftNFT = async () => {
        try {
            const tx = await contract.methods.giftNFT(recipient, message).send({ from: accounts[0] });
            const event = tx.events[0];
            if (event && event.returnValues && event.returnValues[2]) {
                const newTokenId = event.returnValues[2].toNumber();
                setTokenId(newTokenId);
                setSuccessMessage(`Gifted NFT with Token ID: ${newTokenId}`);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to gift NFT.");
        }
    };

    return (
        <div className="style_a">
            <h1>Gift Greeting Card NFT</h1>
            <label>
                Message: 
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
            </label>
            <br />
            <br />
            <label>
                Recipient: 
                <input type="text" onChange={(e) => setRecipient(e.target.value)} />
            </label>
            <br />
            <br />
            <button onClick={giftNFT}>Gift</button>
            {tokenId && (
                <div>
                    <p>Gifted NFT with Token ID: {tokenId}</p>
                    <p>Message: {message}</p>
                    <p>Recipient: {recipient}</p>
                </div>
            )}
             <br />
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>} 
            <br />
            <img src={giftbox} alt="giftbox"/>
            <br />
            <br />
            <label>This message stays forever because it's full on chain!</label>
        </div>
    );
}

export default App;