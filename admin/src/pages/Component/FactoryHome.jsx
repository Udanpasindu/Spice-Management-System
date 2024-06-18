import React from 'react';
import Nav from './Nav/Nav';
import '../Component/FactoryHomeCss/Fac.css';

export default function FactoryHome() {
  return (
    <div>
      <Nav />
      <div className='bg'>
        <h1 style={{ color: 'ActiveCaption', fontSize: '60px', textAlign: 'center', borderBottom: '8px solid #FF5733', paddingBottom: '10px' }}>
          SAHAN SPICE FACTORY MANAGEMENT SYSTEM</h1>
        <center>
          <br></br> <br></br> <br></br>
          <p className='pp'>
            As the Factory Manager of<br></br> SAHAN SPICE FACTORY MANAGEMENT SYSTEM <br></br> I oversee the efficient operation of our factory.
            My responsibilities include managing utility bills, ensuring proper functioning of machines, and supervising the work of mechanics.
            With careful management and attention to detail, we strive to maintain the highest standards of productivity and quality in our factory operations.
          </p>
        </center>
      </div>
    </div>
  );
}
