

import { NextRequest, NextResponse } from "next/server";

import { conn } from "../../../lib/db";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest){

  const searchParams = new URLSearchParams(request.url?.split('?')[1])

  const jogadorBrancas = searchParams.get('jogadorbrancas')
  const jogadorPretas = searchParams.get('jogadorpretas')
  const arbitro = searchParams.get('arbitro')
  const hotel = searchParams.get('hotel')

  const { rows } = await conn.query(`
    SELECT
      j.idJogo AS id,
      pb.nome AS jogadorbrancas,
      pp.nome AS jogadorpretas,
      a.nome AS arbitro,
      h.nome AS hotel,
      h.endereco AS lugar,
      j.jornada AS hora
    FROM jogo j
    JOIN participanteJogador pjb ON j.jogadorBrancas = pjb.idJogador
    JOIN participanteJogador pjp ON j.jogadorPretas = pjp.idJogador
    JOIN participantes pb ON pjb.idJogador = pb.idAssociado
    JOIN participantes pp ON pjp.idJogador = pp.idAssociado
    JOIN participantes a ON j.idArbitro = a.idAssociado
    JOIN celebracaoJogoSalao c ON j.idJogo = c.idJogo
    JOIN salao s ON c.idHotel = s.idHotel AND c.nroSalao = s.nroSalao
    JOIN hotel h ON s.idHotel = h.idHotel
    ${jogadorBrancas || jogadorPretas || arbitro || hotel ? 'WHERE': ''}
    ${jogadorBrancas ? `pb.nome ILIKE '${jogadorBrancas}'` : ''}
    ${jogadorBrancas && jogadorPretas ? `AND pp.nome ILIKE '${jogadorPretas}'` : jogadorPretas ? `pp.nome ILIKE '${jogadorPretas}'` : ``}
    ${(jogadorBrancas || jogadorPretas) && arbitro ? `AND a.nome ILIKE '${arbitro}'` : arbitro ? `a.nome ILIKE '${arbitro}'` : ''}
    ${(jogadorBrancas || jogadorPretas || arbitro) && hotel ? `AND h.nome ILIKE '${hotel}'` : hotel ? `h.nome ILIKE '${hotel}'` : '' };
  `)

  return NextResponse.json(rows)
}