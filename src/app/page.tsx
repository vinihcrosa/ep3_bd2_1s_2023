'use client'

import { useState, useEffect } from 'react'
import Head from "next/head"

import LineChart from '../components/lineChart'
import BarChart from '../components/barChart'
import MultiSelect from '../components/multiSelect'
import { ChartSectionContainer, ChartViewContainer, ChartsContainer, Header, PageContainer, Title, TableContainer, FilterContainer, Botao } from './styles';

import Image from 'next/image';
import Logo from '../images/logo.svg'

import { faker } from '@faker-js/faker';
import Table from '@/components/table';



export default function Home() {
  const [jogosPorNumeroMovimentos, setJogosPorNumeroMovimentos] = useState([
    {
      idJogo: 1,
      numeroMovimentos: 20
    },
    {
      idJogo: 2,
      numeroMovimentos: 15
    },
    {
      idJogo: 3,
      numeroMovimentos: 18
    },
    {
      idJogo: 4,
      numeroMovimentos: 22
    },
    {
      idJogo: 5,
      numeroMovimentos: 17
    },
    {
      idJogo: 6,
      numeroMovimentos: 19
    },
    {
      idJogo: 7,
      numeroMovimentos: 16
    },
    {
      idJogo: 8,
      numeroMovimentos: 21
    },
    {
      idJogo: 9,
      numeroMovimentos: 14
    },
    {
      idJogo: 10,
      numeroMovimentos: 23
    }
  ]);
  const [jogadoresPorPais, setJogadoresPorPais] = useState(
    [
      {
        pais: 'Brasil',
        quantidadeDeJogadores: 10
      },
      {
        pais: 'Estados Unidos',
        quantidadeDeJogadores: 8
      },
      {
        pais: 'Espanha',
        quantidadeDeJogadores: 6
      },
      {
        pais: 'Alemanha',
        quantidadeDeJogadores: 12
      },
      {
        pais: 'França',
        quantidadeDeJogadores: 7
      }
    ]
  );

  const [filtroJogadores, setFiltroJogadores] = useState<string[]>([]);
  const [jogadores, setJogadores] = useState<string[]>([]);
  const [filtroArbitro, setFiltroArbitro] = useState<string[]>([]);
  const [arbitros, setArbitros] = useState<string[]>([]);
  const [filtroHotel, setFiltroHotel] = useState<string[]>([]);
  const [hoteis, setHoteis] = useState<string[]>([]);

  const [programacao, setProgramacao] = useState([
    {
      id: 1,
      jogadorbrancas: 'Vitor Nunes',
      jogadorpretas: 'Vinicius Rosa',
      arbitro: 'Cleber Rodrigues',
      hotel: 'Hamilton Hotel',
      lugar: 'Av. Dr Assis Ribeiro, 243',
      hora: '11:20'
    },
    {
      id: 2,
      jogadorbrancas: 'Ana Silva',
      jogadorpretas: 'Carlos Mendes',
      arbitro: 'Luisa Oliveira',
      hotel: 'Grand Plaza Hotel',
      lugar: 'Rua dos Esportes, 78',
      hora: '15:40'
    },
    {
      id: 3,
      jogadorbrancas: 'Rafaela Costa',
      jogadorpretas: 'Juliana Santos',
      arbitro: 'Pedro Rodrigues',
      hotel: 'Hotel Imperial',
      lugar: 'Avenida Central, 456',
      hora: '09:10'
    },
    {
      id: 4,
      jogadorbrancas: 'Felipe Ribeiro',
      jogadorpretas: 'Gabriel Souza',
      arbitro: 'Fernanda Lima',
      hotel: 'Royal Palace Hotel',
      lugar: 'Rua das Torres, 32',
      hora: '14:30'
    },
    {
      id: 5,
      jogadorbrancas: 'Mariana Almeida',
      jogadorpretas: 'Rodrigo Castro',
      arbitro: 'Patricia Oliveira',
      hotel: 'Golden Tower Hotel',
      lugar: 'Avenida dos Campeões, 567',
      hora: '17:50'
    },
    {
      id: 6,
      jogadorbrancas: 'Lucas Oliveira',
      jogadorpretas: 'Carolina Fernandes',
      arbitro: 'Bruno Santos',
      hotel: 'Paradise Resort',
      lugar: 'Praia das Estrelas, 123',
      hora: '10:00'
    },
    {
      id: 7,
      jogadorbrancas: 'Luis Santos',
      jogadorpretas: 'Patricia Costa',
      arbitro: 'Fernando Silva',
      hotel: 'Sunset Beach Hotel',
      lugar: 'Avenida Beira Mar, 789',
      hora: '13:20'
    },
    {
      id: 8,
      jogadorbrancas: 'Isabela Rodrigues',
      jogadorpretas: 'Pedro Almeida',
      arbitro: 'Camila Oliveira',
      hotel: 'Palm Tree Resort',
      lugar: 'Avenida das Palmeiras, 101',
      hora: '16:40'
    },
    {
      id: 9,
      jogadorbrancas: 'Gustavo Fernandes',
      jogadorpretas: 'Ana Costa',
      arbitro: 'Mariana Santos',
      hotel: 'Paradise Resort',
      lugar: 'Praia das Estrelas, 123',
      hora: '09:00'
    },
    {
      id: 10,
      jogadorbrancas: 'Julio Mendes',
      jogadorpretas: 'Rafaela Silva',
      arbitro: 'Vinicius Costa',
      hotel: 'Royal Palace Hotel',
      lugar: 'Rua das Torres, 32',
      hora: '12:30'
    },
  ]);

  const dataJogadoresPorPais = {
    labels: jogadoresPorPais.map((dado) => dado.pais),
    datasets: [
      {
        label: 'Dataset 1',
        data: jogadoresPorPais.map((dado) => dado.quantidadeDeJogadores),
        borderColor: '#c1a380',
        backgroundColor: '#c1a380',
      },
    ],
  };
  const dataJogosPorNumeroMovimentos = {
    labels: jogosPorNumeroMovimentos.map((dado) => dado.idJogo),
    datasets: [
      {
        label: 'Dataset 1',
        data: jogosPorNumeroMovimentos.map((dado) => dado.numeroMovimentos),
        borderColor: '#c1a380',
        backgroundColor: '#c1a380',
      }
    ]
  }

  const [filterData, setFilterData] = useState({});

  useEffect(() => {
      const getJogosPorNumeroMovimentos = async () => {
        // const data = await api.get('/insira aqui a rota');
        // setJogosPorNumeroMovimentos(data.data);
      }

      const getJogadoresPorPais = async () => {
        // const data = await api.get('/insira aqui a rota');
        // setJogadoresPorPais(data.data);
      }

      const getJogadores = async () => {
        // const data = await api.get('/insira aqui a rota');
        // setJogadores(data.data);
      }
      const getArbitros = async () => {
        // const data = await api.get('/insira aqui a rota');
        // setArbitros(data.data);
      }
      const getHoteis = async () => {
        // const data = await api.get('/insira aqui a rota');
        // setHoteis(data.data);
      }

      getJogosPorNumeroMovimentos().catch((err) => console.log(err));
      getJogadoresPorPais().catch((err) => console.log(err));
      getJogadores().catch((err) => console.log(err));
      getArbitros().catch((err) => console.log(err));
      getHoteis().catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    const getProgramacao = async (filtros: {}) => {
      // const data = await api.get('/insira aqui a rota', filtros);
      // setProgramacao(data.data);
    }
    console.log(filterData)
  }, [filterData])


  function filter() {
    setFilterData(
      {
        jogadorbrancas: filtroJogadores,
        jogadorpretas: filtroJogadores,
        arbitro: filtroArbitro,
        hotel: filtroHotel
      }
    )
  }

  return (
    <PageContainer>
      <Header>
        <Image src={Logo} alt="Logo" />
      </Header>

      <TableContainer>
        <Title>Programação</Title>
        <FilterContainer>
          <p><strong>Filtros: </strong></p>
          <MultiSelect label={'Jogador'} data={jogadores} setter={setFiltroJogadores} value={filtroJogadores}/>
          <MultiSelect label={'Árbitro'} data={arbitros} setter={setFiltroArbitro} value={filtroArbitro}/>
          <MultiSelect label={'Hotel'} data={hoteis} setter={setFiltroHotel} value={filtroHotel}/>
          <Botao onClick={filter}>Filtrar</Botao>
        </FilterContainer>
        <Table rows={programacao}/>
      </TableContainer>

      <ChartSectionContainer>
        <ChartViewContainer>
          <Title>Jogos x Número de movimentos</Title>
          <ChartsContainer>
            <LineChart data={dataJogosPorNumeroMovimentos} />
            <BarChart data={dataJogosPorNumeroMovimentos} />
          </ChartsContainer>
        </ChartViewContainer>

        <ChartViewContainer>
          <Title>Países x Número de jogadores</Title>
          <ChartsContainer>
            <LineChart data={dataJogadoresPorPais} />
            <BarChart data={dataJogadoresPorPais} />
          </ChartsContainer>
        </ChartViewContainer>
      </ChartSectionContainer>
      
    </PageContainer>
  )
}
