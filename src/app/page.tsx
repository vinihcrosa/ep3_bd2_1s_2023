'use client'

import dynamic from 'next/dynamic'

import { useState, useEffect } from 'react'

import LineChart from '../components/lineChart'
import BarChart from '../components/barChart'
import Select from '../components/select'
import { ChartSectionContainer, ChartViewContainer, ChartsContainer, Header, PageContainer, Title, TableContainer, FilterContainer, Botao, BotaoLimpar } from './styles';

import Image from 'next/image';
import Logo from '../images/logo.svg'

import Table from '@/components/table';

import axios from 'axios';


export default function Home() {
  const [jogosPorNumeroMovimentos, setJogosPorNumeroMovimentos] = useState([]);
  const [jogadoresPorPais, setJogadoresPorPais] = useState([]);

  const [filtroJogadores, setFiltroJogadores] = useState<string>('');
  const [jogadores, setJogadores] = useState<string[]>([]);
  const [filtroArbitro, setFiltroArbitro] = useState<string>('');
  const [arbitros, setArbitros] = useState<string[]>([]);
  const [filtroHotel, setFiltroHotel] = useState<string>('');
  const [hoteis, setHoteis] = useState<string[]>([]);

  const [programacao, setProgramacao] = useState([]);

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

  const [filterData, setFilterData] = useState({
    jogadorbrancas: '',
    jogadorpretas: '',
    arbitro: '',
    hotel: ''
  });

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
      const data = await axios.get('/api/programacao', {
        params: filtros
      });
      setProgramacao(data.data);
    }
    getProgramacao(filterData)
    console.log(filterData)

    getProgramacao(filterData).catch((err) => console.log(err));
  }, [filterData])


  function filter() {
    setFilterData(
      {
        // @ts-ignore
        jogadorbrancas: filtroJogadores,
        // @ts-ignore
        jogadorpretas: filtroJogadores,
        // @ts-ignore
        arbitro: filtroArbitro,
        // @ts-ignore
        hotel: filtroHotel
      }
    )

    console.log(filterData)
  }

  function clearFilters() {
    setFilterData(
      {
        // @ts-ignore
        jogadorbrancas: '',
        // @ts-ignore
        jogadorpretas: '',
        // @ts-ignore
        arbitro: '',
        // @ts-ignore
        hotel: ''
      }
    )
    setFiltroArbitro('');
    setFiltroHotel('');
    setFiltroJogadores('');
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
          <Select label={'Jogador'} data={jogadores} setter={setFiltroJogadores} value={filtroJogadores}/>
          <Select label={'Árbitro'} data={arbitros} setter={setFiltroArbitro} value={filtroArbitro}/>
          <Select label={'Hotel'} data={hoteis} setter={setFiltroHotel} value={filtroHotel}/>
          <Botao onClick={filter}>Filtrar</Botao>
          <BotaoLimpar onClick={clearFilters} className='limpar'>Limpar filtros</BotaoLimpar>
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
