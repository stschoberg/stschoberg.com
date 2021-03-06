import React from "react";
import { Container, Row, Col } from "reactstrap";
import profile from "../profile";
import moment from "moment";
import { Media } from "reactstrap";

function getDuration(durationInMonths) {
    const monthsInAYear = 12;
    const durationInYears = parseInt(durationInMonths / monthsInAYear);
    const months = (durationInMonths > monthsInAYear) ? durationInMonths % monthsInAYear : durationInMonths

    return (durationInYears > 0? durationInYears + " year" + (durationInYears > 1? "s": "") + " and " : "") + (months > 0? months + " month" + (months > 1? "s": "") : "");

}

class Experience extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    {
                        profile.experiences.map(function (experience, i) {
                            moment.locale('en');



                            return (
                                <div key={i}>
                                    <Media>
                                        <Media left top href={experience.url}>
                                            <Media object src={experience.logo} alt={experience.companyName}/>
                                        </Media>
                                    <Media body>
                                        <Media heading>
                                            <a href={experience.url}>{experience.companyName}</a>
                                            <span className="jobTotalDuration"></span>
                                        </Media>

                                        {experience.roles.map(function (role, i){
                                            const startDate = moment(role.startDate);
                                            const timeEnd = moment(role.currentJob ? new Date() : new Date(role.endDate));
                                            const duration = Number(moment.duration(timeEnd.diff(startDate)).asMonths().toPrecision(1));

                                            return (
                                                <div key={i}>
                                                    <h5>{role.title}</h5>
                                                    <span
                                                        className="jobDuration">{startDate.format('MMM YYYY')} - {role.currentJob ? 'Present' : timeEnd.format('MMM YYYY')} ({getDuration(duration)})</span>
                                                        <span className="jobLocation">{role.location}</span>
                                                        <p className="jobDescription">{role.description}</p>
                                                </div>
                                            )
                                        })}
                                    </Media>
                                    </Media>

                                </div>
                            )
                        }
                        )
                    }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Experience;