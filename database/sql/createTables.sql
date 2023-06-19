CREATE TABLE IF NOT EXISTS pais (
  idPais SMALLSERIAL NOT NULL,
  nome VARCHAR(50) NOT NULL UNIQUE,
  qtdClubesDeXadrez INT NOT NULL,
  PRIMARY KEY (idPais)
);

DO $$
BEGIN
  BEGIN
    CREATE TYPE TIPO_DE_PARTICIPACAO AS ENUM ('jogador', 'juiz');
  EXCEPTION WHEN duplicate_object THEN
    -- O tipo já existe, não faz nada.
  END;
END $$;

CREATE TABLE IF NOT EXISTS participantes (
  idAssociado SERIAL NOT NULL,
  nome VARCHAR(255) NOT NULL,
  telefoneDeContato VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  participandoComo TIPO_DE_PARTICIPACAO NOT NULL,
  idPais INT NOT NULL,
  PRIMARY KEY (idAssociado),
  FOREIGN KEY (idPais) REFERENCES pais (idPais)
);

CREATE TABLE IF NOT EXISTS participanteJogador (
  idJogador INTEGER NOT NULL,
  nivelDeJogo INTEGER NOT NULL,
  PRIMARY KEY (idJogador),
  FOREIGN KEY (idJogador) REFERENCES participantes(idAssociado)
);

CREATE OR REPLACE FUNCTION CRIAR_JOGADOR_PELO_NOME(nomeJogador TEXT, nivelJogador INTEGER)
RETURNS VOID AS $$
    DECLARE id_associado INTEGER;
    BEGIN
        SELECT idAssociado INTO id_associado FROM participantes WHERE nome = nomeJogador LIMIT 1;

        IF id_associado IS NULL THEN
            RAISE EXCEPTION  'Associado nao encontrado: %', nomeJogador;
        END IF;

        INSERT INTO participanteJogador(idJogador, nivelDeJogo) VALUES(id_associado, nivelJogador);
    END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS ParticipacaoCampeonatos (
  idParticipante SMALLSERIAL NOT NULL,
  participouComo TIPO_DE_PARTICIPACAO NOT NULL,
  nomeCampeonato varchar(100) NOT NULL,
  PRIMARY KEY (idParticipante, nomeCampeonato),
  FOREIGN KEY (idParticipante) REFERENCES participantes (idAssociado)
);

CREATE TABLE IF NOT EXISTS hotel (
  idHotel SMALLSERIAL NOT NULL,
  nome VARCHAR(50) NOT NULL,
  telefone INTEGER NOT NULL,
  endereco VARCHAR(256),
  PRIMARY KEY (idHotel)
);

CREATE TABLE IF NOT EXISTS acomodacoesParticipanteHotel (
  idParticipante INTEGER NOT NULL,
  idHotel INTEGER NOT NULL,
  dataEntrada DATE,
  dataSaida DATE,
  PRIMARY KEY (idParticipante, idHotel, dataEntrada, dataSaida),
    FOREIGN KEY (idParticipante) REFERENCES participantes(idAssociado),
    FOREIGN KEY (idHotel) REFERENCES hotel(idHotel)
);

CREATE TABLE IF NOT EXISTS salao (
    idHotel SMALLSERIAL NOT NULL,
    nroSalao SMALLSERIAL NOT NULL,
    capacidade INTEGER NOT NULL,
    meios VARCHAR(100),
    PRIMARY KEY (idHotel, nroSalao),
    FOREIGN KEY (idHotel) REFERENCES hotel(idHotel)
);

CREATE TABLE IF NOT EXISTS jogo (
    idJogo SMALLSERIAL NOT NULL,
    jogadorBrancas INTEGER NOT NULL,
    jogadorPretas INTEGER NOT NULL,
    jornada DATE NOT NULL,
    idArbitro INTEGER NOT NULL,
    PRIMARY KEY (idJogo),
    FOREIGN KEY (idArbitro) REFERENCES participantes(idAssociado),
    FOREIGN KEY (jogadorBrancas) REFERENCES participanteJogador(idJogador),
    FOREIGN KEY (jogadorPretas) REFERENCES participanteJogador(idJogador)
);

CREATE TABLE IF NOT EXISTS celebracaoJogoSalao (
    idJogo INTEGER NOT NULL,
    idHotel INTEGER NOT NULL,
    nroSalao INTEGER NOT NULL,
    entradasVendidas INTEGER NOT NULL,
    PRIMARY KEY (idJogo, idHotel, nroSalao),
    FOREIGN KEY (idHotel, nroSalao) REFERENCES salao(idHotel, nroSalao),
    FOREIGN KEY (idJogo) REFERENCES jogo(idJogo)
);

CREATE TABLE IF NOT EXISTS movimento (
    nroConsecutivo SMALLSERIAL NOT NULL,
    nroJogo INTEGER NOT NULL,
    jogada VARCHAR(20),
    comentario TEXT,
    PRIMARY KEY (nroConsecutivo, nroJogo),
    FOREIGN KEY (nroJogo) REFERENCES jogo(idJogo)
);

CREATE OR REPLACE FUNCTION verifica_participantes()
RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.jogadorBrancas = NEW.jogadorPretas THEN
            RAISE EXCEPTION 'Os Jogadores devem ser diferentes';
        END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verifica_participantes_jogo
BEFORE INSERT ON jogo
    FOR EACH ROW
    EXECUTE FUNCTION verifica_participantes();

CREATE OR REPLACE FUNCTION verifica_juiz()
RETURNS TRIGGER AS $$
DECLARE
  juiz_tipo text;
BEGIN
  SELECT participandoComo INTO juiz_tipo FROM participantes WHERE idAssociado = NEW.idArbitro;
  IF juiz_tipo IS NULL THEN
    RAISE EXCEPTION 'O associado selecionado não existe!';
  ELSEIF juiz_tipo <> 'juiz' THEN
    RAISE EXCEPTION 'O associado selecionado não é um juiz!';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verifica_juiz_jogo
BEFORE INSERT ON jogo
FOR EACH ROW
EXECUTE FUNCTION verifica_juiz();

