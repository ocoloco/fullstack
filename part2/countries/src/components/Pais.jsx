const ShowPais = ({pais}) => {
     return (
    <div>
        <h2>{pais.name.common}</h2>
        <div>
            Capital: <ul className="comma-list">{pais.capital.map((p,i) =><li key={i} className="comma-list">{p}</li>)}</ul><br/>
            Area: {pais.area} km²
        </div>
        <div><p><b>Languages:</b></p></div>
        <div>
            {Object.values(pais.languages).map((value,index) => 
    <       li key={index}>
                {value}
            </li>
            )}
        </div>
        <div>
            <p><img src={pais.flags.png} width={150} height={100}></img></p>
        </div>
    </div>
    )
}

export default ShowPais