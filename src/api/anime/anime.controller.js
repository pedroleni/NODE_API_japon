const Anime = require('./anime.model');
const {setError } = require('../../helpers/error');


const getAll =  async (req, res, next) => {
    try {
        const anime = await Anime.find();
        return  res.json({
            status:200,
            message: 'Recover all anime',
            data: { anime }
        });

    }
    catch (error) {
        return next(setError(500, 'Failed anime All Recover'))

    }
}

const getByID = async ( req, res, next) => {
    try{
        const {id} = req.params; 
        const anime = await Anime.findById(id);
        if (!anime) return next(setError(404, 'anime no found'));
        return res.json({
            status:200,
            message:'Recover Anime by ID',
            data: {anime}
        });
    }
    catch (error) {
        return next(setError(500, 'Failed anime'))

    }
}

//Definimos la función que nos permitirá crear un nuevo elemento
const create = async (req, res, next) => {
    try {
        const anime = new Anime(req.body)
        const animeInBd = await anime.save()
        return res.json({
            status: 201,
            message: 'Created new anime',
            data: { anime: animeInBd }
        });
    } catch (error) {
        return next(setError(500, 'Failed created Anime'))
    }
}

//Definimos la función que nos permitirá actualizar un elemento mediante su id
const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const anime = new Anime(req.body)
        anime._id = id;
        const updatedAnime = await Anime.findByIdAndUpdate(id, anime)
        if (!updatedAnime) return next(setError(404, 'Code not found'))
        return res.json({
            status: 201,
            message: 'Updated element',
            data: {  anime: updatedAnime }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated anime'));
    }
}

//Definimos la función que nos permitirá borrar un elemento mediante su id
const deleteElement = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedAnime = await Anime.findByIdAndDelete(id)
        if (!deletedAnime) return next(setError(404, 'Anime not found'))
        return res.json({
            status: 200,
            message: 'deleted element',
            data: { anime: deletedAnime}
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted anime'));
    }
}



module.exports = {
    getAll, 
    getByID,
    create,
    update,
    deleteElement
};