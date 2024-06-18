// Machanics.jsx

import React, { useEffect, useRef, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Machanic from '../Machanic/Machanic';
import { useReactToPrint } from 'react-to-print';
import '../Machanic Details/Mdetails.css';

const URL = 'http://localhost:4000/machanics';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function Machanics() {
  const [machanics, setMachanics] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setMachanics(data.machanics));
  }, []);

  // PDF download
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: 'Machanic Report',
    onAfterPrint: () => alert('Machanic Report Successfully Downloaded!!'),
    pageStyle: `
      @page {
        margin: 20mm;
      }
      @media print {
        footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          text-align: center;
        }
      }
    `,
  });

  // Current date
  const currentDate = new Date().toLocaleDateString();

  // Search function
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      if (!searchQuery) {
        setMachanics(data.machanics);
        setNoResults(false);
        return;
      }

      const filteredMachanics = data.machanics.filter((machanic) =>
        Object.values(machanic).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setMachanics(filteredMachanics);
      setNoResults(filteredMachanics.length === 0);
    });
  };

  return (
    <div>
      <Nav />
      <center>
        <h1>Machanics Details Display page</h1>
      </center>

      <center>
        <input
          style={{borderRadius:'5px'}}
          className='sBox'
          type="text"
          name="search"
          placeholder="Search Machanic Details"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>

        <button className="search" onClick={handleSearch}>Search</button>
        <button className='report' onClick={handlePrint}>Download Report</button>
      </center>
      
      {noResults ? (
        <div>
          <p>No Machanic Found </p>
        </div>
      ) : (
        <div ref={componentsRef}>
          {machanics &&
            machanics.map((machanic, i) => (
              <div key={i}>
                <Machanic machanic={machanic} />
              </div>
            ))}
        </div>
      )}

      {/* Footer for PDF */}
      <footer>
        <p>Generated on: {currentDate}</p>
      </footer>
    </div>
  );
}
