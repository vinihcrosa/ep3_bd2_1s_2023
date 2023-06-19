import { NextRequest, NextResponse } from "next/server";

import { conn } from "../../../../lib/db";

interface IParams {
  tipoParticipante: string
}

export async function GET(request: NextRequest, context: {
  params: {
    tipoParticipante: string
  }
}){
  const {tipoParticipante} = context.params
  const { rows } = await conn.query(`
  SELECT nome FROM participantes
  WHERE participandocomo = '${tipoParticipante}'
  `)

  const names = rows.map((row: any) => row.nome)

  return NextResponse.json(names)
}