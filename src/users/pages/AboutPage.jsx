import React from 'react'
import { Navbar } from '../components'
export const AboutPage = () => {
  return (

    <>
      <Navbar />
      <section class="py-5">
	<div class="container">
		<div class="row align-items-center gx-4">
			<div class="col-md-5">
				<div class="ms-md-2 ms-lg-5"><img class="img-fluid rounded-3" src="https://viveloensaltillo.com/wp-content/uploads/2021/11/1254x851usts-768x521.png"/></div>
			</div>
			<div class="col-md-6 offset-md-1">
				<div class="ms-md-2 ms-lg-5 d-flex justify-content-center align-items-center flex-column">
          <section>
            <h2>Nuestra Misión</h2>
            <p>En nuestro equipo, conformado por estudiantes entusiastas, nos hemos unido con un propósito: crear una plataforma de hosting de contenido de materias que rompa las barreras del acceso al conocimiento. Nos mueve la convicción de que todos tienen derecho a una educación de calidad, independientemente de su ubicación geográfica o situación económica.</p>
        </section>
        <hr />
        
        <section>
            <h2>Nuestro Compromiso</h2>
            <p>Nuestra misión es facilitar el intercambio de recursos educativos entre estudiantes, profesores y profesionales, fomentando así un ambiente de aprendizaje colaborativo y enriquecedor. Creemos firmemente en el poder de la comunidad para impulsar el progreso y el desarrollo individual y colectivo.</p>
        </section>
        <hr />

        <section>
            <h2>Únete a Nosotros</h2>
            <p>Únete a nosotros en este emocionante viaje hacia la democratización del conocimiento. Juntos, podemos construir un mundo donde el aprendizaje sea accesible para todos y donde la colaboración sea la clave para alcanzar el éxito.</p>
        </section>
        <hr />

        	</div>
			</div>
		</div>
	</div>
</section>
      </>
  )
}
