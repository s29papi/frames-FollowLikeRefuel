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

async function polygonGnosisMinAmount() {
    const supportedChainsAndRefuellingLimits = await getSupportedChainsAndRefuellingLimits();
    return supportedChainsAndRefuellingLimits.result[polygonIdx].limits[2].minAmount
}

async function polygonGnosisMaxAmount() {
    const supportedChainsAndRefuellingLimits = await getSupportedChainsAndRefuellingLimits();
    return supportedChainsAndRefuellingLimits.result[polygonIdx].limits[2].maxAmount
}

async function getQuoteWith(intputAmount: number) {
    let polygonChainId = await polygonId()
    let gnosisChainId = await gnosisId()
    let sourceChain = polygonChainId;
    let destinationChain = gnosisChainId;
    let fromAssetAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    let toAssetAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    let recipientAddr = "0x5E0f293eEBa536e6cDeB0B9da03d1b5335dC29De";
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

    // cases: if we pass in the starting amount and the value returned isnt within range, but higher than the max range set increaseStartingAmount false; 
    //        so we loop back till we touch max or between range
    // cases: if we pass in the starting amount and the value returned isnt within range, but lesser than the min range set increasingStartingAmount true;
    // so we loop forward till we touch the min or between range
async function findRoute() {
    let foundRoute;
    let increaseStartingAmount; 
    let startingAmount = 129000000000000000;
    const expectedMinOutputAmount = 100000000000000000;
    const expectedMaxOutputAmount = 103040104415609056; 

    for (let i = 0; ; i++) {
        let route = await getQuoteWith(startingAmount)
        let toAmount = parseInt(route.toAmount, 10)

        if (route.toAmount >= expectedMinOutputAmount && route.toAmount <= expectedMaxOutputAmount) {
            foundRoute = route;
            break;
        }
        console.log(939)
        if (route.toAmount > expectedMaxOutputAmount) {
            increaseStartingAmount = false;
        }
        if (route.toAmount < expectedMinOutputAmount) {
           increaseStartingAmount = true;
        }
        if (increaseStartingAmount) {
            startingAmount += 1;
        } else {
            startingAmount -= 1;
        }
    }

    return foundRoute;
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

async function main() {
    let amount = 129000000000000000;
    let route = await getQuoteWith(amount);
    const apiReturnData = await getRouteTransactionData(route);
    // console.log(apiReturnData.result)
    let toAddr = apiReturnData.result.txTarget;
    let txdata = apiReturnData.result.txData;
    let value = apiReturnData.result.value;
    
    

  


console.log()
    // 129 000 000 000 000 000
    const account = privateKeyToAccount(`0x${""}`);
    // move to .env
    let privateKey = ""
    const rpcUrl = 'https://polygon-mainnet.g.alchemy.com/v2/' + privateKey;
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

    const send = async () => {
        console.log(
            `Attempting to send transaction from ${account.address} to ${addressTo}`
          );

        const hash = await walletClient.sendTransaction({
            to: addressTo,
            value: parseEther(""),
            data: txdata,
        });

        await publicClient.waitForTransactionReceipt({
            hash,
          });
        
        console.log(`Transaction successful with hash: ${hash}`);
    }
    
    send()

}

main();