# Fullstack Django React App

This repository contains the code for a fullstack web application built with Django and React. The application provides a simple web interface to manage simple text communication.
The chat app features the ability to create and delete users, chat rooms, and even messages!


## Features

- User authentication and authorization
- CRUD operations for tasks
- User profile management
- Responsive design
- Chat function 

## Tech Stack

- Django
- Django REST framework
- React
- Bootstrap


## Installation

To run this application locally, you need to have the following software installed:

- Python 3
- Node.js
- PostgreSQL

Clone the repository and navigate to the project root directory:

```bash
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>
```

Create a virtual environment and install the Python dependencies:

```bash
python -m venv venv
source venv/bin/activate  # on Linux/macOS
venv\Scripts\activate  # on Windows
pip install -r requirements.txt
```

Create a PostgreSQL database and update the `DATABASES` setting in `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '<database-name>',
        'USER': '<database-user>',
        'PASSWORD': '<database-password>',
        'HOST': '<database-host>',
        'PORT': '<database-port>',
    }
}
```

Install the JavaScript dependencies and start the development server:

```bash
cd frontend
npm install
npm start
```

Open your web browser and go to http://localhost:3000/ to access the application.

## Deployment

To deploy this application to a production environment, you can follow the standard procedure for deploying a Django-React application. Some possible options include:

- Deploying to Heroku
- Deploying to AWS Elastic Beanstalk
- Using Docker and Kubernetes

## Contributing

Contributions to this repository are welcome. If you find a bug or want to suggest a new feature, please open an issue. If you want to contribute code, please create a pull request.
