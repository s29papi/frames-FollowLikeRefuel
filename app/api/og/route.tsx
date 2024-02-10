import { ImageResponse } from "next/server";


export const runtime = "edge";


export async function GET() {
    return new ImageResponse(
        (
            <div
        style={{
            fontSize: 40,
            color: 'black',
            background: 'white',
            width: '1910px', // Adjusted width to 191 pixels
            height: '1000px', // Adjusted height to 100 pixels
            padding: '50px 0', // Adjusted padding to center content vertically
            textAlign: 'center',
            display: 'flex', // Changed display to flex for alignment
            justifyContent: 'center',
            alignItems: 'center',
        }}
      >
        👋 Hello 你好 नमस्ते こんにちは สวัสดีค่ะ 안녕 добрий день Hallá
      </div>
        ),
        {
            width: 1910,
            height:1000,
        }
    )
}
