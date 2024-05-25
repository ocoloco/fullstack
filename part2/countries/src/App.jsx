// Ejercicio 2.18, 2.19, 2.20

import { useState, useEffect } from 'react'
import InputLine from './components/InputLine'
import MuestraPais from './components/MuestraPais'
import dbService from './services/db'
import dbMeteo from './services/meteo'
import MuestraMeteo from './components/MuestraMeteo'

//Main
function App() {

  // const states
  const [paises, setPaises] = useState([])
  const [filtro,setFiltro] = useState('')
  const [pais, setPais] = useState([])
  const [tiempo,setTiempo] = useState()

  useEffect(() => {
    dbService
    .getAll()
    .then(initialData => {
      setPaises(initialData)
    })
  }, [])

  useEffect(() => {
    if (pais.length > 0){
      let country = pais[0].name.common
      dbMeteo
      .getWheather(country)
      .then(datatiempo =>{ 
        setTiempo(datatiempo)
      })
      .catch(error => {
        setTiempo("E")
      })
    }
  }, [pais])

  const handleChange = (event) => {
    setFiltro(event.target.value)
    setPais([])
    setTiempo()

  }

  const handleClick = (event) =>{
    setPais([paises.find((p) => p.name.common === event.target.value)])
  }

  useEffect(() => {
    if (filterData.length === 1) { 
      setPais(filterData)
    }
  },[filtro])

  //Check data
  let filterData = (
    (paises.length > 0 ? 
      paises.filter(p => p.name.common.toUpperCase().includes(filtro.toUpperCase()))
      :""))

  return (
    <div>
      <InputLine text=" find countries: " value={filtro} onChange={handleChange} />
      <MuestraPais pais={pais.length === 0 ? filterData : pais} binput={filtro.length? true: false} handler={handleClick} />
      <MuestraMeteo tiempo={tiempo} />
    </div>
  )
}

export default App