import { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/App.css'
import pokedex from './assets/pokedex.png'
import pokeball from './assets/pokeball_loading.gif'
import { PokeInfo } from './components/PokeInfo/PokeInfo'

function App() {

  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState(null)
  const [selected, setSelected] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  async function fetchData() {
    try {
      const response = await axios.get("https://dev-api-teste.mandarin.com.br/pokemons")

      setData(response.data)
      setSelected(response.data[0])
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  async function handleSearch() {
    try {

      const response = await axios.get(`https://dev-api-teste.mandarin.com.br/pokemons?name=${searchName}`)

      if (response.data.length > 0) {
        setSelected(response.data[0])
        setNotFound(false)
      }
      else {
        setNotFound(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  function changeSelected(pokemon) {
    setSelected(pokemon)
    setNotFound(false)
  }

  function handleInput(input) {
    setSearchName(input.toLowerCase())
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div id="pokedex">
      <img src={pokedex} className='pokedexImage' />
      <div className='wrapper'>
        {
          isLoading ? (
            <>
              <h2 style={{ color: '#fff' }}>Carregando...</h2>
              <img style={{ width: 100 }} src={pokeball} />
            </>
          ) :
            (<>
              <PokeInfo selected={selected} />

              <div className="list">
                <ul>
                  {
                    data.map(pokemon => {
                      return (
                        <li key={pokemon.id} onClick={() => changeSelected(pokemon)}>{pokemon.id} {pokemon.name}</li>
                      )
                    })
                  }
                </ul>
              </div>

              <input className="searchBar" type='text' placeholder='Digite o nome do pokémon...' onChange={(e) => handleInput(e.target.value)}></input>

              <button className="searchButton" onClick={() => searchName != null ? handleSearch() : null}>Buscar</button>

              <span style={{ visibility: notFound ? 'visible' : 'hidden', fontSize: 20, color: '#fff' }}>Pokémon não encontrado.</span>
            </>
            )
        }
      </div>

    </div>
  )
}

export default App
