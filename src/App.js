import React, { useState, useEffect } from 'react';
import orderBy from 'lodash'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from 'react-bootstrap'

function App() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [count, setCount] = useState(0)
  const [autorefresh, setAutorefresh] = useState(true)
  const [autorefresh1, setAutorefresh1] = useState(false)
  const [rangevalue, setRangeValue] = useState(10)
  const [checkres, setCheckres] = useState(false)

  async function fetchReddit() {
    
    const response = await fetch(`https://www.reddit.com/r/destiny2/new.json?limit=50`);
    const json = await response.json()

    setData(json.data.children)  
    setLoad(false)
  };

  async function addFetch(name) {
    setLoad(true)
    console.log(name)
    const response = await fetch(`https://www.reddit.com/r/destiny2/new.json?limit=50&after=${name}`);
    const json = await response.json()

    setData(json.data.children)  
    setLoad(false)
  };

  async function backFetch(name) {
    console.log(name)
    setLoad(true)
    const response = await fetch(`https://www.reddit.com/r/destiny2/new.json?limit=50&before=${name}`);
    const json = await response.json()

    setData(json.data.children)  
    setLoad(false)
  };

  useEffect(() => {
    fetchReddit()
    
    // setLastname(data[4].data.name) 

  }, [count])



  let recfresh = () => {
    setTimeout(() => {
      setCount(count + 1)
      console.log(count)
      setAutorefresh(true)
    }, 10000);
  }
  if (autorefresh1) {
    if (autorefresh) {

      setAutorefresh(false)
      recfresh()
    }
  }
  return (
    <div className="App">
    {load?   <Spinner animation="border" />
 
        : 
        <div className='Container'>


          <div className='main'>
         
            <button onClick={()=>backFetch(data[0].data.name)}>Back</button>   <button onClick={()=>addFetch(data[data.length-1].data.name)}>NextPage</button>            <button onClick={() => setAutorefresh1(!autorefresh1)} >{!autorefresh1 ? 'Start' : 'Stop'} Auto-refresh </button>
            <input onChange={e => { setRangeValue(e.target.value); setCheckres(false) }} max='2000' value={rangevalue} type='range' />
            <div>{rangevalue}</div>
          
            {data.sort((a, b) => b.data.ups - a.data.ups).map(el =>

              <div className='block'>

                {el.data.is_self == false & el.data.is_reddit_media_domain ? <div>  {el.data.ups >= rangevalue
                  ?

                  <div >


                    {checkres == false && setCheckres(true)}
                    <a href={`https://www.reddit.com/${el.data.permalink}`}>
                      {console.log(el.data)}
                      {el.data.is_video
                        ?


                        <video controls="controls" loop="loop" autoPlay muted autoplay="autoplay" >
                          <source src={el.data.media.reddit_video.fallback_url} />
                          <source src=''/>
                         
                        </video>

                        :

                        <img src={el.data.url} />

                      }
                    </a>
                    <div>
                      <div> <strong> {el.data.title}</strong></div>
                      <p></p>
                      <div> Кол-во лайков: {el.data.ups} </div>
                      <p></p>
                    </div>
                  </div>
                  : ''
                }</div> : <div>
                    {el.data.ups >= rangevalue
                      ? <div> <div> <strong> {el.data.title}</strong></div>
                        <p></p>
                        {checkres == false && setCheckres(true)}
                        <div> Кол-во лайков: {el.data.ups} </div>
                        <p></p> </div> : <div> </div>} </div>}


              </div>)}


          </div>


                    </div>  } 
      <div className='static'>
        <p></p>
        <div >{checkres == false & load == false ? 'Нехуz не найдено' : null} </div>
      </div>
    </div>
  );
}

export default App;
