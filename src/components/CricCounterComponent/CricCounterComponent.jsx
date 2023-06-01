import React, { Fragment, useState } from "react";
import "./CricCounterComponent.css";

function CricCounterComponent() {
	const numberOfBalls = 6;
	const [score, setScore] = useState(0);
	const [balls, setBalls] = useState(numberOfBalls);
	const [wideBalls, setWideBalls] = useState(0);
	const [noBalls, setNoBalls] = useState(0);
	const [wickets, setWickets] = useState(0);
	const [gameStatus, setGameStatus] = useState(true);
	const [innings, setInnings] = useState(1);
	const [target, setTarget] = useState(0);

	const checkGameStatus = () => {
		if (balls === 0) {
            setGameStatus(false);
		} else if (balls > 0) {
			if (wickets < 10) {
				return true;
			}
			if (wickets === 10) {
				setGameStatus(false);
			}
		}
		setGameStatus(false);
		return false;
	};
	const incrementByN = (n) => {
		return () => {
			if (checkGameStatus()) {
				setScore(score + n);
				setBalls(balls - 1);
			}
		};
	};
	const handleWide = () => {
		setWideBalls(wideBalls + 1);
		if (checkGameStatus()) {
			setScore(score + 1);
			setBalls(balls + 1);
		}
	};

	const handleNoBall = () => {
		if (checkGameStatus()) {
			setScore(score + 1);
			setNoBalls(noBalls + 1);
		}
	};

	const handleWicket = () => {
		if (checkGameStatus()) {
			setWickets(wickets + 1);
			setBalls(balls - 1);
		}
	};

	const changeInnings = () => {
        console.log("changeInnings\n"+innings+"\nPrev SCore: " + score);
        console.log("Target: " + target);
        setTarget(score + 1);
		setScore(0);
		setBalls(numberOfBalls);
		setWideBalls(0);
		setNoBalls(0);
		setWickets(0);
		setGameStatus(true);
		setInnings(2);
	};

	return (
		<Fragment>
			<h1>Cricket Score</h1>
			{innings === 1 && <h3 className="balls">First Innings</h3>}
			{innings === 2 && (
				<Fragment>
					<h3 className="balls">Second Innings</h3>
					<h3 className="balls">Target: {target}</h3>
				</Fragment>
			)}
			<h3 className="score">Score: {score}</h3>
			<h3 className="balls">Balls Remaining: {balls}</h3>
			<h3 className="balls">Wide Balls: {wideBalls}</h3>
			<h3 className="balls">No Balls: {noBalls}</h3>
			<h3 className="balls">Wickets: {wickets}</h3>
			{gameStatus && (
				<Fragment>
					<button onClick={incrementByN(1)}>1</button>
					<button onClick={incrementByN(2)}>2</button>
					<button onClick={incrementByN(3)}>3</button>
					<button onClick={incrementByN(4)}>Four</button>
					<button onClick={incrementByN(6)}>Six</button>

					<button onClick={handleWide}>Wide</button>
					<button onClick={handleNoBall}>No Ball</button>
					<button onClick={handleWicket}>Wicket</button>
				</Fragment>
			)}
			{!gameStatus && (
				<Fragment>
                    <h1>Innings {innings} Over</h1>
                    <h1>Final Score: {score}/{wickets} ({balls})</h1>

					<button onClick={changeInnings}>Next Innings</button>
				</Fragment>
			)}
		</Fragment>
	);
}

export default CricCounterComponent;
