'use client';
import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { ethers } from 'ethers';
import "./style.css";
declare global {
    interface Window {
      ethereum?: any;
    }
  }  
  const API_KEY = '72a5b4b0-e727-48be-8aa1-5da9d62fe635'; // SOCKET PUBLIC API KEY

export default function SignTxPage() {
    // const router = useRouter();
    const [loading, setLoading] = useState(true);
    const spinnerStyle = {
        animation: "spin 1s linear infinite", // Keyframe animation
        borderRadius: "50%", // Rounded to make it circular
        borderTop: "4px solid #87CEEB", // Top border style
        borderRight: "4px solid transparent", // Right border style
        borderBottom: "4px solid transparent", // Bottom border style
        borderLeft: "4px solid transparent", // Left border style
        height: "100px", // Height
        width: "100px" // Width
      };
      const searchParams = useSearchParams()
      let dAddr = searchParams.get("DestinationAddress")
      let dchainId = searchParams.get("DestinationChainId")
      let schainId = searchParams.get("SourceChainId")
      let iamount = searchParams.get("InputAmount")
      
    useEffect(() => { 
        // connect to meta mask
        // if it fails indicate wallet not connected
        const connectToMetamask = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()

            const address = (await signer).getAddress();
            console.log('Connected address:', address);

             // Bridging Params fetched from users
            let fromChainId;
            let toChainId;
            let amount;
            if (schainId) fromChainId = parseInt(schainId);
            if (dchainId) toChainId = parseInt(dchainId);
            const fromAssetAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
            const toAssetAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
            if (iamount) amount = parseFloat(iamount) * 1e18;
            const userAddress = dAddr;
            const uniqueRoutesPerBridge = true; // Returns the best route for a given DEX / bridge combination
            const sort = "output"; // "output" | "gas" | "time"
            const singleTxOnly = true;

            const quote = await getQuote(fromChainId,
                fromAssetAddress, toChainId,
                toAssetAddress, amount,
                userAddress, uniqueRoutesPerBridge, sort, singleTxOnly
            );

            const route = quote.result.routes[0];

            const apiReturnData = await getRouteTransactionData(route);
            const approvalData = apiReturnData.result.approvalData;
            const { allowanceTarget, minimumApprovalAmount } = approvalData;
            console.log(apiReturnData)
            console.log(approvalData)
            
            
        }

        connectToMetamask();
    }, []);

    return (
        <div>
            {loading ? ( <div style={
            { height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}
            }>
                <div style={spinnerStyle}></div>
            </div> ) : <p>additional content goes here.</p> }
        </div>
    );
} 



async function getQuote(fromChainId: any, fromTokenAddress: any, toChainId: any, toTokenAddress: any, fromAmount: any, userAddress: any, uniqueRoutesPerBridge: any, sort: any, singleTxOnly: any) {
    const response = await fetch(`https://api.socket.tech/v2/quote?fromChainId=${fromChainId}&fromTokenAddress=${fromTokenAddress}&toChainId=${toChainId}&toTokenAddress=${toTokenAddress}&fromAmount=${fromAmount}&userAddress=${userAddress}&uniqueRoutesPerBridge=${uniqueRoutesPerBridge}&sort=${sort}&singleTxOnly=${singleTxOnly}`, {
        method: 'GET',
        headers: {
            'API-KEY': API_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const json = await response.json();
    return json;
}

// Makes a POST request to Socket APIs for swap/bridge transaction data
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