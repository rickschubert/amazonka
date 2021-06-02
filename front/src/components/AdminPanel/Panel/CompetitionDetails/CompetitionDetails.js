import "./CompetitionDetails.css";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useState } from "react";

function prepareDate(date) {
    let month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    let str = date.getFullYear() + "-" + month + "-" + date.getDate();
    return str;
}

function CompetitionDetails(props) {
    const _id = props.match.params.id;

    const competitionData = useSelector((state) => state.competitionsData).find(
        (cmp) => cmp._id === _id
    );
    let [categoriesList, setCategoriesList] = useState([]);

    const name = competitionData.name;
    const location = competitionData.location;
    const start_date = prepareDate(
        new Date(parseInt(competitionData.start_date))
    );
    const end_date = prepareDate(new Date(parseInt(competitionData.end_date)));

    let history = useHistory();

    function handleClick(ID) {
        history.push("/admin/panel/" + ID + "/details/edit");
    }

    return (
        <div>
            <p className="editLinkText">
                <span className="panel-content-header">Szczegóły zawodów</span>
                <span
                    className="smallEditLinkText"
                    onClick={() => handleClick(_id)}
                >
                    edytuj
                </span>
            </p>
            <Container
                fluid
                className="infoContainer"
                style={{ paddingLeft: 30, paddingRight: 30 }}
            >
                <Row className="compNameDetailDiv" xs={2} md={2} lg={3} xl={4}>
                    <Col id="name-label" className="left">
                        Nazwa:
                    </Col>
                    <Col id="name" className="right">
                        {name}
                    </Col>
                </Row>
                <div id="restDetailsDiv" xs={2} md={2} lg={3} xl={4}>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Data rozpoczęcia:</Col>
                        <Col className="right">{start_date}</Col>
                    </Row>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Data zakończenia:</Col>
                        <Col className="right">{end_date}</Col>
                    </Row>
                    <Row xs={2} md={2} lg={3} xl={4}>
                        <Col className="left">Lokalizacja:</Col>
                        <Col className="right">{location}</Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
export default CompetitionDetails;
