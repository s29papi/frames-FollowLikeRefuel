import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygon } from 'viem/chains';

const API_KEY = '72a5b4b0-e727-48be-8aa1-5da9d62fe635'; // SOCKET PUBLIC API KEY
const polygonIdx = 4
const gnosisIdx = 3

async function polygonId() {
    const supportedChainsAndRefuellingLimits = await getSupportedChainsAndRefuellingLimits();
    return supportedChainsAndRefuellingLimits.result[polygonIdx].chainId
}
async function gnosisId() {
    const supportedChainsAndRefuellingLimits = await getSupportedChainsAndRefuellingLimits();
    return supportedChainsAndRefuellingLimits.result[gnosisIdx].chainId
}

async function getSupportedChainsAndRefuellingLimits() {
    const response = await fetch(`https://refuel.socket.tech/chains`, {
        method: `GET`,
        headers: {
            'API-KEY': API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json();
    return json;
}

async function getRouteTransactionData(route: any) {
    const response = await fetch('https://api.socket.tech/v2/build-tx', {
        method: 'POST',
        headers: {
            'API-KEY': API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "route": route })
    });

    const json = await response.json();
    return json;
}

async function getQuoteWith(recipientAddr: string) {
    let polygonChainId = await polygonId()
    let gnosisChainId = await gnosisId()
    let sourceChain = polygonChainId;
    let destinationChain = gnosisChainId;
    let fromAssetAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    let toAssetAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    // inputAmount 
    let intputAmount = 129000000000000000;
    const uniqueRoutesPerBridge = true;
    const sort = "output";
    const singleTxOnly = true;

    const qouteUrl = `https://api.socket.tech/v2/quote?includeBridges=refuel-bridge&fromChainId=${sourceChain}&fromTokenAddress=${fromAssetAddress}&toChainId=${destinationChain}&toTokenAddress=${toAssetAddress}&fromAmount=${intputAmount}&userAddress=${recipientAddr}&uniqueRoutesPerBridge=${uniqueRoutesPerBridge}&sort=${sort}&singleTxOnly=${singleTxOnly}`;
    const response = await fetch(qouteUrl, {
        method: `GET`,
        headers: {
            'API-KEY': API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json();
    return json.result.routes[0];
}

export async function sendXdai(recipientAddr: string) {
    let route = await getQuoteWith(recipientAddr);
    const apiReturnData = await getRouteTransactionData(route);
    let toAddr = apiReturnData.result.txTarget;
    let txdata = apiReturnData.result.txData;
    let value = parseEther('0.129')
    const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);
    // move to .env
    let apiKey = process.env.API_KEY
    const rpcUrl = 'https://polygon-mainnet.g.alchemy.com/v2/' + apiKey;
    const walletClient = createWalletClient({
        account,
        chain: polygon,
        transport: http(rpcUrl),
      });

      const publicClient = createPublicClient({
        chain: polygon,
        transport: http(rpcUrl),
      });
    const addressTo = toAddr;

    console.log(
        `Attempting to send transaction from ${account.address} to ${addressTo}`
      );

    const hash = await walletClient.sendTransaction({
        to: addressTo,
        value: value,
        data: txdata,
    });

    await publicClient.waitForTransactionReceipt({
        hash,
      });
    
    console.log(`Transaction successful with hash: ${hash}`);
}

 