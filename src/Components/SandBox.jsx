import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Terminal } from "xterm";
import axios from "axios";

const files = {
  "javascript.js": {
    name: "Javascript.js",
    language: "javascript",
    value: "console.log('Hello world')",
  },
  "java.java": {
    name: "Java.java",
    language: "Java",
    value: "system.out,printline('Hello')",
  },
};

export const SandBox = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [file, setFile] = useState("javascript.js");
  const terminalRef = useRef(null);
  const editorRef = useRef(null);

  const onChangeLanguage = (e) => {
    setFile(e.target.value);
  };

  const { value, language, name } = files[file];

  const runCode = () => {
    try {
      var logOutput = "";
      const originalConsoleLog = console.log;
      console.log = function (value) {
        logOutput += value + "\n";
      };
      eval(code);
      console.log = originalConsoleLog;
      setOutput(logOutput);
      setIsSaved(false);
    } catch (error) {
      setOutput(error.toString()); // Return the error message
    }
  };

  const saveSandbox = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/saveSandbox`, {
        code,
        output,
      });
      console.log("Response:", response.data.message);
      setIsSaved(true);
    } catch (error) {
      console.log("Code:", code);
      console.log("Output:", output);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(terminalRef.current);
    terminal.write("Welcome to My Terminal!\n");
    terminal.onData((data) => {
      console.log("Data received:", data);
    });

    return () => {
      terminal.dispose();
    };
  }, []);

  return (
    <div className="container" style={{ display: "flex", paddingTop: "20px" }}>
      <div style={{ flex: 1 }}>
        <select className="form-select" onChange={onChangeLanguage}>
          <option value="javascript.js">JavaScript</option>
          <option value="java.java">Java</option>
        </select>
        <Editor
          height="500px"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={name}
          defaultLanguage={language}
          value={value}
          onChange={(value) => setCode(value)}
        />
      </div>
      <div style={{ flex: 1 }}>
        <button className="btn btn-primary" onClick={runCode}>
          Run Code
        </button>
        <button
          className="btn btn-primary"
          onClick={saveSandbox}
          disabled={isSaved}
        >
          {isSaved ? "Sandbox Saved" : "Save Sandbox"}
        </button>
        <div
          ref={terminalRef}
          style={{ height: "500px", backgroundColor: "black" }}
        />
        <pre>{output}</pre>
      </div>
    </div>
  );
};
