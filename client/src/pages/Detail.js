import React from 'react';
import { useLocation } from "react-router";
import buyToken from '../functions/buyToken';
import {useState} from "react"
import getWeb3 from '../functions/getWeb3';
import '../App.css';

const Detail = () => {
    const {tokenId, tokenName, tokenOwner, tokenSymbol, tokenURI} = useLocation().state.token;
	const account = useLocation().state.account;
	const erc721addr = useLocation().state.erc721addr;
    // console.log(tokenId, tokenName, tokenOwner, tokenSymbol, tokenURI);
	// console.log(account);
	// console.log('erc721Addr!!!', erc721addr);
	const [val, setVal] = useState("");
	const web3 = getWeb3();
	

	return(
		<div className="App">
			<div><h1>NFT 상세보기</h1></div>
			<br></br>
			<img src={tokenURI} width={500} />
			<h3>NFT 이름</h3>
            {tokenName + ' #' + tokenId}
			<h3>Owner 어카운트 주소</h3>
            {tokenOwner}

			<h3>Value to Buy:{" "}
		            <input
		                type="text"
		                value={val}
		                onChange={(e) => {
		                setVal(e.target.value);
		            }}
		        ></input></h3>
			<button
				onClick={() => buyToken(
					web3,
					erc721addr,
					tokenId,
					tokenOwner,
					val,
					account
				)}>구매</button>
		</div>
	);
}

export default Detail;