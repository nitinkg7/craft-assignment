import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { client } from "../apollo/client";

import { GET_INSTITUTES, SUBMIT_PROFILE } from "../graphql/queries";

function Form() {
  const [name, setName] = useState<String>("");
  const [instituteName, setInstituteName] = useState(0);
  const [age, setAge] = useState<Number>(0);
  const [institutes, setInstitutes] = useState([]);
  interface InstituteSchema {
    title: string;
    id: number;
  }

  const handleSubmit = async () => {
    console.log(name, age, instituteName);
    client
      .mutate({
        mutation: SUBMIT_PROFILE,
        variables: {
          name,
          age,
          instituteName: Number(instituteName),
        },
        context: {
          headers: {
            authorization: "Bearer 4YOygR1jhsoQ2oIbn0J4-dNdkL0itwL_",
          },
        },
      })
      .then((res) => console.log(res.data));
  };

  const getInstitutes = async () => {
    const res = await client
      .query({
        query: GET_INSTITUTES,
        context: {
          headers: {
            authorization: "Bearer m5NLI3DBUtxmqlj9SLRR8LcoPv3_9cav",
          },
        },
      })
      .then((res) => setInstitutes(res.data.institutesEntries));
  };

  useEffect(() => {
    getInstitutes();
  }, []);

  return (
    <div className="container">
      <div className="headerContainer">
        <p className="topHeader">Submit Your Profile</p>
      </div>
      <div className="fieldSection">
        {/* first field */}

        <div className="inputFiledContainer">
          <InputLabel id="name-select">Name</InputLabel>
          <TextField
            id="outlined-basic"
            sx={{ width: "400px", backgroundColor: "white" }}
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Second field */}
        <div className="inputFiledContainer">
          <InputLabel id="course-select">Age</InputLabel>
          <TextField
            id="outlined-basic"
            type={"number"}
            sx={{ width: "400px", backgroundColor: "white" }}
            label="Age"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(Number(e.currentTarget.value))}
          />
          {/* <Select
            labelId="course-select"
            id="courseSelect"
            value={course}
            label="Course"
            sx={{ width: "400px", backgroundColor: "white" }}
            onChange={courseChange}
          >
            <MenuItem value="B.Tech">B.Tech</MenuItem>
            <MenuItem value="M.Tech">M.Tech</MenuItem>
            <MenuItem value="Phd">Phd</MenuItem>
          </Select> */}
        </div>

        {/* Third field */}
        <div className="inputFiledContainer">
          <InputLabel id="state-select">Institute Name</InputLabel>
          <Autocomplete
            id="auto-complete"
            autoComplete
            includeInputInList
            options={institutes}
            getOptionLabel={(option: InstituteSchema) => option.title}
            onChange={(_, val) => setInstituteName(Number(val?.id) || 0)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ width: "400px", backgroundColor: "white" }}
                label="Enter Institute Name"
                value={instituteName}
                variant="standard"
              />
            )}
          />
          {/* <Select
            labelId="state-select"
            id="stateSelect"
            value={state}
            label="State"
            sx={{ width: "400px", backgroundColor: "white" }}
            onChange={stateChange}
          >
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Punjab">Punjab</MenuItem>
          </Select> */}
        </div>
        {/* Button */}
        <div className="buttonContainer">
          <Button
            variant="contained"
            sx={{ width: "180px", height: "50px", fontSize: 18 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
