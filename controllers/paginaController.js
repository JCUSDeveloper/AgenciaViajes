import { Viaje } from "../models/Viaje.js";
import { Testimonial } from '../models/Testimoniales.js'

const paginaInicio = async (req, res) => {



    const consultasDB = [];
    
    consultasDB.push(Viaje.findAll({limit: 3}))
    consultasDB.push(Testimonial.findAll({limit: 3}));

    try {
        
        const resultado = await Promise.all(consultasDB);

        res.render('inicio', {
            pagina:"Inicio",
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
        
    }
}

const paginaNosotros = (req, res) => {

    res.render('nosotros', {pagina:'Nosotros'} );
}

const paginaViajes = async (req, res) => {

    const viajes = await Viaje.findAll();

    console.log(viajes);
    

    res.render('viajes', {pagina:'Proximos Viajes', viajes} );
}

const paginaTestimoniales = async (req, res) => {

    try{
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {pagina:'Testimoniales', testimoniales});
    }catch(error){
        console.log(error);
        
    }

}

//Muestra un viaje por su slug
const paginaDetalleViaje= async (req, res)=>{

    const { viaje } = req.params;
    
    console.log(viaje);

    try{
        const resultado = await Viaje.findOne({ where : { slug: viaje } } );

        res.render('viaje',{
            pagina:'Informacion Viaje',
            resultado
        });
    }catch(error){
        console.log(error);
        
    }
    
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}