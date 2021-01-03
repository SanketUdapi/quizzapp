import React,{Component} from 'react';
import ReactDom from "react-dom";
import "./styles/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/result";

class Quiz extends Component{
    state = {
        questionBank: [],
        score: 0,
        responses: 0,
    };
    getQuestions=()=>{
        quizService().then(question =>{
            this.setState({
                questionBank: question
            });
        });
    };
    computAnswer= (answer,correctAnswer)=>{
        if (answer===correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 10 ? this.state.responses + 1:10
        })
    };
    playAgain=()=>{
        this.getQuestions();
        this.setState({
            score:0,
            responses:0,


        })
    }
    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div className="container">
                <div className="title">
                    Are You Ready To Test Your Knowledge???
                </div>
                {this.state.questionBank.length > 0 && 
                this.state.responses < 10 &&
                this.state.questionBank.map(
                    ({question,answers,correct,questionId})=>(
                    <QuestionBox 
                    question={question}
                    options={answers} 
                    key={questionId}
                    selected={answer => this.computAnswer(answer,correct)}
                    />
                    )
                )}
                {this.state.responses===10 ? (<Result score={this.state.score} playAgain={this.playAgain}/>):null}
            </div>
        );
    }

}

ReactDom.render(<Quiz/>,document.getElementById("root"));