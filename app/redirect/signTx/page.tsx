'use client';
import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';



export default function SignTxPage() {
    // const router = useRouter();
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const redirectUrl = 'https://socket-pay.web.app/deposit';

    //     // Perform the redirect
    //     window.location.href = redirectUrl; // For a full page reload redirect
    //     // Or use Next.js router for client-side redirect (comment out the line above if using this)
    //     // router.push(youtubeUrl);
    // }, [router]);

    return (
        <div>
            {loading ? ( <p>Loading...</p>) : <p>additional content goes here.</p> }
        </div>
    );
}