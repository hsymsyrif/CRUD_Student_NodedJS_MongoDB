const express = require('express');
const router = express.Router();
const Prodi = require('../models/prodi');

// Create
router.post('/', async (req, res) => {
    const prodi = new Prodi({
        nama: req.body.nama,
        kode: req.body.kode,
        akreditasi: req.body.akreditasi
    });
    try {
        const savedProdi = await prodi.save();
        res.status(201).json(savedProdi);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const prodis = await Prodi.find();
        res.json(prodis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read by ID
router.get('/:id', getProdi, (req, res) => {
    res.json(res.prodi);
});

// Update
router.patch('/:id', getProdi, async (req, res) => {
    if (req.body.nama != null) {
        res.prodi.nama = req.body.nama;
    }
    if (req.body.kode != null) {
        res.prodi.kode = req.body.kode;
    }
    if (req.body.akreditasi != null) {
        res.prodi.akreditasi = req.body.akreditasi;
    }
    try {
        const updatedProdi = await res.prodi.save();
        res.json(updatedProdi);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', getProdi, async (req, res) => {
    try {
        await res.prodi.deleteOne();
        res.json({ message: 'Deleted Prodi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getProdi(req, res, next) {
    let prodi;
    try {
        prodi = await Prodi.findById(req.params.id);
        if (prodi == null) {
            return res.status(404).json({ message: 'Cannot find prodi' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.prodi = prodi;
    next();
}

module.exports = router;
