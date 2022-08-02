const MangaRoutes = require('Express').Router();
const {
    getAll,
    getByID,
    create,
    update,
    deleteElement } = require('./manga.controller');



MangaRoutes.get('/', getAll);
MangaRoutes.get('/:id', getByID);
MangaRoutes.post('/', create)
MangaRoutes.patch('/:id', update)
MangaRoutes.delete('/:id', deleteElement)

module.exports = MangaRoutes;