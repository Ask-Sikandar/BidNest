const db = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createproperty = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header missing' });
      }
    const token = req.headers.authorization;
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      const property = {
        name: req.body.name,
        description: req.body.description,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        location: req.body.location,
        starting_bid: req.body.starting_bid,
        end_time: req.body.end_time,
        user_username: req.body.user_username,
      };
      console.log(property);
      db.query('INSERT INTO properties SET ?', property, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving property' });
        }
        return res.status(201).json({ message: 'Property created successfully' });
      });
    });
  };
