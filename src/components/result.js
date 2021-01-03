import React from "react";

const Result = ({score,playAgain}) => (
    <div className="score-card">
        <div className="score">You Scored {score}/10</div>
        <button className="playBtn" onClick={playAgain}>Play Again!</button>
    </div>
);
 
export default Result;