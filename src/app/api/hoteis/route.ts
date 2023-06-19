import conn from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const query = "SELECT nome FROM hotel"
        const result = await conn.query(query)

        let res: String[] = [];
        result.rows.map((row: any) => {
            res.push(row.nome)
        })
        
        return NextResponse.json(res)
    } catch (error) {
        console.log(error)
    }
}