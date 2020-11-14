import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

 */



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

function Square(props) {
    return  (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={ this.props.squares[i] } onClick={ () => this.props.onClick(i) } />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                        {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // Don't handle click if someone won the game or if the square is already full.
        if (calculateWinner(squares) || squares[i])
            return;

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: squares }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        while(this.state.history.length > step)
            this.state.history.pop()
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;

        const moves = history.map((step, move) => {
            const desc = move ? 'Revenir au tour n°' + move : 'Revenir au début de la partie';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        ;});

        if(winner)
            status = winner + ' won !';
        else
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div className="game">
            <div className="game-board">
            <Board squares={current.squares} onClick={ (i) => this.handleClick(i) } />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
            </div>
    );
    }
}

// ========================================

class Navigation extends React.Component {

    render() {
        return (
            <div className="navigation">
                <div>Notion</div>
                <div>
                    <h4>Pages</h4>
                </div>
            </div>
        );
    }

}
class Editor extends React.Component {


    onEnterPress(event) {
        if (event.keyCode === 13) {
            
        }
    }

    renderBlock() {
        return <EditorBloc onKeyPress={this.onEnterPress} />
    }

    render() {
        return (
            <div className="editor">
                {this.renderBlock()}
            </div>
        );
    }

}

class EditorBloc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null
        }

        this.checkChange = this.checkChange.bind(this);
    }

    checkChange(event) {
        this.setState({ text: event.target.value });
    }

    render() {
        return (
            <input type="text" className="editor-bloc" onChange={this.checkChange} onKeyDown={(event) => this.props.onKeyPress(event)}></input>
        );
    }
}

class Notion extends React.Component {

    renderSquare(i) {
        return <Square value={ this.props.squares[i] } onClick={ () => this.props.onClick(i) } />;
    }

    render() {
        return (
            <div className="notion">
                <Navigation />
                <Editor />
            </div>
        );
    }
}

ReactDOM.render(
<Notion />,
    document.getElementById('root')
);
