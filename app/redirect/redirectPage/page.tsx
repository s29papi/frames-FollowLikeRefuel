'use client';
import {useRouter} from "next/navigation";
import { useSearchParams } from 'next/navigation'
import {useEffect} from "react";


export default async  function RedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
 
    
    // console.log(searchParams.get("SourceChainId"))

    useEffect(() => {
        const redirectUrl = 'https://socket-pay.vercel.app/redirect/signTx';

        // Perform the redirect
        const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
        sleep(20000000000000).then(() => {
            console.log('End sleeping');
            // Perform the redirect after sleep
            window.location.href = redirectUrl;
        }); // For a full page reload redirect
        // Or use Next.js router for client-side redirect (comment out the line above if using this)
        // router.push(youtubeUrl);
    }, [router]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}    

async function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }