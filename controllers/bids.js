const db = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.placeBid = async (req, res) => {
    try {
      const { propertyID, amount } = req.body;
      const email = req.body.user.email; // Assuming the username is encoded in the token
      console.log(email);
      // Check if the property exists (additional validation logic)
      const propertyExists = await db.query('SELECT * FROM properties WHERE propertyID = ?', [propertyID]);
      if (propertyExists.length === 0) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Insert the bid into the database
      await db.query(
        'INSERT INTO bids (property_propertyID, email, bid_amount) VALUES (?, ?, ?)',
        [propertyID, email, amount]
      );
  
      res.status(201).json({ message: 'Bid placed successfully'});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error placing bid' });
    }
  };    
exports.acceptBid = async (req, res) => {
  const email = req.body.user.email;
  const verifysql = `select username from user where email = ?`;
  db.query(verifysql, [email]).then((res) => {
    console.log(res);
    db.query('select user_username from properties where user_username = ?', res).then((result) => {
      
    })
  })
}
