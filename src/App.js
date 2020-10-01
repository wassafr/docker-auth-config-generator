import React, { useEffect, useState } from 'react';

import Result from './components/result';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [minify, setMinify] = useState(true);
  const [stringify, setStringify] = useState(false);
  const [result, setResult] = useState('');
  const [filled, setFilled] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'url') {
      setUrl(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'minify') {
      setMinify(value);
    } else if (name === 'stringify') {
      setStringify(value);
    }
  };

  useEffect(() => {
    const generateResult = () => {
      const data = {
        auths: {
          [url]: {
            username,
            password,
            email,
            auth: btoa(`${username}:${password}`)
          }
        }
      };
      let result = '';

      if (minify) {
        result = JSON.stringify(data);
      } else {
        result = JSON.stringify(data, undefined, 2)
      }

      if (stringify) {
        result = JSON.stringify(result);
        setResult();
      }

      setResult(result);
    };

    generateResult();
    setFilled(url !== '' && username !== '' && password !== '')
  }, [url, username, password, email, stringify, minify])

  const renderResult = () => {
    if (!filled) {
      return (
        <div className="result no-result">
          Fill in all required fields to get results
        </div>
      )
    } else {
      return (
        <div>
          <Result title="Result" id="result" className="mb-3">
            {result}
          </Result>
          <Result title="Result (Base64)" id="result-b64">
            {btoa(result)}
          </Result>
        </div>
      )
    }
  }

  return (
    <div className="page-container">
      <div className="container">
        <header>
          <img className="header-logo" src="/wa.png" alt="Wassa" />
          <h1 className="header-title">&nbsp;+&nbsp;</h1>
          <img className="header-logo" src="/i/do.png" alt="Docker" />
          <h1 className="header-title">&nbsp;=&nbsp;</h1>
          <h1 className="header-title" id="title">Wassa Docker Auth Generator</h1>
        </header>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <h2 className="section-title">1. Configure your registry</h2>
            <div className="registry">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src="/i/bi/globe.svg" alt="" width="16" height="16" title="Bootstrap" />
                  </span>
                </div>
                <input type="text" className="form-control" id="url" name="url" value={url} onChange={handleInputChange}
                  placeholder="my.registry.com:12345" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src="/i/bi/person.svg" alt="" width="16" height="16" title="Bootstrap" />
                  </span>
                </div>
                <input type="text" className="form-control" id="username" name="username" value={username} onChange={handleInputChange}
                  placeholder="Username" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src="/i/bi/lock.svg" alt="" width="16" height="16" title="Bootstrap" />
                  </span>
                </div>
                <input type="text" className="form-control" id="password" name="password" value={password} onChange={handleInputChange}
                  placeholder="Password" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src="/i/bi/at.svg" alt="" width="16" height="16" title="Bootstrap" />
                  </span>
                </div>
                <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleInputChange}
                  placeholder="Email (optional)" />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <h2 className="section-title">2. Choose your generation options</h2>
            <div className="option">
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="minify" name="minify" checked={minify} onChange={handleInputChange} />
                <label className="form-check-label" htmlFor="minify">Minified (no space, no line break)</label>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="stringify" name="stringify" checked={stringify} onChange={handleInputChange} />
                <label className="form-check-label" htmlFor="stringify">Stringified (generate a string instead of a JSON
                            object)</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h2 className="section-title">3. Enjoy</h2>
            {renderResult()}
          </div>
        </div>
      </div>
      <footer className="px-5 mt-2">
        <div>Provided by <a href="https://wassa.io" target="_blank" rel="noopener noreferrer">Wassa</a></div>
        <div>
          <a href="https://github.com/wassafr" target="_blank" rel="noopener noreferrer">
            <img width="24" height="24" src="/i/gh.png" alt="Github" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
