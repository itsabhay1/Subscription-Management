# Subscription Management System

This project is a backend service designed to manage user subscriptions with support for authentication, multiple subscription plans, and real-time messaging via Redis. Built with a clean architecture using Express.js and MongoDB, it’s ideal for SaaS-style platforms requiring scalable subscription logic.

## Features

- *User Authentication:* Register and login with secure JWT tokens.
- *Subscription Management:* Create, view, update, and cancel subscriptions.
- *Plan Management:* Support for multiple subscription plans with duration and pricing.
- *Redis Pub/Sub:* Real-time messaging integration to simulate events like “subscription.created”.
- *RESTful API Design:* Clean route structure with MVC architecture.
- *Environment Configurable:* Secure .env support for easy deployment.
- *Protected Routes:* Only authenticated users can manage subscriptions.

## Technologies Used

- *Programming Language:* JavaScript (Node.js)
- *Framework:* Express.js
- *Database:* MongoDB (Mongoose)
- *Authentication:* JWT
- *Real-Time Messaging:* Redis Pub/Sub
- *Deployment Ready:* Deployed on Render

## Live Demo - Backend

🔗 https://subscription-management-vpch.onrender.com

## Postman Documentation

🔗 https://documenter.getpostman.com/view/39478794/2sB2qf9yo5
