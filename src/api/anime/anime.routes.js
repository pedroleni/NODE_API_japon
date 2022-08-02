const AnimeRoutes = require('Express').Router();
const {
    getAll,
    getByID,
    create,
    update,
    deleteElement } = require('./anime.controller');



AnimeRoutes.get('/', getAll);
AnimeRoutes.get('/:id', getByID);
AnimeRoutes.post('/', create)
AnimeRoutes.patch('/:id', update)
AnimeRoutes.delete('/:id', deleteElement)

module.exports = AnimeRoutes;