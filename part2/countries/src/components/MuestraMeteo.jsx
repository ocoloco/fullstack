const MuestraTiempo = ({tiempo}) => {
    if (tiempo==="E"){
        return(
            ///Country ej: Eswatini not found
            <div>This Country has not meteo data</div>
        )
    }else if (tiempo!== undefined) {
        return(
        <div>
            <h2> Weather of {tiempo.location.name}</h2>
            <p> temperature: <b>{tiempo.current.temp_c} °C</b> feels like: <b>{tiempo.current.feelslike_c} °C</b></p>
            <p> <img className="meteo" alt={tiempo.current.condition.text} src={tiempo.current.condition.icon} width="100" height="100"></img></p>
            <p> wind: <b> {tiempo.current.wind_kph} km/h {tiempo.current.wind_dir} </b> </p>
        </div>
        )
    }       
}


export default MuestraTiempo