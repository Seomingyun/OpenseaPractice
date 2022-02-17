import '../App.css';
import {useState, useEffect} from 'react';
import TokenList from "../components/TokenList";
import getWeb3 from '../functions/getWeb3';
import getErc721Contract from '../functions/getErc721Contract';

function Main() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('');
  const [newErc721addr, setNewErc721Addr] = useState('0x88877046D5a59B9DE8E475D425521625A4a77345'); // 내 ERC721 컨트랙트 주소
  const [erc721list, setErc721list] = useState([]);
  const [isClickedAll, setIsClickedAll] = useState(false);
  const [isClickedMy, setIsClickedMy] = useState(false);
  var accounts; 

  useEffect(() => {
      setWeb3(getWeb3());
  }, []);

  const connectWallet = async () => {
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  };

  const showAllErc721Token = async () => {
    console.log('clicked showAllErcToken button ')
    const {erc721Contract, tokenName, tokenSymbol, totalSupply} = await getErc721Contract(web3, newErc721addr); // 컨트랙트 불러오기

    const erc721AllList = [];

    for (let tokenId=1; tokenId<=totalSupply; tokenId++) {
      let tokenOwner = await erc721Contract.methods
        .ownerOf(tokenId)
        .call();
      
      let tokenURI = await erc721Contract.methods
        .tokenURI(tokenId)
        .call();
      
      // console.log(tokenOwner, tokenURI);

      erc721AllList.push({tokenName, tokenSymbol, tokenId, tokenURI, tokenOwner})

    }
    setErc721list(erc721AllList);
    setIsClickedMy(false);
    setIsClickedAll(true);
  }

  const showMyErc721Token = async (myAccount) => {
    console.log('clicked showMyErcToken button -> ', myAccount)
    const {erc721Contract, tokenName, tokenSymbol, totalSupply} = await getErc721Contract(web3, newErc721addr); // 컨트랙트 불러오기

    const erc721MyList = [];
    for (let tokenId=1; tokenId<=totalSupply; tokenId++) {
      let tokenOwner = await erc721Contract.methods
        .ownerOf(tokenId)
        .call();
      
        console.log(tokenOwner);

        if (String(tokenOwner).toLowerCase() === myAccount) {
          let tokenURI = await erc721Contract.methods
            .tokenURI(tokenId)
            .call();

          console.log(tokenOwner, tokenURI);

         erc721MyList.push({ tokenName, tokenSymbol, tokenId, tokenURI, tokenOwner })

        }
    }
    setErc721list(erc721MyList);
    setIsClickedAll(false);
    setIsClickedMy(true);
  }

  return (
      <div className="App">
        <button
          className="metaConnect"
          onClick={() => {
            connectWallet();
          }}>
            connect to MetaMask
          </button>

          <br>
          </br>
          ERC 721 Contract Address: 
          <input
              type="text"
              defaultValue="0x88877046D5a59B9DE8E475D425521625A4a77345"
              onChange={(e) => {
                setNewErc721Addr(e.target.value);  // 입력받을 때마다 newErc721addr 갱신
              }}
          ></input>
          
          <div className="userInfo">
            주소: {account}
          </div> 

          <br></br>
          <br></br>
          
          <div className='showMyErc721'>
            <button onClick={() => {showMyErc721Token(account)}}>
                show my erc721 list
              </button>
              <br></br>
              {isClickedMy? 
                <div>
                  <TokenList web3={web3} account={account} erc721list={erc721list} erc721addr={newErc721addr}/>
                </div>
                :
                ''
              }
          </div>
          
          <br></br>
          <br></br>

          <div className="showAllErc721">

            <button onClick={showAllErc721Token}>show All erc721 list</button>

            {isClickedAll? 
              <div>
                <TokenList web3={web3} account={account} erc721list={erc721list} erc721addr={newErc721addr}/>
              </div>
              :
              ''
            }
          </div>

          <br></br>
          <br></br>
      </div>
  );
}

export default Main;