import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [sandboxData, setSandboxData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((response) => {
        console.log(response.data);
        setSandboxData(response.data.sandbox);
      })
      .catch((error) => {
        console.error("Error fetching sandbox data:", error);
      });
  }, []);

  const navigateToSandbox = () => {
    window.location.href = "/sandbox";
  };
  return (
    <div className="container pt-3">
      <div className="row justify-content-center pb-3">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={navigateToSandbox}>
            Navigate to SandBox
          </button>
        </div>
      </div>
      <div className="row">
        {sandboxData.map((item) => (
          <div className="col-md-6 mb-3" key={item._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Code:</h5>
                <pre className="card-text">{item.code}</pre>
                <h5 className="card-title">Output:</h5>
                <pre className="card-text">{item.result}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
