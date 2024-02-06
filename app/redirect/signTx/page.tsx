'use client';
import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
declare global {
    interface Window {
      ethereum?: any;
    }
  }  


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
        height: "12px", // Height
        width: "12px" // Width
      };
    
    useEffect(() => { 
        // connect to meta mask
        // if it fails indicate wallet not connected
        const connectToMetamask = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()

            const address = (await signer).getAddress();
            console.log('Connected address:', address);
        }

        connectToMetamask();
    }, []);

    return (
        <div>
            {loading ? (  <div style={spinnerStyle}></div>) : <p>additional content goes here.</p> }
        </div>
    );
}