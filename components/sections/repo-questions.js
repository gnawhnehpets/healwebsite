import Markdown from "../elements/markdown"
import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { Button } from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { CSVLink, CSVDownload } from "react-csv"

const RepoQuestions = ({ data }) => {
  const [value, setValue] = React.useState("")
  const [showOptions, setShowOptions] = React.useState(true)
  const [optionalInformation, setOptionalInformation] = React.useState(false)
  const [questionToShow, setQuestionToShow] = React.useState(1)

  const handleChange = (event) => {
    setValue(event.target.value)
    if (event.target.value != "next") {
      setShowOptions(false)
      setOptionalInformation(event.target.value)
    } else if (event.target.value == "next") {
      setOptionalInformation(false)
      if (data.repo_question.length > questionToShow) {
        setQuestionToShow(questionToShow + 1)
        setValue("")
      }
    }
  }

  return (
    <div
      className="container pb-4 text-gray-dark"
      style={{
        padding: "25px 5px 25px 32px",
        marginBottom: "25px",
      }}
    >
      {data.repo_question.map((q, i) => {
        if (i + 1 == questionToShow) {
          return (
            <div className={"repo-questions"} key={q.question}>
              <Markdown className={"repo-questions"}>{q.question}</Markdown>
              <br></br>
              {showOptions && (
                <div>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      {q.options.map((o) => {
                        let v
                        if (o.optional_information) {
                          v = o.optional_information
                        } else {
                          v = "next"
                        }
                        return (
                          <FormControlLabel
                            key={o.yes_no}
                            value={v}
                            control={<Radio />}
                            label={o.yes_no}
                          />
                        )
                      })}
                    </RadioGroup>
                  </FormControl>
                </div>
              )}
              {/* {nextButton && (
                                <button>next button coming soon</button>
                            )} */}
              {optionalInformation && (
                <div>
                  <Markdown>{optionalInformation}</Markdown>
                  <br></br>
                  <Button variant="contained" startIcon={<FileDownloadIcon />}>
                    <CSVLink data={optionalInformation}>
                      Download Results
                    </CSVLink>
                  </Button>
                </div>
              )}
            </div>
          )
        }
      })}
    </div>
  )
}

export default RepoQuestions
