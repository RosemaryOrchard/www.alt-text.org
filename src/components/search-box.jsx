import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";

import {
  ts,
  fetchAltTextForUrl,
  fetchAltForImageBase64,
  searchFile,
  searchUrl,
  report,
} from "../actions/api.js";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2e4d4a",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "montserratsemibold,sans-serif",
    fontSize: 36,
  },
});

function FileSearch(props) {
  const { submit } = props;
  const [file, setFile] = React.useState(null);

  const handleSubmit = () => {
    submit(file);
  };

  const handleSelectFile = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="file-search-wrapper">
      <input
        id="file-select"
        type="file"
        accept="image/*"
        onChange={handleSelectFile}
      />
      <div className="file-search-s2">
        <button
          className="file-search-button std-button"
          onClick={handleSubmit}
          disabled={!file}
        >
          Search
        </button>
      </div>
    </div>
  );
}

function UrlSearch(props) {
  const { submit } = props;
  const [url, setUrl] = React.useState("");

  const handleSubmit = () => {
    submit(url);
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div className="url-search-wrapper">
      <label className="url-search-label" for="url-select">
        Image Address
      </label>
      <input
        type="text"
        id="url-select"
        name="url-select"
        onChange={handleChange}
      ></input>
      <div className="url-search-s2">
        <button
          className="url-search-button std-button"
          onClick={handleSubmit}
          disabled={!url}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default function SearchBox(props) {
  const { submitFile, submitUrl } = props;
  const [value, setValue] = React.useState("file");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="search-box-wrapper">
      <h2 className="search-intro">
        Search the library for a description of an image
      </h2>
      <h2 className="search-title">CHOOSE AN IMAGE</h2>
      <ThemeProvider theme={theme}>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                aria-label="Image sources"
              >
                <Tab
                  className="search-tab"
                  label="On Your Computer"
                  value="file"
                />
                <Tab className="search-tab" label="On The Web" value="url" />
              </TabList>
            </Box>
            <TabPanel value="file">
              <FileSearch submit={submitFile}></FileSearch>
            </TabPanel>
            <TabPanel value="url">
              <UrlSearch submit={submitUrl}></UrlSearch>
            </TabPanel>
          </TabContext>
        </Box>
      </ThemeProvider>
    </div>
  );
}
