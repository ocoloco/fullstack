const Notificacion = ({ message, type }) => {
  let res = "";
  switch (type) {
    case 0:
      res = null;
      break;
    case 1: res = (
      <div className="error">
        {message}
      </div>);
      break;
    case 2: res = (
      <div className="success">
        {message}
      </div>);
      break;
  }
  return res;
}

export default Notificacion
