import React, { useEffect, useRef, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import AddMachine from '../Machine/AddMachine';
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:4000/machins";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Machines() {
  const [machins, setMachins] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setMachins(data.machins));
  }, []);

  // PDF download
  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: 'Machine Report',
    onAfterPrint: () => alert('Machine Report Successfully Downloaded!!'),
  });

  // Search function
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      if (!searchQuery) {
        setMachins(data.machins);
        setNoResults(false);
        return;
      }

      const filteredMachins = data.machins.filter((machin) =>
        Object.values(machin).some((field) => {
          if (field !== null && field !== undefined) {
            return field.toString().toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        })
      );
      setMachins(filteredMachins);
      setNoResults(filteredMachins.length === 0);
    });
  };

  return (
    <div>
      <Nav />
      <center>
        <h1>Machine Details Display page</h1>
        <br></br><br></br><br></br>
        <input
          type="text"
          name="search"
          placeholder="Search Machine ..."
          value={searchQuery}
          style={{width : '200px',height:'25px'}}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginRight: '10px', padding: '5px', backgroundColor: '#174FD0', border: 'none', color: 'white', borderRadius: '5px' ,width:'80px',height:'35px'}}>Search</button>
        <button onClick={handlePrint} style={{ padding: '5px', backgroundColor: '#008CBA', border: 'none', color: 'white', borderRadius: '5px',height:'35px' }}>Download Report</button>

      </center>
      <br></br>

      {noResults ? (
        <div>
          <p>No machines Found</p>
        </div>
      ) : (
        <div ref={componentsRef}>
          {machins && machins.map((machin, i) => (
             <AddMachine key={i} machin={machin}  />
          ))}
        </div>
      )}
    </div>
  );
}

export default Machines;

///
