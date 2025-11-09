# Webhooks for Beginners - Project Summary

## 📋 Project Overview

This is a **webhooks course project** that demonstrates how to build webhook integrations using three different approaches:
1. **Express Server** (Local with ngrok)
2. **Netlify Functions** (Cloud deployment)
3. **Twilio Serverless** (For SMS handling)

---

## 🏗️ Project Structure

```
webhooks-course/
├── code/
│   ├── express-discorder/          # Local Express server + Discord webhook
│   │   ├── server.js               # Main server file
│   │   ├── .env                    # ⚠️ PRIVATE - Never commit!
│   │   ├── .env.example            # Safe template for GitHub
│   │   └── package.json            # Dependencies
│   │
│   ├── netlify-discorder/          # Cloud-based Netlify Functions
│   │   ├── functions/
│   │   │   └── discorder.js        # Netlify serverless function
│   │   ├── netlify.toml            # Netlify configuration
│   │   └── package.json
│   │
│   └── twilio/
│       ├── ideaCatcher/            # Twilio SMS handling
│       │   ├── functions/
│       │   │   └── send-text.js    # SMS receiver function
│       │   ├── .env                # ⚠️ PRIVATE - Twilio credentials
│       │   └── package.json
│       │
│       └── lightchanger/           # Additional Twilio project
│
├── .gitignore                      # Protects sensitive files
├── SECURITY_BEST_PRACTICES.md      # Security guidelines
├── CREDENTIALS_MANAGEMENT.md       # How to handle secrets
└── WEBHOOK_OPTIONS.md              # Deployment options

```

---

## 🔄 What Each Component Does

### 1. Express Discorder (Local Development)
**Purpose:** Handle GitHub webhooks locally with Discord notifications

**Flow:**
```
GitHub Webhook Event
    ↓
ngrok (Public Tunnel)
    ↓
Express Server (localhost:3000)
    ↓
Discord Webhook URL
    ↓
Discord Message Posted
```

**Key Files:**
- `server.js` - Listens for GitHub webhooks on `/github` endpoint
- Action checking: Differentiates between "starred" and "unstarred" events
- Dynamic messages based on event type

**Example Output:**
```
"Look who just ⭐️ webhooks-course!
Thanks wavHub!"
```

---

### 2. Netlify Discorder (Cloud Deployment)
**Purpose:** Production-ready webhook handler that runs 24/7

**Flow:**
```
GitHub Webhook Event
    ↓
Netlify Functions URL
    ↓
discorder.js (Async/Await)
    ↓
Discord Webhook
    ↓
Discord Message Posted
```

**Key Files:**
- `functions/discorder.js` - Async serverless function
- Matches Express logic but optimized for serverless
- Same action checking for starred/unstarred differentiation

**Advantages:**
- ✅ Always running (no local machine needed)
- ✅ Automatic scaling
- ✅ GitHub can call it directly

---

### 3. Twilio Serverless (SMS Handler)
**Purpose:** Handle incoming SMS and voice messages

**Flow:**
```
SMS to Twilio Phone Number
    ↓
Twilio Studio Flow (optional)
    ↓
Twilio Serverless Function
    ↓
send-text.js (Processes message)
    ↓
Response sent back to user
```

**Key Files:**
- `functions/send-text.js` - Processes incoming SMS
- Can access transcription data
- Returns response back to sender

**Example:**
```
Input: "I'm stuck in 1999. I need to get back send me your stars."
Output: "It Begins!" (sent back as SMS)
```

---

## 📝 Step-by-Step: What Was Added Each Step

### Step 1: Express Server Setup
- ✅ Created `server.js` with `require("dotenv")` for environment variables
- ✅ Set up Express app listening on port 3000
- ✅ Created `/github` POST endpoint to receive GitHub webhooks
- ✅ Used `axios` to make POST requests to Discord webhook URL
- ✅ Added error handling with `.catch()` block

### Step 2: Action Checking
- ✅ Added logic to check `req.body.action` property
- ✅ Differentiate between `"created"` (starred) and `"deleted"` (unstarred)
- ✅ Dynamic messages: Different content for each action
- ✅ Format: `"Look who just ⭐️ ${repoName}!\nThanks ${userName}!"`

### Step 3: Discord Embed with Avatar
- ✅ Added avatar URL from `req.body.sender.avatar_url`
- ✅ Created embed structure with image
- ✅ Discord shows user's GitHub avatar with message

### Step 4: Environment Variables
- ✅ Created `.env` file with `DISCORD_WEBHOOK_URL=...`
- ✅ Added `require("dotenv").config()` to load from `.env`
- ✅ Created `.env.example` template for GitHub (safe to commit)
- ✅ Added `.env` to `.gitignore` (private, never commit)

### Step 5: Security Best Practices
- ✅ Created `SECURITY_BEST_PRACTICES.md` documentation
- ✅ Created `CREDENTIALS_MANAGEMENT.md` for credential handling
- ✅ Ensured all `.env` files are in `.gitignore`
- ✅ Regenerated exposed credentials

