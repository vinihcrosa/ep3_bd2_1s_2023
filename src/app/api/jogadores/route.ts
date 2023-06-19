import conn from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const query = "SELECT nome FROM participantes WHERE participandocomo = 'jogador'"
        const result = await conn.query(query)
        console.log(result.rows)

        let res: String[] = [];
        result.rows.map((row: any) => {
            res.push(row.nome)
        })
        
        return NextResponse.json(res)
    } catch (error) {
        console.log(error)
    }
}