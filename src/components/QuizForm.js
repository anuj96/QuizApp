import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v5 as uuidv5 } from "uuid";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  container: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    top: 176,
    position: "absolute",
    maxWidth: "45%",
    marginBottom: 75,
    left: "30%",
    width: "100%"
  },
  questionfields: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    margin: 11,
    display: "block"
  },
  input: {
    boxShadow: "3px 5px #eeeeee",
    display: "block",
    width: "100%",
    borderRadius: 4,
    border: "1px solid #bdbdbd",
    padding: "10px 15px",
    margin: 10,
    fontSize: 14
  },
  label: {
    lineHeight: 2,
    textAlign: "left",
    display: "block",
    marginBottom: 13,
    marginTop: 20,
    fontSize: 14,
    fontWeight: 200,
    marginLeft: 14,
    fontFamily: "sans-serif"
  },
  button: {
    backgroundColor: "#ec5990",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    marginTop: 40,
    padding: 20,
    fontSize: 16,
    fontWeight: 100,
    letterSpacing: 10
  }
}));

function QuizForm(props) {
  const classes = new useStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsArray = [];
    const queastionsIdArray = [];
    const date = props.match.params.date;
    fetch(`http://localhost:3001/data?date=${date}`)
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questions => {
        questions.map(question => {
          queastionsIdArray.push(question.id);
          questionsArray.push(question.questions);
        });
        setQuestionsId(queastionsIdArray);
        setQuestions(questionsArray);
        setLoading(false);
      });
  }, []);

  const calcaulateScore = (rightAns, userAns) => {
    let score = 0;
    rightAns.map(answers => {
      answers.map(answer => {
        if (userAns.get(answer.question) === answer.answer) {
          score++;
        }
      });
    });
    return score;
  };

  const onSubmit = (data, ques, quesId) => {
    var myMap = new Map();
    for (const key in data) {
      myMap.set(key, data[key]);
    }
    const score = calcaulateScore(ques, myMap);
    const uuid = uuidv5(
      myMap.get("fullname") + myMap.get("mobile"),
      uuidv5.DNS
    );
    const date = props.match.params.date;
    const uuid1 = uuidv5(date, uuidv5.DNS);
    const userData = Object.assign(data, { id: uuid, score });
    let userResponseJson = {};
    let userAnswer = [];
    userAnswer.push(userData);
    userResponseJson.date = date;
    userResponseJson.userAnswer = userAnswer;
    userResponseJson.id = uuid1;
    let flag = false;
    let exists = false;
    fetch(`http://localhost:3001/users/`)
      .then(response => {
        return response.json();
      })
      .then(usersJson => {
        if (usersJson.length != 0) {
          usersJson.map(userJson => {
            if (
              !(
                Object.keys(userJson).length === 0 &&
                userJson.constructor === Object
              )
            ) {
              if (userJson.date === date) {
                flag = true;
                userJson.userAnswer.map(user => {
                  if (user.id === uuid) {
                    exists = true;
                    return;
                  }
                });
              }
            }
          });
        }
        if (exists) {
          alert("user already exists");
          // break;
          return;
        } else {
          if (!flag) {
            let options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userResponseJson)
            };
            fetch(`http://localhost:3001/users/`, options).then(res => {
              alert("your score is : " + score);
              history.push(`/yourresponse/${uuid}`, userData);
            });
            return;
          } else {
            fetch(`http://localhost:3001/users/${uuid1}`)
              .then(userjson => {
                return userjson.json();
              })
              .then(user => {
                console.log(user);
                user.userAnswer.push(userData);
                return user;
              })
              .then(json => {
                console.log(json);
                let options = {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(json)
                };
                fetch(`http://localhost:3001/users/${uuid1}`, options).then(
                  res => {
                    alert("your score is : " + score);
                    return history.push(`/yourresponse/${uuid}`, userData);
                  }
                );
              });
          }
        }
      })
      .catch(error => console.log("error is", error));
  };

  return (
    <Card className={classes.container}>
      <CardContent>
        <form
          onSubmit={handleSubmit(data =>
            onSubmit(data, questions, questionsId)
          )}
        >
          <label className={classes.label}>Full Name</label>
          <input
            className={classes.input}
            placeholder="Full Name"
            name="fullname"
            ref={register}
          />
          <label className={classes.label}>CITY/TOWN/VILLAGE</label>
          <input
            className={classes.input}
            placeholder="City"
            name="city"
            ref={register({ required: true })}
          />
          <label className={classes.label}>Address In Short</label>
          <input
            className={classes.input}
            placeholder="Address"
            name="address"
            ref={register}
          />
          <label className={classes.label}>Mobile No.</label>
          <input
            className={classes.input}
            placeholder="Mobile Number"
            name="mobile"
            ref={register}
          />
          {questions.map(question => {
            return question.map((row, index) => (
              <Card className={classes.questionfields}>
                <CardContent>
                  <fieldset>
                    <fieldset>
                      <label>
                        {index + 1}. {row.question}
                      </label>
                    </fieldset>
                    <fieldset>
                      <input
                        type="radio"
                        value="YES"
                        name={row.question}
                        ref={register}
                        label="YES"
                      />
                      <label>YES</label>
                    </fieldset>
                    <fieldset>
                      <input
                        type="radio"
                        value="NO"
                        name={row.question}
                        ref={register}
                      />
                      <label>NO</label>
                    </fieldset>
                  </fieldset>
                </CardContent>
              </Card>
            ));
          })}
          {errors.exampleRequired && <p>This field is required</p>}
          <CardActions>
            <input className={classes.button} type="submit" />
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default QuizForm;
