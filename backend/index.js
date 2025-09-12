import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

  const visitorPassSchema = new mongoose.Schema({
    name: String,
    b2bOrB2c: String,
    mobile: String,
    email: String,
    category: String,
    numberOfPerson: Number,
    registrationCode: String,
    createdAt: { type: Date, default: Date.now },
  });

  const VisitorPass = mongoose.model('VisitorPass', visitorPassSchema, 'visitorpasses');

const contactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const sponsorSchema = new mongoose.Schema({
  name: String,
  businessName: String,
  city: String,
  contactNumber: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const bookStallSchema = new mongoose.Schema({
  fullName: String,
  businessName: String,
  city: String,
  contactNumber: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema, 'contacts');
const Sponsor = mongoose.model('Sponsor', sponsorSchema, 'sponsors');
const BookStall = mongoose.model('BookStall', bookStallSchema, 'bookstalls');

// Contact Us endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/contact', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// Sponsor Become endpoint
app.post('/api/sponsor', async (req, res) => {
  try {
    const sponsor = new Sponsor(req.body);
    await sponsor.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/sponsor', async (req, res) => {
  const sponsors = await Sponsor.find().sort({ createdAt: -1 });
  res.json(sponsors);
});

// Book Stall endpoint
app.post('/api/bookstall', async (req, res) => {
  try {
    const bookStall = new BookStall(req.body);
    await bookStall.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/bookstall', async (req, res) => {
  const bookstalls = await BookStall.find().sort({ createdAt: -1 });
  res.json(bookstalls);
});

  // Visitor Pass endpoint
  app.post('/api/visitorpass', async (req, res) => {
    try {
      const visitorPass = new VisitorPass(req.body);
      await visitorPass.save();
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get('/api/visitorpass', async (req, res) => {
    const visitorpasses = await VisitorPass.find().sort({ createdAt: -1 });
    res.json(visitorpasses);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
