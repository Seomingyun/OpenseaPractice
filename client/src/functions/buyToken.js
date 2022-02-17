import sendToken from "./sendToken";

async function sendEther(web3, fromAddr, toAddr, val){

	console.log('before sending transaction...', fromAddr, toAddr, val);
	try {
		const receipt = await web3.eth.sendTransaction({
			from: fromAddr, 
			to: toAddr, 
			value: val
		});
		return receipt;

	}
	catch (err) {
		console.log('err!!', err);
		return -1;
	}

}

async function buyToken (web3, tokenAddr, tokenId, tokenOwner, tokenPrice, buyerAccount) {
    console.log('clicked buy token Btn');

    console.log(web3);
    var buyerBalance = web3.utils.fromWei(await web3.eth.getBalance(buyerAccount), 'ether');
    const tokenPriceToWei = web3.utils.toWei(String(tokenPrice), "ether");

    if (tokenOwner.toLowerCase() === buyerAccount.toLowerCase()){
        alert('이미 소유 중인 NFT 입니다.');
        return false;
    }
    if (buyerBalance < tokenPrice){
        alert('이더 잔액이 부족합니다.');
        return false;
    }

    const txReceipt = await sendEther(web3, buyerAccount, tokenOwner, tokenPriceToWei);

    console.log('txRecipt is... ', txReceipt);
    if(txReceipt === -1){
        alert('이더 송금에 실패하였습니다.');
        return false;
    }
    else{
        alert('이더 송금에 성공하였습니다.');
    }

    return sendToken(web3, tokenAddr, tokenId, tokenOwner, buyerAccount);

}

export default buyToken;