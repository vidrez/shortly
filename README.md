# Shortly 🚀 
**For All Redirecting Tasks, Safely**  

Shortly is a security-first URL shortener that ensures users are protected by scanning URLs with VirusTotal before redirecting. Built with modern technologies, it prioritizes user safety without compromising on speed or simplicity.  

---

![Home](/docs/home.png)
![Redirect](/docs/redirect.png)
---

## ✨ Features  
- 🔒 **Security First**: Every URL is scanned with VirusTotal to detect potential threats. If the scan is not possible the automatic redirect will be disabled. 
- ✂️ **Simple and Fast**: Quickly shorten URLs with minimal effort.  
- 🌍 **Modern Stack**: Built with Nuxt.js for the frontend and MongoDB for data storage.  
- 🚀 **Scalable Deployment**: Ready for production with Vercel and MongoDB Atlas.
- 🌑 **Dark Mode Only**: Because yes.  

---

## 🛠️ Technologies  
- **Frontend**: [Nuxt.js](https://nuxt.com/) (Vue.js framework)  
- **Database**: [MongoDB](https://www.mongodb.com/)  
- **Security**: [VirusTotal API integration](https://docs.virustotal.com/reference/overview)  

---

## 🚧 Development Setup  

Requirements:

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/) (recommended LTS)
- [Git](https://git-scm.com/)

Follow these steps to set up a local development environment:  

1. Clone the repository:  
```bash
git clone https://github.com/vidrez/shortly.git
cd shortly
```
2. Start the local MongoDB instance using Docker Compose:
```bash
docker compose -f compose-dev.yml up
```
3. Setup you local **.env** file (use the .env.example as reference)
```bash
MONGODB_URI=mongodb://root:root@mongo:27017
NODE_ENV=local
NUXT_SESSION_PASSWORD=**Generate a password of your choice of at least 32 chars**
VIRUSTOTAL_API_KEY=**Follow the instructions on VirusTotal documentation on how to generate this**
VIRUSTOTAL_ENABLED=true
```
4. Install dependencies:
```bash
npm install
```
5. Run the development server:
```bash
npm run dev
```
6. Visit the app in your browser:
```bash
http://localhost:3000
```

---

## 🌐 Deployment

Shortly **it is not** production-ready, at its core is just an exercise, made in a very limited time, and as such no proper code review was done to make sure that it respects the most rigorous code quality standards and doesn't contain any bug that might compromise the availability, integrity or confidentiality of the (rather low value) data handled by the app. Moreover no logging practice was taken into consideration, so there is really no way to deal with the possible misuse of the application. **HOWEVER** it is dead simple to deploy it for free and try it out by relying on two services:

- [Vercel](https://vercel.com)
- [MongoDB Atlas](https://www.mongodb.com/)

Vercel is tightly integrated with Nuxt, MongoDB Atlas and Github, as such you can deploy your app in a few clicks and minutes with or without the help of the countless articles online.

## 🤝 Contributing

This was a simple exercise made within some spare time I had to familiarize with the technologies that I used, as such I most likely will not continue the maintainment of this project, if you like the concept you are free to fork the repository and develop it into something more articulated 😊 

## ⚠️ License

This project is licensed under the MIT License.
