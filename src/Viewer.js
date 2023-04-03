import { useState, useEffect } from 'react';
import Web3 from 'web3';
import abi from "./contracts/GiftNFT.json";

function Viewer() {
    const [address, setAddress] = useState();
    const [tokenId, setTokenId] = useState();
    const [collection, setCollection] = useState("-");
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);

    const getCollection = async () => {
        const contractAddress = "0x4AAbbb31f44941eFAd14f019Efe876916b57a293";
        const contract = new web3.eth.Contract(abi, contractAddress);
        const message = await contract.methods.tokenMessage(tokenId).call();
	setCollection(message);
	const tran = contract.getTransaction();
	console.log("FINISH");
    }

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
	    try {
		const web3 = new Web3(window.ethereum);
		setWeb3(web3);
	    } catch (error) {
		console.error(error);
	    }
        } else {
	    console.error("Please install MetaMask!");
	}
    }, []);
return(
    <div>
        <h1>NFT確認</h1>
        <div>
            <h2>Account</h2>
	</div>
        <div>
            NFTAddress:<input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
	    <br/>
            TokenId:<input type="text" name="tokenId" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
	    <br/>
            <button id="getColection" onClick={getCollection} >GetCollection</button>
	    <br/>
            Collection:{collection}
        </div>
    </div>
    );
};

export default Viewer;
