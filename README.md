
# 🌟 ShopFast – Product Recommendation App

Welcome to **ShopFast**, a modern e-commerce interface powered by **React (Vite)** frontend and a **Flask backend**. This app allows users to search for products and receive personalized recommendations using content-based filtering.

---

## 🚀 Features

- 🔍 **Search Functionality**: Instantly search across product title, brand, tags, and description.
- 💡 **Product Recommendations**: Get smart recommendations based on your search using content-based filtering (Flask API).
- 🌐 **Fast Frontend**: Built using Vite for ultra-fast development and production builds.
- ⚙️ **Backend API**: Python Flask API serving product recommendations.
- 🐳 **Dockerized**: Run everything in containers for easy development and deployment.
- 🔁 **CI/CD**: Automated build and test pipeline via GitHub Actions.

---

## 🖼️ Demo Screenshots

| Search Products                         | Recommendations                          |
|----------------------------------------|------------------------------------------|
| ![Screenshot (30)](https://github.com/user-attachments/assets/8d6dc4c8-eefb-468a-ad41-d78fa4ebd547) |
| ![image](https://github.com/user-attachments/assets/96fd0963-11e7-4103-998f-6a1590f20a99) |

---

## 🧰 Tech Stack

| Frontend       | Backend     | DevOps/CI-CD     |
|----------------|-------------|------------------|
| React + Vite   | Python Flask| Docker, GitHub Actions |
| Tailwind CSS   | REST API    | Docker Compose   |

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Sasidharveerni/basic-ecommerce.git
cd basic-ecommerce
```

---

## 🐳 Docker Setup (Recommended)

> One command to run both frontend and backend using Docker Compose

### 1. Build & Run Containers

```bash
docker-compose up --build
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/flask/recommend?q=product_name](http://localhost:5000/flask/recommend?q=product_name)

---

## 🧑‍💻 Manual Setup (Without Docker)

### Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Flask)

```bash
cd ml-model
# Create virtual env (optional)
pip install -r requirements.txt
python app.py
```

---

## 🔄 CI/CD with GitHub Actions

- Every push to `master` triggers:
  - Docker Compose build
  - Backend API test via `curl`

Example workflow: `.github/workflows/docker-compose.yml`

---

## 🌍 Deployment Suggestions

| Frontend (Vite) | Backend (Flask) |
|-----------------|-----------------|
| Vercel (Free)   | Render / Railway |
| Netlify         | VPS / Heroku     |

---

## 🏆 GitHub Achievements

To unlock [GitHub Achievements](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-achievements-on-your-profile):
- Keep contributing daily 🟢
- Use **GitHub Actions**
- Open **Pull Requests**
- Gain stars ⭐ on your repo
- Explore **Discussions** and **Issues**

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributions

Want to add features or fix bugs?
- Fork the repo
- Create a branch
- Submit a PR 🚀

---

## 📧 Contact

Made with ❤️ by [Sasidhar](https://github.com/Sasidharveerni)  
Let’s connect on [LinkedIn](https://www.linkedin.com/in/sasidhar-v-386803275/)
