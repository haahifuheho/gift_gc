import React, { useState, useEffect, useRef } from "react";
import Web3 from 'web3';
import "./Gifting.css";
import abi from "./contracts/GiftMessage.json";
import emailjs from "emailjs-com";
import logo_mob from "./images/logo1.png"
import useModal from './Modal';
emailjs.init('o5z8BrXFZtZW3NYAJ');

function Gifting() {
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("");
    const [to_email, setEmailto] = useState("");
    const [tokenId, setTokenId] = useState("");
    const inputRecipient = useRef(null);

    const [web3, setWeb3] = useState(new Web3());
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);

    const [selectedOption, setSelectedOption] = useState('option1');

    const { Modal, openModal, closeModal } = useModal();
    const [disabled, setDisabled] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        let contractAddress;
        let abi;
        if (event.target.value === 'option1') {
            setDisabled(false);
            setRecipient(inputRecipient.current.value);
        } else if (event.target.value === 'option2') {
            setDisabled(true);
            setRecipient(process.env.REACT_APP_MANAGEMENT_ADDRESS);
        }
    }

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
                web3.setProvider(new web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'));
                setWeb3(web3);
            }
            setContract(new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS));
        };
        initWeb3();
    }, []);

    useEffect(() => {
        if (web3) {
            const initContract = async () => {
                if (web3) {
                    const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
                    setContract(contract);
                }
            };
            initContract();
        }
    }, [web3]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const giftNFT = async () => {

        try {
            const tx = await contract.methods.giftNFT(recipient, message).send({ from: accounts[0] })
                    .on('receipt', (receipt) => {
                    const tokenId = receipt.events.Gift.returnValues.tokenId;
                    const emailjsServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
                    const emailjsTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
                    const mailtokenId = tokenId;
                    const templateParams = {
                        to_email: to_email,
                        message: message + " URL:http://35.76.124.162:3000/viewer2/?id=" + mailtokenId
                    };
                    emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams).then(() => {
                    });
               });
                
            const event = tx.events[0];
            if (event && event.returnValues && event.returnValues[2]) {
                const newTokenId = event.returnValues[2].toNumber();
                setTokenId(newTokenId);
                setSuccessMessage(`Gifted NFT with Token ID: ${newTokenId}`);
                setErrorMessage("");
            }

        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to gift NFT.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="style_a">

            <h1>
                <br />
                <img src={logo_mob} alt="logo_mob" width="400px" />
            </h1>
            <label>Wallet：</label>
            <label>
                <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={handleOptionChange} />
                あり
            </label>
            <label>
                <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={handleOptionChange} />
                なし
            </label>
            <br />

            <input type="text" className={disabled ? "disabled" : ""} placeholder="Recipient" onChange={(e) => setRecipient(e.target.value)} ref={inputRecipient} disabled={disabled} />
            <br />
            <br />
            <textarea placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
            <br />
            <br />
            <input type="email" placeholder="E-mail" onChange={(e) => setEmailto(e.target.value)} />
            <br />
            <br />
            <br />
            <button onClick={openModal}>Send Message!</button>
            <Modal>
                <div className="modal">
                    <p>Is it okay to send an on-chain message NFT gift?</p>
                    <button onClick={() => {
                        giftNFT();
                        closeModal();
                    }}>OK</button>
                    <button onClick={closeModal}>キャンセル</button>
                </div>
            </Modal>
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
            <br />
            <label>This message stays forever because it's on chain!</label>
        </div>
    );
}

export default Gifting;
