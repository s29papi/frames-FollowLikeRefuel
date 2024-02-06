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
            {loading ? ( <p>Loading...</p>) : <p>additional content goes here.</p> }
        </div>
    );
}