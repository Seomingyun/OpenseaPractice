import erc721Abi from '../contract/erc721Abi';

async function sendToken (web3, tokenAddr, tokenId, tokenOwner, tokenBuyer) { 

    const approvalAddr = '0x7FE220F96688032bbC0dB722282Fae5e7EaA11f1';
    const approvalPK = '846171d6340efef29b61a7454aa3c7d8fc7d42605a88b4b1242a51e9ae684171';

    const tokenContract = await new web3.eth.Contract(
        erc721Abi,
        tokenAddr,
        {
            from: approvalAddr
        }
    );
    tokenContract.options.address = tokenAddr;

    const nonce = await web3.eth.getTransactionCount(approvalAddr, "latest");

    const tx = {
        from: approvalAddr,
        to: tokenContract.options.address,
        nonce: nonce,
        gas: 500000,
        data: tokenContract.methods
          .transferFrom(tokenOwner, tokenBuyer, tokenId)
          .encodeABI(),
    };

    console.log('토큰 전송 Tx 채굴을 기다리는 중...');

    web3.eth.accounts.signTransaction(tx, approvalPK)
    .then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction)
        .on('receipt', (receipt)=> {
            console.log(receipt);
            alert('NFT 구매에 성공하였습니다.')
        })
        .on('error', (error) => {
            console.log(error);
            alert('NFT 구매에 실패하였습니다.')
            return false;
        });
    });

    return true;

};

export default sendToken;