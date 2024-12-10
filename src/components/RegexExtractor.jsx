import React, { useState } from "react";
import { patterns } from "../utils/regexPatterns";
import { exportToCsv } from "../utils/csvExporter";

const RegexExtractor = () => {
  const [inputText, setInputText] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("emails");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleExtract = () => {
    try {
      if (!inputText.trim()) {
        setError("Please enter some text to extract data.");
        return;
      }

      const regex = patterns[selectedPattern];
      const matches = inputText.match(regex) || [];
      setResults(matches);
      setError(""); // Clear any previous errors
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
    setError(""); // Clear any previous errors
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Regex Extractor</h1>
      <div style={styles.flexContainer}>
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
    height: "80vh", // Leaves some space for header and padding
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
};

export default RegexExtractor;
