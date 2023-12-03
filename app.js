const express= require('express');
const router = require('./routes/index');

const app=express();
app.use(express.json());
app.use("/", router);
const db = require('./config');



  
//   app.post('/search-property', (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, 'secret', (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//       const filters = req.body;
//       const query = `SELECT * FROM properties WHERE name LIKE '% ${filters.name}%' AND description LIKE '%${filters.description}%' AND bedrooms = ${filters.bedrooms} AND bathrooms = ${filters.bathrooms} AND location LIKE '%${filters.location}%' AND starting_bid >= ${filters.starting_bid} AND end_time <= '${filters.end_time}' AND user_username LIKE '%${filters.user_username}%'`;
//       connection.query(query, (err, results) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error searching properties' });
//         }
//         return res.status(200).json({ properties: results });
//       });
//     });
//   });

//   app.put('/edit-property/:propertyID', (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, 'secret', (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//       const propertyID = req.params.propertyID;
//       const filters = req.body;
//       const query = `SELECT * FROM properties WHERE propertyID = ${propertyID}`;
//       connection.query(query, (err, results) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error searching properties' });
//         }
//         if (results.length === 0) {
//           return res.status(404).json({ message: 'Property not found' });
//         }
//         if (results[0].user_username !== decoded.username) {
//           return res.status(401).json({ message: 'Unauthorized' });
//         }
//         const property = new Property({
//           name: filters.name || results[0].name,
//           description: filters.description || results[0].description,
//           bedrooms: filters.bedrooms || results[0].bedrooms,
//           bathrooms: filters.bathrooms || results[0].bathrooms,
//           location: filters.location || results[0].location,
//           starting_bid: filters.starting_bid || results[0].starting_bid,
//           end_time: filters.end_time || results[0].end_time,
//           user_username: filters.user_username || results[0].user_username,
//         });
//         const updateQuery = `UPDATE properties SET name = '${property.name}', description = '${property.description}', bedrooms = ${property.bedrooms}, bathrooms = ${property.bathrooms}, location = '${property.location}', starting_bid = ${property.starting_bid}, end_time = '${property.end_time}', user_username = '${property.user_username}' WHERE propertyID = ${propertyID}`;
//         connection.query(updateQuery, (err, result) => {
//           if (err) {
//             return res.status(500).json({ message: 'Error updating property' });
//           }
//           return res.status(200).json({ message: 'Property updated successfully' });
//         });
//       });
//     });
//   });


app.listen(3000,()=>{
    console.log("server has started on port 3000");
})