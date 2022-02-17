import React from "react";
import { Link } from "react-router-dom";


function Erc721({ erc721list, account, erc721addr}) {
    return (
        <div className="erc721list">
            {erc721list.map((token) => {
                return (
                    <div key = {token.tokenId} className="erc721token">
                        Name: <span className="name">{token.tokenName}</span>(
                        <span className="symbol">{token.tokenSymbol}</span>)
                        <div className = "nftOwner">NFT Owner: {token.tokenOwner}</div>
                        <div className="nft">id: {token.tokenId}</div>
                        <Link
                            to={"/detail"}
                            state={{token: token, account: account, erc721addr: erc721addr}}
                        >
                            <img src={token.tokenURI} width={300} />
                        </Link>
                        <br></br>
                    </div>
                );
            })}
        </div>
    );
}

export default Erc721;