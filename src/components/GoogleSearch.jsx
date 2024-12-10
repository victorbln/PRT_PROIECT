import { useState } from "react";

const GoogleSearchAPI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [url, setUrl] = useState("");

  const apiKey = "AIzaSyB_D81mKhzdO-60ZQsfaTsWKUC9tGQtVEM";
  const cx = "256b9e88c1b534fa2";

  const fetchResults = async () => {
    if (!searchTerm) return;

    const query = encodeURIComponent(searchTerm);
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchResults();
    }
  };

  const handleResultClick = (link) => {
    setUrl(link);
    setSearchTerm(""); 
    setResults([]); 
  };

  return (
    <div style={styles.textContainer}>
      <h3 style={styles.subHeader}>Load a Web Page</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} 
        placeholder="Search for something"
        style={styles.input}
      />

      {/* Display search results */}
      <div style={styles.resultsContainer}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} style={styles.resultItem}>
              <a
                href="#"
                onClick={() => handleResultClick(result.link)}
                style={styles.resultLink}
              >
                {result.title}
              </a>
              <p>{result.snippet}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {/* Display iframe with selected URL */}
      {url && (
        <iframe
          id="iframe"
          src={url}
          title="Embedded Web Page"
          style={styles.iframe}
        />
      )}
    </div>
  );
};

// Styles
const styles = {
  textContainer: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  subHeader: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  resultsContainer: {
    marginTop: "20px",
  },
  resultItem: {
    marginBottom: "10px",
  },
  resultLink: {
    fontSize: "18px",
    color: "#007BFF",
    textDecoration: "none",
    cursor: "pointer",
  },
  iframe: {
    width: "100%",
    height: "400px",
    border: "none",
    marginTop: "20px",
  },
};

export default GoogleSearchAPI;
