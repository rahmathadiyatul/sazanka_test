import * as React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CardBody from './Components/CardBody';
import Button from '@mui/material/Button';

function App() {
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [resultCard, setResultCard] = useState(false);
  const [kelompokBilangan, setKelompokBilangan] = useState('');
  const [target, setTarget] = useState(' ');
  const [calculatedResult, setCalculatedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showInstruction2, setShowInstruction2] = useState(false);
  const [textColor, setTextColor] = useState('blue');
  const [textMsg, setTextMsg] = useState('Silakan masukkan kelompok angka dipisahkan oleh spasi.');
  const [textMsg2, setTextMsg2] = useState('Mohon isi data yang sesuai.');
  const [isValid, setIsValid ] = useState(false)
  const [isValid2, setIsValid2 ] = useState(false)

  const handleOnClick = () => {
    setIsOpenCard(true); 
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const result = calculateResult(kelompokBilangan, target);
      setCalculatedResult(result);
      setLoading(false);
      setResultCard(true);
    }, 1500); 
  };

  const handleClose = () => {
    setResultCard(false);
  };

  const handleCloseCard = () => {
    setIsOpenCard(false);
    setResultCard(false);
  };
  
  const handleKelompokBilangan = (e) => {
    const input = e.target.value;
    setKelompokBilangan(input);
    if (/^[0-9\s]*$/.test(input)) {
      setTextColor('blue');
      setTextMsg('Silakan masukkan kelompok angka dipisahkan oleh spasi.');
      if (target != null){
        setIsValid(true);
      }
    } else {
      setTextColor('red');
      setTextMsg('Mohon isi data yang sesuai.');
      setIsValid(false);
    }
  };

  const handleTarget = (e) => {
    const input = e.target.value;
    setTarget(input);
    if (/^[0-9\s]*$/.test(input)) {
      setTextMsg2('Silakan masukkan target angka yang diinginkan.');
      if (target != null){
        setIsValid2(true);
      }
    } else {
      setTextMsg2('Mohon isi data yang sesuai.');
      setIsValid2(false);
    }
  };

  const calculateResult = (kelompok, target) => {
    target = parseInt(target.trim(), 10);
    const kelompokArray = kelompok.split(' ').map(item => parseInt(item.trim(), 10));
    let result = [];
    let temp = [];
    for (let i=0; i<kelompokArray.length; i++){
      for (let j = i + 1; j < kelompokArray.length; j++) {
        if (i!=j){
          let arr = [];
          if (kelompokArray[i] + kelompokArray[j] == target){
            arr.push(i);
            arr.push(j);
            if (!temp.includes(arr)){
              temp.push(arr);
              arr = '['+arr+']';
              result.push(arr);
            }
          }
        }
      }
    }
    if (temp.length > 0){
      return (
        <>
          <div className='result-card'>
            <h4>Index Pasangan</h4>
            <p>Index pasangan dengan input:</p>
            <p>- Target: {target}</p>
            <p>- Kelompok Bilangan: <br/>[{kelompokArray.join(', ')}]</p>
            <p>adalah <b>[{result.join(', ')}]</b></p>
            <button className="submit-button" onClick={handleClose}>Close</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className='result-card' style={{alignItems:'center'}}>
            <h4>Index Pasangan</h4>
            <p style={{color: 'red', textAlign:'center', fontSize:'.75em'}}>Tidak ditemukan pasangan dari kelompok bilangan dengan jumlah total sesuai target!</p>
            <button className="submit-button" onClick={handleClose}>Close</button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!isOpenCard && <CardBody />}
        <div style={{ display: 'flex', gap:'3em' }}>
        {isOpenCard && (
            <div className="card">
              <button className="close-card" onClick={handleCloseCard}>X</button>
              <div className="card-field">
                <label>Kelompok Bilangan: </label>
                <input
                  type="text"
                  value={kelompokBilangan}
                  onFocus={() => setShowInstruction(true)}
                  onBlur={() => setShowInstruction(false)}
                  onChange={ handleKelompokBilangan }
                />
                {showInstruction && (
                  <span className="instruction-text" style={{color:textColor}}>
                    {textMsg}
                  </span>
                )}
              </div>
              <div className="card-field">
                <label>Target: </label>
                <input
                  type="text"
                  value={target}
                  onFocus={() => setShowInstruction2(true)}
                  onBlur={() => setShowInstruction2(false)}
                  onChange={ handleTarget }
                />
                {showInstruction2 && (
                  <span className= {!isValid2 ? "instruction-text3" : "instruction-text2"}>
                    { textMsg2 }
                  </span>
                )}
              </div>
              <button disabled={!isValid || !isValid2} className={ isValid && isValid2 ? "submit-button" : "disabled-button"} onClick={handleSubmit}>Submit</button>
              {loading && <div className="loading-bar"></div>}
            </div>
          )}
          {resultCard && (
            <div>
              {calculatedResult}
            </div>
          )}
        </div>
        {!isOpenCard && (
          <Button onClick={handleOnClick} size='large' variant="contained">
            Mulai
          </Button>
        )}
      </header>
    </div>
  );
}

export default App;
