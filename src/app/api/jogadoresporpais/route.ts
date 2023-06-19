import conn from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const query = `
            SELECT p.nome AS pais, COUNT(*)::int AS quantidadeDeJogadores
            FROM participantes pt
            JOIN pais p ON pt.idpais = p.idpais
            GROUP BY p.nome
        `
        const result = await conn.query(query)
        
        return NextResponse.json(result.rows)
    } catch (error) {
        console.log(error)
    }
}