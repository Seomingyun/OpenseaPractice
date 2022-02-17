import erc721Abi from '../contract/erc721Abi';

async function getErc721Contract(web3, contractAddr) {
    const erc721Contract = await new web3.eth.Contract(
      erc721Abi,
      contractAddr
    );
    erc721Contract.options.address = contractAddr;
    const tokenName = await erc721Contract.methods.name().call();
    const tokenSymbol = await erc721Contract.methods.symbol().call();
    const totalSupply = await erc721Contract.methods.totalSupply().call();

    console.log("NFT 현황: ", tokenName, tokenSymbol, totalSupply);

    return {erc721Contract, tokenName, tokenSymbol, totalSupply};
}

export default getErc721Contract;