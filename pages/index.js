import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Router, { useRouter } from "next/router";
import { SquareCSS, BoardRowCSS, GameCSS, HistoryCSS, BoardGameCSS, StatusCSS } from '../Componentes/Jogo/index.jsx';

function Square(props) {
    return (
        <SquareCSS
            onClick={props.onClick}
        >
            {props.value}
        </SquareCSS>
    );
}

class Board extends React.Component {
    renderSquare(i) {
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
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </BoardRowCSS>
                <BoardRowCSS>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </BoardRowCSS>
                <BoardRowCSS>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
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
        };
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

        const movimentos = historico.map((passo, movimento) => {
            var desc = 'Início da Partida';
            if (movimento == historico.length - 1) {
                desc = 'Jogada Atual';
            } else if (movimento) {
                desc = 'Jogada nº ' + movimento;
            }

            return (
                <a href="#" class="list-group-item list-group-item-action" onClick={() => this.jumpTo(movimento)}>{desc}</a>
            );
        });

        let status;
        if (vencedor) {
            status = "Vencedor: " + vencedor;
        } else {
            status = "Jogando Agora: " + (this.state.xEProximo ? "X" : "O");
        }

        return (
            <>
                <Menu />
                <GameCSS>
                    <BoardGameCSS>
                        <StatusCSS>{status}</StatusCSS>
                        <Board
                            quadrados={atual.quadrados}
                            onClick={i => this.handleClique(i)}
                        />
                    </BoardGameCSS>
                    <HistoryCSS>
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
        }
    }
    return null;
}