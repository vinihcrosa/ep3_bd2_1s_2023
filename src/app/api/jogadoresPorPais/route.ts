import { NextResponse } from "next/server";

import { conn } from "../../../lib/db";

export async function GET(request: Request){
  const { rows } = await conn.query(`
    SELECT pa.nome AS nome_pais, COUNT(pt.idassociado) AS quantidade_jogadores
    FROM participantes pt
    JOIN pais pa ON pt.idpais = pa.idpais
    WHERE pt.participandocomo = 'jogador'
    GROUP BY pa.nome;
  `)

  return NextResponse.json(rows)
}