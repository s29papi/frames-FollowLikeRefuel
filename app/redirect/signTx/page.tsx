'use client';
import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import "./styles.css";
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
        height: "100px", // Height
        width: "100px" // Width
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
            {loading ? ( <div style={
            { height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}
            }>
                <div style={spinnerStyle}></div>
            </div> ) : <p>additional content goes here.</p> }
        </div>
    );
}