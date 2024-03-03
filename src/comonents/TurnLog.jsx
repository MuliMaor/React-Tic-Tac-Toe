export default function TurnLog({ turns }) {

    function formatLog(turn) {
        const { square, player } = turn;
        const { row, col } = square;
        //return `${player} at ${row}, ${col}`;
        return "poop";
    }

    return (
        <ol id="log">
            {turns.map(turn => <li key={`${turn.square.row},${turn.square.col}`}>
                {turn.player} played at {`${turn.square.row},${turn.square.col}`}
            </li>)}
        </ol>
    );
}