### Step 6: Git Workflow
- ✅ Used branching: `git checkout -b feature/star-action-check`
- ✅ Made changes safely on separate branch
- ✅ Merged back to main: `git merge feature/star-action-check`
- ✅ Pushed to GitHub: `git push origin main`

### Step 7: Netlify Deployment
- ✅ Created Netlify Functions version (`discorder.js`)
- ✅ Used `async/await` instead of `.then()` pattern
- ✅ Used `try/catch` for error handling
- ✅ Deployed to Netlify with `netlify deploy --prod`
- ✅ Set environment variables in Netlify dashboard
- ✅ Function runs 24/7 in cloud

### Step 8: Twilio Setup
- ✅ Installed Twilio CLI: `npm install -g netlify-cli`
- ✅ Created `twilio-run` plugin for serverless functions
- ✅ Set up SMS handler in `ideaCatcher/functions/send-text.js`
- ✅ Configured `.env` with Twilio credentials
- ✅ Functions receive transcribed SMS text

---

## 🔐 Security Checklist

### Files That SHOULD Be in .gitignore
- ✅ `.env` - Never commit! Contains secrets
- ✅ `.twilio-cli/` - Twilio authentication config
- ✅ `node_modules/` - Dependency folder (too large)

### Files That SHOULD Be Committed
- ✅ `.env.example` - Template showing what's needed
- ✅ `.gitignore` - Protection rules
- ✅ `SECURITY_BEST_PRACTICES.md` - Documentation
- ✅ Source code (`.js` files)

### Secrets That MUST Be Protected
- ⚠️ `DISCORD_WEBHOOK_URL` - Can post to your Discord
- ⚠️ `TWILIO_ACCOUNT_SID` - Access to your Twilio account
- ⚠️ `TWILIO_AUTH_TOKEN` - Authentication for Twilio
- ⚠️ API keys and tokens of any kind

### If Credentials Are Exposed
1. Delete the old secret immediately (webhook, API key, token)
2. Create a new secret
3. Update `.env` file locally
4. Update environment variables in deployment platform
5. Commit and push

---

## 🚀 Deployment Options

### Option 1: Local Development (Express + ngrok)
```bash
cd code/express-discorder
npm start
ngrok http 3000  # In another terminal
# Use ngrok URL in GitHub webhook settings
```

### Option 2: Cloud Production (Netlify)
```bash
cd code/netlify-discorder
netlify deploy --prod
# Function automatically deployed and running 24/7
```

### Option 3: Twilio SMS Handling
```bash
cd code/twilio/ideaCatcher
npm start
# SMS to your Twilio number triggers send-text.js
```

---

## 📊 Example Webhook Flow

**GitHub Event:** Someone stars your repo

```
GitHub → Webhook POST to your URL
Body contains:
{
  "action": "created",
  "starred_at": "2024-11-08T15:42:22Z",
  "repository": { "name": "webhooks-course" },
  "sender": { 
    "login": "wavHub",
    "avatar_url": "https://avatars.githubusercontent.com/u/..."
  }
}
        ↓
Your Express/Netlify Function receives it
        ↓
Check action === "created" → It's a star!
        ↓
Format message with name and repo
        ↓
POST to Discord webhook
        ↓
Discord channel shows:
"Look who just ⭐️ webhooks-course!
Thanks wavHub!"
[+ GitHub avatar]
```

---

## 🎓 Key Learning Points

1. **Webhooks** - Automatic notifications when events happen
2. **Environment Variables** - Secure way to store secrets
3. **Local Tunneling** - ngrok exposes local server to internet
4. **Serverless Functions** - Code that runs without managing servers
5. **Action Checking** - Differentiate webhook events by action type
6. **Security First** - Never commit credentials to Git
7. **Async/Await** - Modern way to handle promises in serverless
8. **Error Handling** - Both `.catch()` and `try/catch` patterns

---

## 📚 Files Reference

| File | Purpose | Status |
|------|---------|--------|
| `.env` | Private credentials | 🔒 DO NOT COMMIT |
| `.env.example` | Template for team | ✅ COMMIT |
| `.gitignore` | Protection rules | ✅ COMMIT |
| `server.js` | Express webhook handler | ✅ COMMIT |
| `discorder.js` | Netlify function | ✅ COMMIT |
| `send-text.js` | Twilio SMS handler | ✅ COMMIT |
| `.twilio-cli/` | Twilio config | 🔒 DO NOT COMMIT |
| `node_modules/` | Dependencies | 🔒 DO NOT COMMIT |

---

## ✨ What's Working

✅ GitHub stars/unstars trigger Discord messages
✅ Local development with Express + ngrok
✅ Cloud production with Netlify Functions
✅ SMS handling with Twilio
✅ Different messages for starred vs unstarred
✅ User avatars in Discord embeds
✅ Environment variables secure
✅ All credentials protected in `.gitignore`
✅ Documentation and security guides included

---

**Last Updated:** November 9, 2025
**Status:** Complete and Deployed ✅