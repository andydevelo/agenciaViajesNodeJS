import { Viajes } from "../models/Viajes.js";
import { Testimonial } from '../models/Testimoniales.js'

const paginaInicio = async (req, res, next) => {
    const promiseDB = []
    promiseDB.push(Viajes.findAll({ limit: 3 }))
    promiseDB.push( Testimonial.findAll({ limit: 3 }) )
    // consultar viajes del modelo viaje
    try {
       const resultado = await Promise.all(promiseDB)
        res.render("inicio", {
          title: "Inicio",
            pagina: "Inicio",
            clase: 'home',
            viajes : resultado[0],
          testimonios : resultado[1]
        });
        
    } catch (error) {
        
    }
   return next()
};
const paginaNosotros = (req, res , next) => {
    res.render("nosotros", {
        title: "Nosotros",
        pagina: "Nosotros",
    });
    return next()
};
const paginaViajes = async (req, res , next) => {
     // consultar a db
    const viajes = await Viajes.findAll();
    res.render("viajes", {
        title: "Viajes",
        pagina: "Proximos Viajes",
        viajes
    });
    return next()
};
const paginaTestimoniales = async (req, res , next) => {
    try {
        const testimonios = await Testimonial.findAll()

        res.render("testimoniales", {
          title: "Testimoniales",
            pagina: "Testimoniales",
            testimonios
          
        });
     } catch (error) {
        console.log(error)
     }
};

// nuestra paginaDetalleViaje
const paginaDetalleViaje = async (req, res, next) => {
    const { viaje } = req.params;
     try {
        const resultado = await Viajes.findOne({ where: { slug: viaje } });
        res.render("viaje", {
            title: "Informacion Viaje",
             pagina: "Informacion Viaje",
            resultado,
         });
    } catch (error) {
        console.log(error);
     }
    return next()
};




export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}