'use client'

import dynamic from 'next/dynamic'

import { useState, useEffect } from 'react'

import LineChart from '../components/lineChart'
import BarChart from '../components/barChart'
import MultiSelect from '../components/multiSelect'
import { ChartSectionContainer, ChartViewContainer, ChartsContainer, Header, PageContainer, Title, TableContainer, FilterContainer, Botao } from './styles';

import Image from 'next/image';
import Logo from '../images/logo.svg'

import Table from '@/components/table';

import axios from 'axios';


export default function Home() {
  const [jogosPorNumeroMovimentos, setJogosPorNumeroMovimentos] = useState([]);
  const [jogadoresPorPais, setJogadoresPorPais] = useState([]);

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
    labels: jogadoresPorPais.map((dado: any) => dado.pais),
    datasets: [
      {
        label: 'Dataset 1',
        data: jogadoresPorPais.map((dado: any) => dado.quantidadedejogadores),
        borderColor: '#c1a380',
        backgroundColor: '#c1a380',
      },
    ],
  };
  const dataJogosPorNumeroMovimentos = {
    labels: jogosPorNumeroMovimentos.map((dado:any) => dado.idjogo),
    datasets: [
      {
        label: 'Dataset 1',
        data: jogosPorNumeroMovimentos.map((dado:any) => dado.quantidadedemovimentos),
        borderColor: '#c1a380',
        backgroundColor: '#c1a380',
      }
    ]
  }

  const [filterData, setFilterData] = useState({});

  useEffect(() => {
      const getJogosPorNumeroMovimentos = async () => {
        const data = await axios.get('/api/jogospornumeromovimentos');
        console.log(data.data);

        setJogosPorNumeroMovimentos(data.data);
      }

      const getJogadoresPorPais = async () => {
        const data = await axios.get('/api/jogadoresporpais');
        console.log(data.data);

        setJogadoresPorPais(data.data);
      }

      const getJogadores = async () => {
        const data = await axios.get('/api/jogadores');
        console.log(data.data);
        setJogadores(data.data);
      }
      const getArbitros = async () => {
        const data = await axios.get('/api/arbitros');
        console.log(data.data);
        setArbitros(data.data);
      }
      const getHoteis = async () => {
        const data = await axios.get('/api/hoteis');
        console.log(data.data);
        setHoteis(data.data);
      }

      getJogosPorNumeroMovimentos().catch((err) => console.log(err));
      getJogadoresPorPais().catch((err) => console.log(err));
      getJogadores().catch((err) => console.log(err));
      getArbitros().catch((err) => console.log(err));
      getHoteis().catch((err) => console.log(err));
      
  }, [])

  useEffect(() => {
    const getProgramacao = async (filtros: {}) => {
      const data = await axios.get('/api/programacao');
        console.log(data.data);
        setProgramacao(data.data);
    }
    console.log(filterData)

    getProgramacao(filterData).catch((err) => console.log(err));
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

    console.log(filterData)
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
