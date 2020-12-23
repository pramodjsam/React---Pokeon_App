import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [pokedex,setPokedex]=useState([]);
  const [wildPokemon,setWildPokemon]=useState({});

  useEffect(()=>{
    encounterWildPokemon();
  },[])

  const pokeId=()=>{
    const min=Math.ceil(1);
    const max=Math.floor(151);
    return Math.floor(Math.random()*(max-min+1))+min;
  }

  const catchPokemon=(pokemon)=>{
    setPokedex(state=>{
      const monExists=(state.filter(p=>pokemon.id===p.id).length>0)
      if(!monExists){
        state=[...state,pokemon];
        state.sort(function(a,b){
          return a.id-b.id;
        })
      }
      return state
    })
    encounterWildPokemon();
  }

  const releasePokemon=(id)=>{
    setPokedex((state)=>(
      state.filter((pokemon)=>pokemon.id!==id)
    ))
  }

  const encounterWildPokemon=()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId()}`)
      .then((response)=>{
        console.log(response.data);
        setWildPokemon(response.data);
      })
  }

  return (
    <div className="app-wrapper">
      <header>
        <h1 className='title'>React Hooks</h1>
        <h3 className='subtitle'>With Pokemon</h3>
      </header>
      <section className='wild-pokemon'>
        <h2>Wild Encounter</h2>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${wildPokemon.id}.png`} 
        alt="poker" className='sprite' />
        <h3>{wildPokemon.name}</h3>
        <button onClick={()=>catchPokemon(wildPokemon)} className='catch-btn'>CATCH</button>
      </section>
      <section className='pokedex'>
        <h2>Pokedex</h2>
        <div className='pokedex-list'>
          {pokedex.map((pokemon)=>(
            <div className='pokemon' key={pokemon.id}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
              alt="pokedex" className='sprite'/>
              <h3 className='pokemon-name'>{pokemon.name}</h3>
              <button onClick={()=>releasePokemon(pokemon.id)} className='remove'>&times;</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
