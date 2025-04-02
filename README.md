# Order Status Checker Chat Interface

A React and Flask application that uses OpenAI API to create a chat interface for checking order statuses. The application allows users to inquire about their order status, and it integrates with an external API to retrieve order information.

## Features

- User authentication via email
- Chat interface powered by OpenAI API
- Order status retrieval from external API
- Docker containerization for easy deployment

## Project Structure

```
├── backend/                # Flask backend
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│   ├── .env               # Environment variables (not tracked in git)
│   └── Dockerfile         # Backend Docker configuration
├── frontend/              # React frontend
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # React components
│   │   └── App.js         # Main React component
│   ├── package.json       # Node.js dependencies
│   ├── Dockerfile         # Frontend Docker configuration
│   └── nginx.conf         # Nginx configuration for production
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.9+
- Docker and Docker Compose (optional)

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
ORDER_API_ENDPOINT=https://api.example.com/orders
```

### Running Locally

#### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

### Running with Docker

```bash
docker-compose up --build
```

The application will be available at http://localhost for the frontend and http://localhost:5000 for the backend API.

## Development

This project uses a development branch for ongoing work and a main branch for production-ready code. To contribute:

1. Create a feature branch from development
2. Make your changes
3. Submit a pull request to merge back into development

## License

This project is licensed under the MIT License - see the LICENSE file for details.
