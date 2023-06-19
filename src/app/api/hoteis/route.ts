import { NextResponse } from "next/server";

import { conn } from "../../../lib/db";

export async function GET(request: Request){
  const { rows } = await conn.query(`
    SELECT nome from hotel;
  `)

  const names = rows.map((row: any) => row.nome)

  return NextResponse.json(names)
}