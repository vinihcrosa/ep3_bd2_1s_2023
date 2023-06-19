import conn from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request,) {
    try {
        const query = `
        SELECT
            jogo.idjogo AS id,
            participantes_brancas.nome AS jogadorbrancas,
            participantes_pretas.nome AS jogadorpretas,
            arbitro.nome AS arbitro,
            hotel.nome AS hotel,
            hotel.endereco AS lugar
        FROM
            jogo
            INNER JOIN participantes AS participantes_brancas ON jogo.jogadorbrancas = participantes_brancas.idassociado
            INNER JOIN participantes AS participantes_pretas ON jogo.jogadorpretas = participantes_pretas.idassociado
            INNER JOIN participantes AS arbitro ON jogo.idarbitro = arbitro.idassociado
            INNER JOIN celebracaojogosalao ON jogo.idjogo = celebracaojogosalao.idjogo
            INNER JOIN hotel ON celebracaojogosalao.idhotel = hotel.idhotel;
        `
        const result = await conn.query(query)
        console.log(result.rows)
        
        return NextResponse.json(result.rows)
    } catch (error) {
        console.log(error)
    }
}