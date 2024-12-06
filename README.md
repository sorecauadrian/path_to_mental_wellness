# wildcats web project setup guide

### prerequisites

+ node.js (v18 or later)
+ npm (v9 or later)
  
> you can verify if you have them installed by running ```node -v``` for node.js and ```npm -v``` for npm.

> if you don't have any of them installed, download node.js (lts) from [nodejs.org](https://nodejs.org/) and you'll get both of them (works for windows)

### clone the repository

```
git clone https://github.com/sorecauadrian/web_wildcats.git
cd web_wildcats
```

### setup backend

```
# Navigate to server directory
cd server

# Copy example environment file
cp .env.example .env

# Install dependencies
npm install

# Start the server
npm start
```

### setup frontend

```
# Navigate to client directory
cd ../client

# Copy example environment file
cp .env.example .env

# Install dependencies
npm install

# Start the development server
npm run dev
```

### development notes

+ always work on a separate branch
+ pull latest changes before starting work

### troubleshooting

+ ensure all dependencies are installed correctly (maybe you could ```npm install``` after each pull)
+ check that ports are not occupied by other processes