'use client';
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useLocation } from 'react-router-dom';

export default function RedirectPage() {
    const router = useRouter();
    const location = useLocation();
    console.log(location.search)
    useEffect(() => {
        const redirectUrl = 'https://socket-pay.vercel.app/redirect/signTx';

        // Perform the redirect
        window.location.href = redirectUrl; // For a full page reload redirect
        // Or use Next.js router for client-side redirect (comment out the line above if using this)
        // router.push(youtubeUrl);
    }, [router]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}    