const Manga = require('./manga.model');
const {setError } = require('../../helpers/error');


const getAll =  async (req, res, next) => {
    try {
        const manga = await Manga.find();
        return  res.json({
            status:200,
            message: 'Recover all manga',
            data: { manga }
        });

    }
    catch (error) {
        return next(setError(500, 'Failed manga All Recover'))

    }
}

const getByID = async ( req, res, next) => {
    try{
        const {id} = req.params; 
        const manga = await Manga.findById(id);
        if (!manga) return next(setError(404, 'manga no found'));
        return res.json({
            status:200,
            message:'Recover Manga by ID',
            data: {manga}
        });
    }
    catch (error) {
        return next(setError(500, 'Failed Manga'))

    }
}

//Definimos la función que nos permitirá crear un nuevo elemento
const create = async (req, res, next) => {
    try {
        const manga= new Manga(req.body)
        const mangaInBd = await manga.save()
        return res.json({
            status: 201,
            message: 'Created new anime',
            data: { manga: mangaInBd }
        });
    } catch (error) {
        return next(setError(500, 'Failed created Manga'))
    }
}

//Definimos la función que nos permitirá actualizar un elemento mediante su id
const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const manga = new Manga(req.body)
        manga._id = id;
        const updatedManga = await Manga.findByIdAndUpdate(id, manga)
        if (!updatedManga) return next(setError(404, 'Code not found'))
        return res.json({
            status: 201,
            message: 'Updated element',
            data: {  manga: updatedManga }
        });
    } catch (error) {
        return next(setError(500, 'Failed updated manga'));
    }
}

//Definimos la función que nos permitirá borrar un elemento mediante su id
const deleteElement = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedManga = await Manga.findByIdAndDelete(id)
        if (!deletedManga) return next(setError(404, 'Manga not found'))
        return res.json({
            status: 200,
            message: 'deleted manga',
            data: { anime: deletedManga}
        });
    } catch (error) {
        return next(setError(500, 'Failed deleted manga'));
    }
}



module.exports = {
    getAll, 
    getByID,
    create,
    update,
    deleteElement
};