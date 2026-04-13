# Task Manager

A simple task manager built with Next.js, React, and Tailwind CSS. You can add tasks, mark them as done, delete them, and filter between all, active, and completed tasks. Everything saves to localStorage so it persists on refresh.


## How to run it on Mac

First you need Node.js. If you don't have it, install Homebrew by pasting this into your terminal:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install Node:

```
brew install node
```

Now clone the project and install dependencies:

```
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
npm install
```

Start the dev server:

```
npm run dev
```

Open your browser and go to http://localhost:3000


## How to run it on Windows

Same steps minus the Homebrew part. Download Node.js from nodejs.org, then run the same commands in your terminal:

```
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
npm install
npm run dev
```

Then go to http://localhost:3000 in your browser.


## If you get a permissions error on Mac

Don't use sudo with npm. Either use nvm to manage your Node version or fix your npm permissions. Google "fix npm permissions mac" and follow the official npm docs.
