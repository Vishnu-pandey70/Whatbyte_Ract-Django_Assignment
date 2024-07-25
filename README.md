
---
# React and Django Project

## Project Description

My Application is a web-based platform that provides functionalities for user authentication, password management, and user profile management. The application includes features for user registration, login, password recovery, and profile management.

## Technologies Used

- **Frontend**: React, React Router DOM, Bootstrap 5, Axios, React Toastify
- **Backend**: Django (with Django REST Framework)
- **Database**: (sqllite)

## Setup Instructions

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   cd frontend

2. **Install Dependencies**:

   Make sure you have Node.js and npm installed. You can download and install them from [Node.js](https://nodejs.org/).

   npm install


3. **Start the Development Server**:
   npm start
   

   The application will be running on [http://localhost:3000](http://localhost:3000) by default.

### Backend Setup

1. **Navigate to the Backend Directory**:

   cd backend

2. **Install Dependencies**:

   Make sure you have Python and pip installed. You can download and install them from [Python](https://www.python.org/).

   pip install django
   pip install djangorestframework
   pip install django-cors-headers

3. **Configure Django Settings**:

   - Add `corsheaders` and `rest_framework` to your `INSTALLED_APPS` in `settings.py`.
   - Configure CORS settings as needed.

4. **Apply Migrations and Run the Server**:
   python manage.py migrate
   python manage.py runserver
   
