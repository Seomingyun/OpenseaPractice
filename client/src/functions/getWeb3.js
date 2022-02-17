import Web3 from 'web3'

function getWeb3() {
    if (typeof window.ethereum !== "undefined") { 
        try {
            const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
            return web;
        } catch (err) {
            console.log(err);
            return;
        }
    }
}

export default getWeb3;