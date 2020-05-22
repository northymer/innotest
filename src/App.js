import React, { useEffect, useState } from 'react';
import './App.scss';
import { ReactComponent as Star } from './assets/start.svg'
import { ReactComponent as Fork } from './assets/fork.svg'

const fetchList = async ({ language }) => {
  const response = await fetch(`https://api.github.com/search/repositories?sort=stars&order=desc&q=language:${language}+created`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  console.log(data)
  return data
}

const fetchLanguageList = async () => {
  const response = await fetch(`https://api.github.com/languages`)
  const data = await response.json()

  return data
}

function App() {
  const [language, setLanguage] = useState('any')
  const [langList, setLangList] = useState([])
  const [itemsData, setItems] = useState({
    incomplete_results: false,
    items: [],
    total_count: 0
  })
  const { incomplete_results, items, total_count } = itemsData
  useEffect(() => {
    fetchList({language})
      .then(res => setItems(res))
  }, [language])
  useEffect(() => {
    fetchLanguageList()
        .then((res) => setLangList(res))
  }, [])
  return (
    <div className="App">
      <div className="List">
        <div className='row'>
        <div className='col'>
          <div className='List__header'>
          <div className="row">
            <div className="col-4">
              <button className="Button">Repositories</button>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col">
                  <div>
                    <select id="lang" value={language} onChange={e => setLanguage(e.target.value)}>
                      <option value='any'>Any</option>
                      {
                        langList.map(item => (
                          <option key={item.name} value={item.aliases[0]}>{item.name}</option>
                        ))
                      }

                    </select>
                  </div>
                </div>

              </div>
            </div>

          </div>
          </div>
          <div className="List__body">
            {
              items.map(item => (
                  <div key={item.id} className="List__item">
                    <div className='col'>
                      <div className='row'>
                        <a href={item.url}>{item.full_name.split('/').join(' / ')}</a>
                        <button className="Button"><Star/> Star</button>
                      </div>
                      <div className='row'>
                        <p className="List__item_description">
                          {item.description}
                        </p>
                      </div>
                      <div className='row'>
                        <div className="col">
                          <div className='row' style={{'justify-content': 'flex-start'}}>
                            <p className="List__item_subitem">{item.language}</p>
                            <p className="List__item_subitem">
                              <Star/>
                              {item.stargazers_count}
                            </p>
                            <p className="List__item_subitem">
                              <Fork/>
                              {item.forks_count}
                            </p>
                          </div>
                        </div>
                        <div className="col">

                        </div>
                      </div>
                    </div>
                  </div>

              ))
            }
          </div>
        </div>
        </div>
      
      </div>


      </div>
  );
}

export default App;
