import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";


class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        const {loading, quiz, results, retryQuiz, activeQuestion, quizAnswerClick, answerState, isFinished} = this.props;
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Please answer all questions below</h1>

                    {loading || !quiz ? <Loader/> :
                        isFinished ?
                            <FinishedQuiz
                                results={results}
                                quiz={quiz}
                                onRetry={retryQuiz}
                            /> :
                            <ActiveQuiz
                                question={quiz[activeQuestion].question}
                                answers={quiz[activeQuestion].answers}
                                onAnswerClick={quizAnswerClick}
                                quizLength={quiz.length}
                                questionNumber={activeQuestion + 1}
                                state={answerState}
                            />
                    }
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
