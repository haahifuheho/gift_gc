import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import "./App.css";
import abi from "./contracts/GiftNFT.json";
import giftbox from "./images/giftbox.jpg";
import emailjs from "emailjs-com";
import logo_mob from "./images/logo_nob.png"
emailjs.init('o5z8BrXFZtZW3NYAJ');

function Gifting() {
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("");
    const [to_email, setEmailto] = useState("");
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
                const emailjsServiceId = "service_iakpmq7";
                const emailjsTemplateId = "template_lk4s8w6";
                const templateParams = {
                to_email: to_email,
                message: message
                };
                emailjs.send(emailjsServiceId,emailjsTemplateId,templateParams).then(()=>{
                });
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to gift NFT.");
        }
    };

    return (
        <div className="style_a">
            <h1>Gift Greeting Card NFT</h1>
            <img src={logo_mob} alt="logo_mob"/>

            <input type="text" placeholder="Recipient"onChange={(e) => setRecipient(e.target.value)} />
            <br />
            <br />
            <input type="textarea" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
            <br />
            <br />
            <input type="email" placeholder="E-mail" onChange={(e) => setEmailto(e.target.value)} />
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

export default Gifting;
