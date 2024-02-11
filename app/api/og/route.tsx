import { ImageResponse } from "next/server";


export const runtime = "edge";


export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '50px 0',
                justifyContent: 'center',
                backgroundColor: '#fff',
                fontSize: 22,
                fontWeight: 200,
                }}
          >
                
                <div style={{ marginTop: 40, display: 'flex', whiteSpace: 'pre-wrap' }}>👋 Hello, <span style={{color: 'blue'}}>@socket.tech</span> wants you to have a refuel. </div>
                <div style={{ marginTop: 8 }}>Follow, Like this cast, then, click refuel. 🚀</div>
            </div>
        ),
        {
            width: 1910,
            height:1000,
        }
    )
}

