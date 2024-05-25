import ShowPais from './Pais'

const MuestraPais = ({pais,binput, handler}) => {
    if (binput){
        let res = pais.length
        if (res > 10){
            return <div>Too many matches ({res}), specify another filter.</div>
        }
        if (res>1 && res <= 10){
            return(
            <div> 
            {pais.map(p => <p key={p.name.common}>
                {p.name.common} <button value={p.name.common} onClick={handler}>Show</button></p>)}
            </div>
            )
        }
        if (res === 1){
            return <ShowPais pais={pais[0]}/>
        }
        if (res === 0)
            return <div> No data </div>
    }
    if (pais.length>0)
        return <div>There are {pais.length} countries</div>
}

export default MuestraPais