import Erc721 from "./Erc721";

function TokenList({erc721list, account, erc721addr}) {
    return (
        <div className="tokenlist">
            <Erc721 erc721list={erc721list} account={account} erc721addr={erc721addr}/>
        </div>
    );
}

export default TokenList;