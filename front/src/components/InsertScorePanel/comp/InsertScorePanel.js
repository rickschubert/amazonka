import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./InsertScorePanel.css";
import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import scoreData from "./oneSerieScore.json";

const points = {
    0: "M",
    X: "X",
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
};
var shootAmount = 0;
var shoots;

function InsertScorePanel() {
    var [myArray, updateMyArray] = useState([]);
    var [activeInput, setActiveInput] = useState("");

    const handlePointChoose = (element) => {
        myArray[activeInput] = points[element];
        updateMyArray(myArray);
        var iterator = Object.keys(myArray);
        for (var i = 0; i < iterator.length; i++) {
            if (iterator[i] === activeInput) {
                if (i < iterator.length - 1)
                    document.getElementById(iterator[i + 1]).focus();
                else document.getElementById("Zapisz").focus();
                break;
            }
            document.getElementById(activeInput).value = points[element];
        }
    };

    const handleSubmit = () => {
        const emptyFields = Object.values(myArray).filter(f=> f=== '-').length;
        if (emptyFields) {
            document.getElementById("info-msg").style.color = "red";
            document.getElementById("info-msg").innerHTML =
                "Uzupełnij wszystkie wyniki!";
        } else {
            //here put the code to send data to backend
            document.getElementById("info-msg").style.color = "green";
            document.getElementById("info-msg").innerHTML =
                "Wyniki zostały dodane!";
        }
    };

    return (
        <div data-testid="scorePanel">
            <p id="mainHeader">
                {" "}
                Kategoria: {scoreData[0]["category_name"]}, Odległość:{" "}
                {scoreData[0]["distance"]}, Seria: 2{" "}
            </p>
            <div id="info-msg"></div>
            <div className="container">
                <div className="insertScore-points-column">
                    {Object.keys(points).map(function (element) {
                        return (
                            <Button
                                type="button"
                                key={points[element]}
                                placeholder={points[element]}
                                className="scoreChooseBtn"
                                onClick={() => {
                                    handlePointChoose(element);
                                }}
                            />
                        );
                    })}
                </div>
                <div className="insertScore-results-column">
                    <div className="scoreScroll">
                        {Object.keys(scoreData).map(function (element) {
                            shootAmount = scoreData[element]["series_num"];
                            shoots = Array(shootAmount).fill().map(
                                (element, index) => index + 1
                            );
                            if (Object.keys(myArray).length === 0) {
                                scoreData[element]["participants"].forEach(
                                    (part) => {
                                        for (let i = 1; i <= shootAmount; i++) {
                                            myArray[
                                                part["stand"] +
                                                    part["order"] +
                                                    "_" +
                                                    i
                                            ] = "-";
                                        }
                                    }
                                );
                                setActiveInput(Object.keys(myArray)[0]);
                            }
                            return Object.keys(
                                scoreData[element]["participants"]
                            ).map(function (part) {
                                var stand_order =
                                    scoreData[element]["participants"][part][
                                        "stand"
                                    ] +
                                    scoreData[element]["participants"][part][
                                        "order"
                                    ];

                                return (
                                    <div
                                        className="player-score-div"
                                        key={stand_order}
                                    >
                                        <p>
                                            {" "}
                                            {stand_order +
                                                " " +
                                                scoreData[element][
                                                    "participants"
                                                ][part]["full_name"]}
                                        </p>
                                        <div className="fields">
                                            {Object.keys(shoots).map(function (
                                                shootNr
                                            ) {
                                                var inputID =
                                                    stand_order +
                                                    "_" +
                                                    shoots[shootNr];
                                                return (
                                                    <input
                                                        type="text"
                                                        value={myArray[inputID]}
                                                        id={inputID}
                                                        key={inputID}
                                                        readOnly={true}
                                                        className="pointInput"
                                                        onFocus={() => {
                                                            setActiveInput(
                                                                inputID
                                                            );
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            });
                        })}
                    </div>
                    <div className="btn-div">
                        <Button
                            type="submit"
                            placeholder="Zapisz"
                            className="btn btn-primary btn-lg ml-4"
                            onClick={() => {
                                handleSubmit();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InsertScorePanel;