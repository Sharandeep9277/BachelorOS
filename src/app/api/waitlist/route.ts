// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Types
interface WaitlistData {
  name: string
  email: string
  number: string
  city: string
  role: string
  problem: string
}

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD, // Use app password for Gmail
    },
  })
}

// Email templates
const createWelcomeEmail = (data: WaitlistData) => ({
  from: `"BachelorOS Team" <${process.env.EMAIL_USER}>`,
  to: data.email,
  subject: '🚀 Welcome to BachelorOS Waitlist!',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to BachelorOS</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to BachelorOS!</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your city survival just got easier</p>
        </div>
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #4a5568; margin-top: 0;">Hey ${data.name}! 👋</h2>
          <p>Thanks for joining our waitlist! We're super excited to have you on board.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Your Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 5px 0;"><strong>📞 Phone:</strong> ${data.number}</li>
              <li style="padding: 5px 0;"><strong>📍 City:</strong> ${data.city}</li>
              <li style="padding: 5px 0;"><strong>👤 Role:</strong> ${data.role}</li>
              <li style="padding: 5px 0;"><strong>🎯 Main Challenge:</strong> ${data.problem}</li>
            </ul>
          </div>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>🔥 You're now part of an exclusive group of 500+ early adopters</li>
            <li>📧 We'll send you updates about our progress</li>
            <li>📱 Join our WhatsApp group for instant updates</li>
            <li>🎁 You'll get early access when we launch</li>
            <li>💰 Earn Think Coins by referring friends!</li>
          </ul>
        </div>
        
        <div style="background: #dcfce7; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
          <h3 style="margin-top: 0; color: #166534;">📱 Join Our WhatsApp Group!</h3>
          <p style="margin-bottom: 15px;">Get instant updates, early access perks, and connect with fellow city survivors!</p>
          <a href="https://chat.whatsapp.com/GLWCgvs4w0f3NH2XDKPK01" style="display: inline-block; background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Join WhatsApp Group 📲
          </a>
        </div>
        
        <div style="background: #e2e8f0; padding: 20px; border-radius: 10px; text-align: center;">
          <h3 style="margin-top: 0; color: #4a5568;">Spread the Word! 📢</h3>
          <p>Know someone struggling with city life? Share BachelorOS with them!</p>
          <p style="font-size: 14px; color: #64748b;">The more people join, the better we can make this for everyone.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 14px;">
            Made with ♡ by the BachelorOS Team<br>
            From Kolkata, for everyone surviving city life
          </p>
        </div>
      </body>
    </html>
  `,
  text: `
    Hey ${data.name}!
    
    Thanks for joining the BachelorOS waitlist! 🚀
    
    Your details:
    - Phone: ${data.number}
    - City: ${data.city}
    - Role: ${data.role}
    - Main Challenge: ${data.problem}
    
    What's next?
    - You're now part of 500+ early adopters
    - We'll send you updates about our progress
    - Join our WhatsApp group for instant updates
    - You'll get early access when we launch
    - Earn Think Coins by referring friends!
    
    Join our WhatsApp group: https://chat.whatsapp.com/GLWCgvs4w0f3NH2XDKPK01
    
    Thanks for being part of the journey!
    
    The BachelorOS Team
  `
})

const createNotificationEmail = (data: WaitlistData) => ({
  from: `"BachelorOS Waitlist" <${process.env.EMAIL_USER}>`,
  to: process.env.NOTIFICATION_EMAIL,
  subject: '🎉 New Waitlist Signup - BachelorOS',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Waitlist Signup</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New Waitlist Signup!</h1>
          <p style="color: white; margin: 5px 0 0 0;">Someone just joined BachelorOS</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 25px; border-radius: 10px; border-left: 4px solid #0ea5e9;">
          <h2 style="color: #0c4a6e; margin-top: 0;">User Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">👤 Name:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">📧 Email:</td>
              <td style="padding: 8px 0;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">📞 Number:</td>
              <td style="padding: 8px 0;">${data.number}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">📍 City:</td>
              <td style="padding: 8px 0;">${data.city}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">💼 Role:</td>
              <td style="padding: 8px 0;">${data.role}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">🎯 Main Problem:</td>
              <td style="padding: 8px 0;">${data.problem}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">⏰ Joined:</td>
              <td style="padding: 8px 0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; color: #92400e;">
            <strong>📈 Action Required:</strong> Consider reaching out to ${data.name} for feedback or early user interviews!
          </p>
        </div>
      </body>
    </html>
  `,
  text: `
    New BachelorOS Waitlist Signup!
    
    User Details:
    - Name: ${data.name}
    - Email: ${data.email}
    - Number: ${data.number}
    - City: ${data.city}
    - Role: ${data.role}
    - Main Problem: ${data.problem}
    - Joined: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    
    Consider reaching out for feedback or early user interviews!
  `
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { name, email, number, city, role, problem }: WaitlistData = body

    // Validation
    if (!name || !email || !city || !role || !problem) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required',
          details: 'Please fill in all the required fields'
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format',
          details: 'Please enter a valid email address'
        },
        { status: 400 }
      )
    }

    

    // Check required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('Missing email configuration')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Server configuration error',
          details: 'Email service is not properly configured'
        },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = createTransporter()

    // Verify transporter configuration
    await transporter.verify()

    // Prepare emails
    const welcomeEmail = createWelcomeEmail({ name, email, number, city, role, problem })
    const notificationEmail = createNotificationEmail({ name, email, number, city, role, problem })

    // Send emails
    const emailPromises = [
      transporter.sendMail(welcomeEmail)
    ]

    // Only send notification email if notification email is configured
    if (process.env.NOTIFICATION_EMAIL) {
      emailPromises.push(transporter.sendMail(notificationEmail))
    }

    await Promise.all(emailPromises)

    console.log(`✅ New waitlist signup: ${name} (${email}) from ${city}`)

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist!',
      details: 'Check your email for a welcome message'
    })

  } catch (error) {
    console.error('❌ Waitlist API Error:', error)
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request format',
          details: 'Please send valid JSON data'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to join waitlist',
        details: 'Please try again later or contact support'
      },
      { status: 500 }
    )
  }
}
