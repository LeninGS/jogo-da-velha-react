import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import styled from 'styled-components';
import { SquareCSS, BoardRowCSS, GameCSS, HistoryCSS, HistoryAlert, BoardGameCSS, StatusCSS } from '../Componentes/Jogo/index.jsx';

function Square(props) {
    return (
        <SquareCSS
            onClick={props.onClick}
        >
            {props.value}
        </SquareCSS>
    );
}

class Tabuleiro extends React.Component {
    renderizarQuadrado(i) {
        return (
            <Square
                value={this.props.quadrados[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <>
                <BoardRowCSS>
                    {this.renderizarQuadrado(0)}
                    {this.renderizarQuadrado(1)}
                    {this.renderizarQuadrado(2)}
                </BoardRowCSS>
                <BoardRowCSS>
                    {this.renderizarQuadrado(3)}
                    {this.renderizarQuadrado(4)}
                    {this.renderizarQuadrado(5)}
                </BoardRowCSS>
                <BoardRowCSS>
                    {this.renderizarQuadrado(6)}
                    {this.renderizarQuadrado(7)}
                    {this.renderizarQuadrado(8)}
                </BoardRowCSS>
            </>
        );
    }
}

class Menu extends React.Component {
    render() {
        const recarregarPagina = () => {
            window.location.reload();
        }

        return (
            <header class="navbar fixed-bottom navbar-expand navbar-light bg-light flex-column flex-row" >
                <nav>
                    <a key="refresh-page" class="navbar-brand" href="#" onClick={recarregarPagina}>
                        <img src="https://images.vexels.com/media/users/3/128639/isolated/preview/62da532313d78f789be64c06811f39f0-reset-icon-svg.png" width="30" height="30" alt="" />
                    </a>
                </nav>
            </header >
        )
    }
}

export default class Jogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historico: [{
                quadrados: Array(9).fill(null),
            }],
            numeroPasso: 0,
            xEProximo: true,
            HistoricoAlerta: false,
        };
    }

    handleHistoricoAlerta(hidden) {
        const visiHistorico = (hidden) ? "hidden" : this.state.HistoricoAlerta;

        this.setState({
            HistoricoAlerta: !visiHistorico
        })
    }

    handleClique(i) {
        const historico = this.state.historico.slice(0, this.state.numeroPasso + 1);
        const atual = historico[historico.length - 1];
        const quadrados = atual.quadrados.slice();
        if (calcularVencedor(quadrados) || quadrados[i]) {
            return;
        }
        quadrados[i] = this.state.xEProximo ? "X" : "O";
        this.setState({
            historico: historico.concat([
                {
                    quadrados: quadrados
                }
            ]),
            numeroPasso: historico.length,
            xEProximo: !this.state.xEProximo
        });
    }

    jumpTo(passo) {
        this.setState({
            numeroPasso: passo,
            xEProximo: (passo % 2) === 0
        });
    }

    render() {
        const historico = this.state.historico;
        const atual = historico[this.state.numeroPasso];
        const vencedor = calcularVencedor(atual.quadrados);

        const icon =
            <span class="iconCSS">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                    <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
                </svg>
            </span>
        var iconCheck = '';

        const movimentos = historico.map((passo, movimento) => {
            var desc = 'Início da Partida';

            if (movimento == 0) {
                desc = 'Início da Partida';
                iconCheck = '';
            } else if (movimento == historico.length - 1) {
                desc = 'Jogada Atual';
                iconCheck = '';
            } else if (movimento) {
                desc = 'Jogada nº ' + movimento;
                iconCheck = icon;
            }

            return (
                <a href="#" class="list-group-item list-group-item-action" onClick={() => this.jumpTo(movimento)}>
                    {iconCheck}
                    <span>
                        {desc}
                    </span>
                </a>
            );
        });

        let status;
        if (vencedor) {
            status = (vencedor != 'velha') ? "Vencedor: " + vencedor : "Deu Velha!";
        } else {
            status = "Jogando Agora: " + (this.state.xEProximo ? "X" : "O");
        }

        return (
            <>
                <Menu />
                <GameCSS>
                    <BoardGameCSS>
                        <StatusCSS>{status}</StatusCSS>
                        <Tabuleiro
                            quadrados={atual.quadrados}
                            onClick={i => this.handleClique(i)}
                        />
                    </BoardGameCSS>
                    <HistoryCSS>
                        Histórico de Jogadas
                        {movimentos}
                    </HistoryCSS>
                </GameCSS>
            </>
        );
    }
}

function calcularVencedor(quadrados) {
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
            return quadrados[a];
        } else if (!(quadrados.includes(null))) {
            return 'velha'
        }
    }
    return null;
}