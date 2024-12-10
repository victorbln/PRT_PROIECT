import { useState } from "react";
import { patterns } from "../utils/regexPatterns";
import { exportToCsv } from "../utils/csvExporter";
import GoogleSearchAPI from "./GoogleSearch";

const RegexExtractor = () => {
  const [inputText, setInputText] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("emails");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const handleExtract = () => {
    try {
      if (!inputText.trim()) {
        setError("Please enter some text to extract data.");
        return;
      }

      const regex = patterns[selectedPattern];
      const matches = inputText.match(regex) || [];
      setResults(matches);
      setError("");
    } catch (err) {
      console.error("Extraction error:", err);
      setError("An unexpected error occurred during extraction.");
    }
  };

  const handleDownload = () => {
    if (results.length === 0) {
      setError("No results to download. Extract some data first!");
      return;
    }
    exportToCsv("results.csv", results);
    setError("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Regex Extractor</h1>
      <p
        style={{ textAlign: "center", color: "lightblue", cursor: "pointer" }}
        onClick={() => (window.location.href = "docs.html")}
      >
        Project Documentation
      </p>
      <h2 style={styles.subHeader}>
        To use the app enter an URL or use the search bar for google search
        results
        <br></br>
        Then after the web page Loads you can extract the data you need from the
        text area by right clicking and
        <br></br>
        inspecting the html elements and copying the text you need from the HTML
        elements and pasting it in the text area.
      </h2>
      <div style={styles.flexContainer}>
        {/* Iframe for URL input */}
        <div style={styles.textContainer}>
          <h3 style={styles.subHeader}>Load a Web Page</h3>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL"
            style={styles.input}
          />
          <GoogleSearchAPI />

          {/* Check if URL is valid and load iframe */}
          {url && (
            <iframe
              id="iframe"
              src={url}
              title="Embedded Web Page"
              style={styles.iframe}
            />
          )}
        </div>

        {/* Input Field */}
        <div style={styles.textContainer}>
          <h3 style={styles.subHeader}>Input Text</h3>
          <textarea
            placeholder="Paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={styles.textArea}
            rows="15"
          />

          {/* Controls */}
          <div style={styles.controls}>
            <label style={styles.label}>Select Pattern: </label>
            <select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              style={styles.select}
            >
              <option value="emails">Emails</option>
              <option value="urls">URLs</option>
              <option value="phoneNumbers">Phone Numbers</option>
              <option value="dates">Dates</option>
              <option value="htmlTags">HTML Tags</option>
            </select>
          </div>

          <div style={styles.buttonContainer}>
            <button onClick={handleExtract} style={styles.button}>
              Extract
            </button>
            <button onClick={handleDownload} style={styles.button}>
              Download CSV
            </button>
          </div>

          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* Results Field */}
        <div style={styles.textContainer}>
          <h3 style={styles.subHeader}>Results</h3>
          <textarea
            readOnly
            value={results.join("\n")}
            placeholder="Results will appear here..."
            style={styles.textArea}
            rows="15"
          />
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    padding: "5vh 5vw",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "5vh",
    color: "white",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "5vw",
    height: "80vh",
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  subHeader: {
    textAlign: "center",
    marginBottom: "2vh",
    color: "cyan",
  },
  textArea: {
    width: "100%",
    height: "70%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    resize: "none",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2vh",
  },
  label: {
    fontSize: "16px",
  },
  select: {
    padding: "5px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  buttonContainer: {
    marginTop: "2vh",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
  },
  error: {
    color: "red",
    marginTop: "2vh",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    marginBottom: "20px",
  },
  iframe: {
    width: "100%",
    height: "70%",
    border: "5px solid green",
    borderRadius: "5px",
    boxSizing: "border-box",
    marginTop: "2vh",
  },
};

export default RegexExtractor;
