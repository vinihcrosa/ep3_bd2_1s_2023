import { NextResponse } from "next/server";

import { conn } from "../../../lib/db";

export async function GET(request: Request){
  const { rows } = await conn.query(`
    SELECT nrojogo AS idJogo, MAX(nroconsecutivo) AS numeroMovimentos 
    FROM movimento 
    GROUP BY nrojogo 
    ORDER BY numeroMovimentos DESC;
  `)

  return NextResponse.json(rows)
}