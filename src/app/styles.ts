import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    width: 100%;
    height: 120px;
    align-items: center;
    justify-content: center;
`

export const ChartsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: content-fit;
    justify-content: space-between;    
`

export const ChartViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    gap: 15px;
    padding: 15px;
    border: 2px solid #ccc;
    border-radius: 10px;
`

export const Title = styled.h2`
    font-size: 24px;
    color: #222;
`

export const ChartSectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: center;
    gap: 25px;
`

export const PageContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    margin-bottom: 80px;
`

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    width: 88%;
    border: 2px solid #ccc;
    border-radius: 10px;

    margin-bottom: 20px;
`

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`

export const Botao = styled.button`
    decoration: none;
    align-items: center;
    justify-content: center;
    padding: 10px;
    height: 56px;
    min-width: 100px;
    border: none;
    border-radius: 10px;
    background: #c1a380;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
    
    &:hover {
        background: #e7c399;
        color: #fff;
    }
`

export const BotaoLimpar = styled.button`
    decoration: none;
    align-items: center;
    justify-content: center;
    padding: 10px;
    height: 56px;
    min-width: 100px;
    border: none;
    border-radius: 10px;
    background: #fff;
    color: #222;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        color: #c1a380;
    }
`