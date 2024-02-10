import { ImageResponse } from "next/server";


export const runtime = "edge";


export async function GET() {
    return new ImageResponse(<div>Drippie</div>)
}