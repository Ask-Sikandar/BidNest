const db = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.placeBid = async (req, res) => {
    try {
      const { propertyId, amount } = req.body;
      const username = req.decoded.username; // Assuming the username is encoded in the token
  
      // Check if the property exists (additional validation logic)
      const propertyExists = await db.query('SELECT * FROM properties WHERE id = ?', [propertyId]);
      if (propertyExists.length === 0) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Insert the bid into the database
      const newBid = await db.query(
        'INSERT INTO bids (property_id, user_username, amount) VALUES (?, ?, ?)',
        [propertyId, username, amount]
      );
  
      res.status(201).json({ message: 'Bid placed successfully', newBid });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error placing bid' });
    }
  };    