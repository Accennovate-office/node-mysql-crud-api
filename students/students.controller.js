const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const studentService = require('./student.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    studentService.getAll()
        .then(students => res.json(students))
        .catch(next);
}

function getById(req, res, next) {
    studentService.getById(req.params.id)
        .then(student => res.json(student))
        .catch(next);
}

function create(req, res, next) {
    studentService.create(req.body)
        .then(() => res.json({ message: 'Student created' }))
        .catch(next);
}

function update(req, res, next) {
    studentService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Student updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    studentService.delete(req.params.id)
        .then(() => res.json({ message: 'Student deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        rollno: Joi.number().required(),
        gender: Joi.string().required(),
        dob: Joi.date().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        rollno: Joi.number().empty(''),
        gender: Joi.string().empty(''),
        dob: Joi.date().empty(''),
    });
// }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
