#CareBot - Health Care Companion

**Clone and run for a quick way to see CareBot in action.**

How to Clone?
- `git clone https://github.com/Kurokami2022/CareBot.git`
- `cd CareBot`
-  `npm install`

How to Run?
To run an ionic react app you need to use `ionic serve`, However we used python backends, so to run our app:
- `npm start`

Files
- `package.json` - Points to the app's main file and lists its details and dependencies.
- `App.tsx` - Starts the app. This is the app's **main process**.
- `Home.tsx` - Home page where you can view the purpose and key features of the app.
- `Health.tsx` - One of the key features of our app, this is the highlight feature of CareBot, where you can view articles and tell the AI what do you feel and it will answer you based on its knowledge.
- `Time.css` - One of the key features of our app, where you can add todos and you can mark them as done, you can also view calendar in this page.
- `databases` - This is where we store the database used for the health and time.
- `backend` - this is where the backend files are, we used python for our backend.
