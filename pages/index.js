import React, { Component } from 'react';
import { SquareCSS, StatusCSS, BoardRowCSS, GameCSS, GameInfoCSS } from '../Componentes/Jogo/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Square(props) {
    return (
        <SquareCSS
            onClick={props.onClick}
        >
            {props.value}
        </SquareCSS>
    );
}

class Status extends React.Component {
    render() {
        return (
            <div
                className="status"
                valueStatus={this.props.valueStatus}
            >
                Next player: {this.props.valueStatus}
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Ganhador: ' + winner;
        } else {
            status = 'Próximo Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <>
                <StatusCSS>{status}</StatusCSS>
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

        return (
            <hader class="navbar fixed-bottom navbar-expand navbar-light bg-light flex-column flex-row" >
                <nav>
                    <a class="navbar-brand" href="#">
                        <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
                    </a>
                    <a class="navbar-brand" href="#">
                        <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
                    </a>
                </nav>
            </hader>
        )
    }
}

class Game extends React.Component {

    render() {
        return (
            <>
                <Menu />
                <GameCSS>
                    <div className="game-board">
                        <Board />
                    </div>
                    <GameInfoCSS>
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                    </GameInfoCSS>
                </GameCSS>
            </>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

export default Game;
