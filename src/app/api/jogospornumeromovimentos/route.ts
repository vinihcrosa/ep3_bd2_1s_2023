import conn from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const query = `
            SELECT nrojogo AS idjogo, COUNT(*)::int AS quantidadeDeMovimentos
            FROM movimento
            GROUP BY nrojogo
            ORDER BY quantidadeDeMovimentos DESC
        `
        const result = await conn.query(query)
        
        return NextResponse.json(result.rows)
    } catch (error) {
        console.log(error)
    }
}