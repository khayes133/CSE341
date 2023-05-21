const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const express = require('express');
const app = express();

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};


const createContact = async (req, res) => {
  const body = req.body; 
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const result = await mongodb.getDb().db("CSE341").collection("contacts").insertOne(body);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json('Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const body = req.body;
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (error) {
    res.status(500).json(error.message || 'An error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Contact not found.');
    }
  } catch (error) {
    res.status(500).json(error.message || 'An error occurred while deleting the contact.');
  }
};

module.exports = { 
    getAll, 
    getSingle, 
    createContact,
    updateContact, 
    deleteContact
};
