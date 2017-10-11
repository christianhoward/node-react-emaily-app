import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.fetchSurveys();
    }
    handleDeleteSurvey(id) {
        this.props.deleteSurvey(id);
    }
    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div key={survey._id} className="card darken-1">
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                        <br />
                        <p className="right">Last Response: {new Date(survey.lastResponded).toLocaleDateString()}</p>
                    </div>
                    <div className="card-action" style={{paddingBottom: '25px'}}>
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                        <button className="red btn-flat white-text right" style={{paddingLeft: '5px'}} onClick={() => {this.handleDeleteSurvey(survey._id)}}><i className="material-icons left">delete</i>Delete</button>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div> 
        );
    };
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);