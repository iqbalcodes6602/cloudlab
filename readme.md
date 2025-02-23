
# CloudLab

CloudLab is an open-source virtual workspace platform that provides seamless access to remote desktop environments and applications. Designed for businesses, teams, and individuals, CloudLab enables secure, high-performance remote collaboration, eliminating the need for complex local setups.

## 🚀 Demo

[![CloudLab Demo](https://github.com/user-attachments/assets/c24d1641-1193-470b-9b14-ac181c5542fc)](https://github.com/user-attachments/assets/c24d1641-1193-470b-9b14-ac181c5542fc)

## 📌 Features

- **Remote Collaboration** – Share workspaces in real-time for efficient team collaboration.
- **Cross-Platform Access** – Access your workspace from any device, anytime.
- **Pre-Configured Environments** – Includes tools like Ubuntu, OnlyOffice, and Blender.
- **Secure and Scalable** – Ensures data privacy with strong security measures.
- **Easy Admin Control** – Monitor active users, manage accounts, and terminate sessions.

---

## 📖 Architecture Overview

CloudLab follows a **MERN stack** architecture, using **Docker** for containerization and **Nginx** for reverse proxy management.

### 🔹 **Frontend (React)**
- Built with React to provide a seamless user experience.
- Connects to the backend via REST APIs.
- Manages user authentication and workspace interactions.

### 🔹 **Backend (Node.js & Express)**
- Handles user authentication, file management, and workspace allocation.
- Secured using JWT-based authentication.

### 🔹 **Database (MongoDB)**
- Stores user information, session details, and workspace configurations.
- Ensures data persistence for ongoing sessions.

### 🔹 **Containerization (Docker)**
- Each workspace runs inside an **isolated Docker container**.
- Preconfigured images for Ubuntu, OnlyOffice, and other tools.

### 🔹 **Deployment**
- Can be deployed on **AWS, DigitalOcean, or self-hosted servers**.
- Uses **Docker Compose** to orchestrate multiple services.

---

## 🛠 Installation Guide

Follow these steps to set up CloudLab on your local machine.

### **1. Clone the repository**
```bash
git clone https://github.com/iqbalcodes6602/cloudlab.git
cd cloudlab
```

### **2. Install Dependencies**
Run the setup script based on your operating system.

#### **For Linux/Mac:**
```bash
sudo chmod +x docker_images.sh
sudo ./docker_images.sh
```

#### **For Windows:**
```bash
docker_images.bat
```

### **3. Install Client Dependencies**
```bash
cd client
npm install
```

### **4. Install Server Dependencies**
```bash
cd server
npm install
```

### **5. Start the Frontend**
Runs on **http://localhost:3000/**
```bash
cd client
npm start
```

### **6. Start the Backend**
Runs on **http://localhost:5000/**
```bash
cd server
nodemon index.js
```

### **7. Login & Start Using**
Create an account or log in as an **admin** to manage users and workspaces.

---

## 🎯 The Problem CloudLab Solves

CloudLab is built to address the need for **accessible, scalable, and secure virtual work environments**. It provides:

- **💼 Remote Collaboration:** Ideal for teams working on shared projects.
- **🌍 Cross-Platform Accessibility:** No dependency on local hardware.
- **📊 Productivity Boost:** Comes with pre-configured development tools.
- **🔒 Security-Focused:** Protects user data and sessions.
- **⚙️ Administrative Control:** Manage users and services effortlessly.

---

## 💡 Contributing

We welcome contributions! If you’d like to help improve CloudLab:

1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes.
4. Open a Pull Request.

---

## 📜 License

CloudLab is licensed under the **MIT License** – feel free to use and modify it!

---
