# How to setup a new Typescript Express project


1) 
```
npm init -y
```


2) 
```
npm install -D/-g typescript
npm install concurrently
```


3) 
```
tsc --init
```


4) Add the following scripts in pakage.json
```
"scripts": {
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dir/index.js",
    "dev": "npx concurrently \"npm run watch\" \"npm start\""
  }
```


5) Note: Make relavent config changes in tsconfig.json


6) 
```
npm run dev
```