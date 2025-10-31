# Location Tracker API

A Node.js/Express API for tracking location data, deployed on Vercel.

## Features

- ✅ Batch location data storage
- ✅ MongoDB Atlas integration
- ✅ CORS enabled
- ✅ Serverless deployment ready

## API Endpoints

### POST `/api/locations/batch`
Store a batch of location data.

**Request Body:**
```json
{
  "userId": "string",
  "locations": [
    {
      "lat": "number",
      "lng": "number", 
      "timestamp": "string",
      "accuracy": "number"
    }
  ]
}
```

### GET `/` or `/api`
Health check endpoint.

## Local Development

```bash
npm install
npm run dev
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

Or deploy directly from GitHub by connecting your repository to Vercel.

## Environment Variables

Make sure to set up your MongoDB connection string in Vercel's environment variables if you want to use a different database for production.

## Project Structure

```
├── api/
│   └── index.js          # Vercel serverless function entry point
├── server.js             # Local development server
├── package.json
├── vercel.json           # Vercel configuration
└── README.md
```# expo-location
