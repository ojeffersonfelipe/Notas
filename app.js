import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
      alert('Failed to upload file');
    }
  };

  return (
    <div>
      <h1>Brokerage Note Processor</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Asset</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Date}</td>
              <td>{row.Asset}</td>
              <td>{row.Quantity}</td>
              <td>{row.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
