const express = require('express');
const Carro = require('../models/Carro');
const router = express.Router();

// Criar um novo carro
router.post('/', async (req, res) => {
    try {
        const carro = new Carro(req.body);
        await carro.save();
        res.status(201).send(carro);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Listar todos os carros
router.get('/', async (req, res) => {
    try {
        const carros = await Carro.find();
        res.status(200).send(carros);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obter um carro por ID
router.get('/:id', async (req, res) => {
    try {
        const carro = await Carro.findById(req.params.id);
        if (!carro) return res.status(404).send();
        res.status(200).send(carro);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Atualizar um carro por ID
router.put('/:id', async (req, res) => {
    try {
        const carro = await Carro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!carro) return res.status(404).send();
        res.status(200).send(carro);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Deletar um carro por ID
router.delete('/:id', async (req, res) => {
    try {
        const carro = await Carro.findByIdAndDelete(req.params.id);
        if (!carro) return res.status(404).send();
        res.status(200).send(carro);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
