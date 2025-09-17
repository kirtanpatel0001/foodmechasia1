import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import nodemailer from 'nodemailer';
// Setup Nodemailer transporter (using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'marketing.foodmechasia@gmail.com',
    pass: process.env.EMAIL_PASS || 'your_app_password_here', // Use App Password for Gmail
  },
});

const sendNotificationEmail = async (subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER || 'marketing.foodmechasia@gmail.com',
    to: 'marketing.foodmechasia@gmail.com',
    subject,
    html,
  });
};

// Modern email template generator
function getModernEmailTemplate({ title, details }) {
  return `
    <div style="background:#f7f7f7;padding:32px 0;font-family:Arial,sans-serif;">
      <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;box-shadow:0 2px 8px #e0e0e0;padding:32px 24px;">
        <div style="text-align:center;margin-bottom:24px;">
          <img src='https://foodmechasia1.onrender.com/LOGO/LOGO.png' alt='FoodMechAsia Logo' style='height:64px;margin-bottom:8px;border-radius:8px;' />
          <h2 style="color:#2e7d32;font-size:1.6em;margin:0 0 8px 0;">${title}</h2>
        </div>
        <div style="font-size:1em;color:#333;line-height:1.7;">
          ${details}
        </div>
        <div style="margin-top:32px;text-align:center;color:#888;font-size:0.9em;">
          FoodMechAsia | marketing.foodmechasia@gmail.com
        </div>
      </div>
    </div>
  `;
}


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());


const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }).then(() => {
    console.log('MongoDB connected successfully');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
    setTimeout(connectWithRetry, 5000);
  });
};
connectWithRetry();

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
app.post('/api/contact', async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    // Send email notification with modern design
    const details = `
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Mobile:</strong> ${contact.mobile}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Message:</strong> ${contact.message}</p>
    `;
    const html = getModernEmailTemplate({ title: 'New Contact Submission', details });
    await sendNotificationEmail('New Contact Submission', html);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});
app.get('/api/contact', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// Sponsor Become endpoint
app.post('/api/sponsor', async (req, res, next) => {
  try {
    const sponsor = new Sponsor(req.body);
    await sponsor.save();
    // Send email notification with modern design
    const details = `
      <p><strong>Name:</strong> ${sponsor.name}</p>
      <p><strong>Business Name:</strong> ${sponsor.businessName}</p>
      <p><strong>City:</strong> ${sponsor.city}</p>
      <p><strong>Contact Number:</strong> ${sponsor.contactNumber}</p>
      <p><strong>Email:</strong> ${sponsor.email}</p>
      <p><strong>Message:</strong> ${sponsor.message}</p>
    `;
    const html = getModernEmailTemplate({ title: 'New Sponsor Submission', details });
    await sendNotificationEmail('New Sponsor Submission', html);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});
app.get('/api/sponsor', async (req, res) => {
  const sponsors = await Sponsor.find().sort({ createdAt: -1 });
  res.json(sponsors);
});

// Book Stall endpoint
app.post('/api/bookstall', async (req, res, next) => {
  try {
    const bookStall = new BookStall(req.body);
    await bookStall.save();
    // Send email notification with modern design
    const details = `
      <p><strong>Full Name:</strong> ${bookStall.fullName}</p>
      <p><strong>Business Name:</strong> ${bookStall.businessName}</p>
      <p><strong>City:</strong> ${bookStall.city}</p>
      <p><strong>Contact Number:</strong> ${bookStall.contactNumber}</p>
      <p><strong>Email:</strong> ${bookStall.email}</p>
      <p><strong>Message:</strong> ${bookStall.message}</p>
    `;
    const html = getModernEmailTemplate({ title: 'New Book Stall Submission', details });
    await sendNotificationEmail('New Book Stall Submission', html);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});
app.get('/api/bookstall', async (req, res) => {
  const bookstalls = await BookStall.find().sort({ createdAt: -1 });
  res.json(bookstalls);
});

  // Visitor Pass endpoint
  app.post('/api/visitorpass', async (req, res, next) => {
    try {
      const visitorPass = new VisitorPass(req.body);
      await visitorPass.save();
      res.status(201).json({ success: true });
    } catch (err) {
      next(err);
    }
  });
  app.get('/api/visitorpass', async (req, res) => {
    const visitorpasses = await VisitorPass.find().sort({ createdAt: -1 });
    res.json(visitorpasses);
  });


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
