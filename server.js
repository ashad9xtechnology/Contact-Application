const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (we'll add the connection string later)
mongoose.connect('mongodb+srv://ashadashraf10:PhhFUEIksePCQ0Ae@cluster0.agqoc6b.mongodb.net/contactDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Contact model
const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  message: String,
});

// API routes
app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/api/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});