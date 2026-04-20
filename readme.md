# CloudLab

CloudLab is an open-source virtual workspace platform that provides seamless access to remote desktop environments and applications. Designed for businesses, teams, and individuals, CloudLab enables secure, high-performance remote collaboration, eliminating the need for complex local setups.

# Contents

- [Demo](#demo)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Installation Guide](#installation-guide)
- [The Problem CloudLab Solves](#the-problem-cloudlab-solves)
- [Contributing](#contributing)
- [License](#license)


## Demo

[![CloudLab Demo](https://github.com/user-attachments/assets/c24d1641-1193-470b-9b14-ac181c5542fc)](https://github.com/user-attachments/assets/c24d1641-1193-470b-9b14-ac181c5542fc)

## Features

- **Remote Collaboration** – Share workspaces in real-time for efficient team collaboration.
- **Cross-Platform Access** – Access your workspace from any device, anytime.
- **Pre-Configured Environments** – Includes tools like Ubuntu, OnlyOffice, and Blender.
- **Secure and Scalable** – Ensures data privacy with strong security measures.
- **Easy Admin Control** – Monitor active users, manage accounts, and terminate sessions.

---

## Architecture Overview

![diagram](./assets/master%20flow-cropped.svg)

CloudLab follows a **MERN stack** architecture, fully containerized and orchestrated by **Kubernetes**. It uses **Minikube** with the **QEMU driver** for local development and an **Nginx Ingress Controller** for handling external traffic.

### **Frontend (React)**
- Built with React to provide a seamless user experience.
- Connects to the backend via REST APIs.
- Manages user authentication and workspace interactions.

### **Backend (Node.js & Express)**
- Handles user authentication, file management, and workspace allocation.
- Interacts with the **Kubernetes API** to create and manage workspace pods dynamically.
- Secured using JWT-based authentication.

### **Database (MongoDB)**
- Stores user information, session details, and workspace configurations.
- Ensures data persistence for ongoing sessions.

### **Orchestration (Kubernetes & Minikube)**
- Workspaces are deployed as isolated **Kubernetes Pods**.
- **Ingress Controller** manages routing and access to specific workspaces.
- Uses **Minikube** with **QEMU** for a lightweight local cluster.

---

## Installation Guide

Follow these steps to set up CloudLab on your local machine using Kubernetes.

### **Prerequisites**
- [Docker](https://www.docker.com/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [QEMU](https://www.qemu.org/) (required driver for Minikube)

### **1. Clone the repository**
```bash
git clone https://github.com/iqbalcodes6602/cloudlab.git
cd cloudlab
```

### **2. Start Minikube**
Start the Minikube cluster using the QEMU driver:
```bash
minikube start --driver=qemu
```

### **3. Enable Ingress Controller**
Enable the Nginx Ingress addon for traffic routing:
```bash
minikube addons enable ingress
```

### **4. Configure Docker Environment & Pull Images**

#### 4.1 Setup the env
```
minikube ip
```

Paste the given ip in server -> .env

#### 4.2 Download the images (can skip)
Configure your shell to use Minikube's Docker daemon, then pull the required images directly into the cluster.

**SSH into minikube instance**
````
minikube ssh
````

**Pull images**
```bash
# Pull images
docker pull kasmweb/chrome:1.14.0
docker pull kasmweb/vs-code:1.14.0
docker pull kasmweb/pinta:1.14.0
docker pull kasmweb/blender:1.14.0
docker pull kasmweb/ubuntu-bionic-desktop:1.10.0-rolling
```

### **5. Install Client Dependencies**
```bash
cd client
npm install
```

### **6. Install Server Dependencies**
```bash
cd server
npm install
```

### **7. Start the Frontend**
Runs on **http://localhost:3000/**
```bash
cd client
npm start
```

### **8. Start the Backend**
Runs on **http://localhost:5000/**. Ensure your `kubectl` context is set to Minikube.
```bash
cd server
nodemon index.js
```

### **9. Login & Start Using**
Create an account or log in as an **admin** to manage users and workspaces.

---

## The Problem CloudLab Solves

CloudLab is built to address the need for **accessible, scalable, and secure virtual work environments**. It provides:

- **Remote Collaboration:** Ideal for teams working on shared projects.
- **Cross-Platform Accessibility:** No dependency on local hardware.
- **Productivity Boost:** Comes with pre-configured development tools.
- **Security-Focused:** Protects user data and sessions.
- **Administrative Control:** Manage users and services effortlessly.

---

## Contributing

We welcome contributions! If you’d like to help improve CloudLab:

1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes.
4. Open a Pull Request.

---

## License

CloudLab is licensed under the **MIT License** – feel free to use and modify it!
