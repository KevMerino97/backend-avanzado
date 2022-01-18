'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// /api/tags
// return tags list
router.get('/', async (req, res, next) => {
    try {
        const anunciosTags = await Anuncio.distinct('tags');
        res.json({ taglist: anunciosTags });
    } catch (err) {
        next(err);
    }
});

module.exports = router;