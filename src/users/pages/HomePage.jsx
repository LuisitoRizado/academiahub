import { useEffect, useState } from "react"
import { json } from "react-router-dom"
import { CarreraComponent } from "../components/CarreraComponent"
import { User, useAuth0 } from "@auth0/auth0-react"
import { Navbar } from "../components"
import icon1 from '../../assets/CarrerasIcons/1.png'
import { FaComputer } from "react-icons/fa6";
export const HomePage = () => {
  //Use auth
  const { userHook } = useAuth0()
  const [carreras, setCarreras] = useState([]);
  const getAllCarreras = async () => {
    try {
      const response = await fetch('https://webapi-fsva.onrender.com/carreras/');
      const data = await response.json();
      setCarreras(data); // Establecemos el estado con el array de carreras
      console.log(data);
    } catch (error) {
      console.log('Solicitud fallida: ' + error);
    }
  }

  useEffect(() => {
    getAllCarreras();
  }, []);

  return (

    <div>
      <Navbar />
      <br />
      <h4 className="mx-4">Selecciona tu carrera</h4>
      <br />
      <div className="containerCarreras row d-flex justify-content-center align-items-center">
        {/* Verificamos si carreras es un array antes de usar map */}
        {Array.isArray(carreras) && carreras.map(carrera => (
          <CarreraComponent
            key={carrera.idCarrera} // Agregamos una clave única
            className='col'
            id={carrera.idCarrera}
            carrera={carrera.carrera}
            icon={'https://cdn-icons-png.flaticon.com/256/2861/2861721.png'}
          />
        ))}
      </div>
      <div>

      </div>
    </div>
  )
}
