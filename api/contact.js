// Serverless function for contact form
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, email, message, vehicleInfo } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Here you would typically:
    // 1. Send email using a service like SendGrid, Nodemailer, etc.
    // 2. Save to database
    // 3. Send confirmation email
    
    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      message,
      vehicleInfo,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        name,
        email,
        submittedAt: new Date().toISOString()
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}