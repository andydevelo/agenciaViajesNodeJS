import { Testimonial } from '../models/Testimoniales.js';

export const guardarTestimonial = async (req, res) => {
    // validar campos
    const { nombre, correo, mensaje } = req.body;

    const errores = [];
    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre está vacío' });
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo está vacío' });
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje está vacío' });
    }
     
    if (errores.length > 0) {

        const testimonios = await Testimonial.findAll()
        res.render('testimoniales', {
            nombrePagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })
    } else {
        // almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
     


}