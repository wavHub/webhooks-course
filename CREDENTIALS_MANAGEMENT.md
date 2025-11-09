s# Credentials & Secrets Management Guide

## 🔐 Overview

This guide explains how to safely manage, transfer, and share sensitive credentials across computers and team members without exposing them to security risks.

---

## 📋 Table of Contents

1. [What Are Credentials?](#what-are-credentials)
2. [How to Store Locally](#how-to-store-locally)
3. [How to Transfer Between Computers](#how-to-transfer-between-computers)
4. [How to Share with Team Members](#how-to-share-with-team-members)
5. [Platform-Specific Setup](#platform-specific-setup)
6. [What NOT to Do](#what-not-to-do)
7. [Emergency: If Credentials Are Exposed](#emergency-if-credentials-are-exposed)

---

## 🎯 What Are Credentials?

**Credentials are secrets that give access to your accounts and services:**

- 🔑 API Keys
- 🌐 Webhook URLs
- 🔓 Authentication Tokens
- 📱 Account SIDs
- 🎫 Bearer Tokens
- 🗝️ Secret Keys
- 💳 Database Passwords

**Examples in your Webhooks project:**
```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
ACCOUNT_SID=ACxxxxxxxxxxxxx
API_KEY=SKxxxxxxxxxxxxx
API_SECRET=your_secret_here
LIFX_TOKEN=your_token_here
```

---

## 💾 How to Store Locally

### Step 1: Create `.env` Files (Never Commit!)

**Good:**
```bash
# code/express-discorder/.env
NODE_ENV=development
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/real_webhook_here
```

**Bad:**
```bash
# DON'T commit this file!
git add code/express-discorder/.env  # ❌ WRONG
```

### Step 2: Use `.env.example` as a Template

**Create safe templates for your team:**

```bash
# code/express-discorder/.env.example
NODE_ENV=development
DISCORD_WEBHOOK_URL=your_webhook_url_here
```

**Then commit ONLY the example:**
```bash
git add code/express-discorder/.env.example  # ✅ SAFE
git commit -m "Add .env template"
```

### Step 3: Ensure `.gitignore` Protects Your Files

**Root `.gitignore`:**
```
.env
.env.local
.env.staging
.env.production
.twilio-cli/
.twilioserverlessrc
.netlify/
```

**Verify it works:**
```bash
git status  # Should NOT show .env files
```

---

## 🚀 How to Transfer Between Computers

### Scenario: Moving to a New Computer

**Computer 1 (Current):**
```bash
# Your .env is local only - stays on your computer
git push origin main  # Code goes to GitHub, secrets stay local
```

**Computer 2 (New Machine):**
```bash
# Clone the repo
git clone https://github.com/wavHub/webhooks-course.git

# Navigate to project
cd webhooks-course/code/express-discorder

# Create .env from template
cp .env.example .env

# Add your actual credentials to .env
nano .env  # or open in your editor
# DISCORD_WEBHOOK_URL=your_real_webhook_here
# Save and close

# Never commit this!
git status  # .env should NOT appear (it's in .gitignore)
```

### Important Rules:

✅ **DO:**
- Keep `.env` on your local machine only
- Use `.env.example` to document what variables are needed
- Get credentials securely from password manager

❌ **DON'T:**
- Commit `.env` files
- Share credentials via Slack, email, or chat
- Hardcode credentials in your source code

---

## 👥 How to Share with Team Members

### Option 1: Using 1Password (Recommended for Teams)

**Setup:**
1. Create a 1Password team vault
2. Add vault members (your team)
3. Store credentials in the vault

**Usage:**
```
Team Member 1:
1. Open 1Password
2. Find "webhooks-course" vault
3. Copy DISCORD_WEBHOOK_URL
4. Paste into local .env file
5. Never screenshot, forward, or email it
```

**Pros:**
- ✅ End-to-end encrypted
- ✅ Audit logs (see who accessed what)
- ✅ Permission controls
- ✅ Can revoke access instantly

### Option 2: Using LastPass

Similar to 1Password - create shared folder, add team members, store credentials securely.

### Option 3: Using Bitwarden (Free & Open Source)

```bash
# Install Bitwarden CLI
npm install -g @bitwarden/cli

# Login
bw login

# Access shared credentials
bw get item "webhooks-discord-webhook"
```

### Option 4: GitHub Secrets (For CI/CD Only)

**Not for sharing between people, but for automated deployments:**

1. Go to: GitHub → Repository → Settings → Secrets and variables
2. Create a new secret: `DISCORD_WEBHOOK_URL`
3. GitHub injects it into CI/CD workflows automatically

---

## 🌐 Platform-Specific Setup

### Netlify Functions

**Never put secrets in code:**

```javascript
// ❌ WRONG
const webhookUrl = "https://discord.com/api/webhooks/123456...";

// ✅ RIGHT
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
```

**How to set environment variables in Netlify:**

1. Go to your Netlify site dashboard
2. Click: **Site Settings** → **Build & Deploy** → **Environment**
3. Click: **Add a variable**
4. Key: `DISCORD_WEBHOOK_URL`
5. Value: `https://discord.com/api/webhooks/your_real_webhook`
6. Deploy will automatically use these variables

**Important:** These are stored securely on Netlify servers, not in your code.

### Twilio Functions

**Set environment variables in `.twilioserverlessrc`:**

```json
{
  "accountSid": "ACxxxxx",
  "apiKey": "SKxxxxx",
  "apiSecret": "your_secret"
}
```

**Keep this in `.gitignore`:**
```
.twilioserverlessrc
```

Then deploy with:
```bash
twilio serverless:deploy
```

---

## ⚠️ What NOT to Do

### ❌ DON'T Share via Unencrypted Channels

| Channel | Encrypted? | Safe? | Reason |
|---------|-----------|-------|--------|
| Email | ❌ No | ❌ No | Stored on servers, forwarded, logged |
| Slack | ❌ No | ❌ No | Workspace searchable, history, admins see all |
| Discord | ❌ No | ❌ No | Visible in chat, logged forever |
| SMS | ❌ No | ❌ No | Carrier can see, easy to intercept |
| WhatsApp | ⚠️ Encrypted | ⚠️ Maybe | Can still be screenshotted, forwarded |

### ❌ DON'T Commit Secrets

```bash
# This will commit secrets to Git history (very bad!)
git add .env
git commit -m "Add credentials"
git push

# Even if you delete it later, it's still in git history!
```

### ❌ DON'T Hardcode in Code

```javascript
// ❌ NEVER do this
const apiKey = "sk_test_abc123xyz";
const webhook = "https://discord.com/api/webhooks/123456";

// ✅ DO this instead
const apiKey = process.env.API_KEY;
const webhook = process.env.DISCORD_WEBHOOK_URL;
```

### ❌ DON'T Screenshot

Screenshots of credentials can be:
- Accidentally shared
- Found in Slack history
- Stored in cloud backups
- Discovered by screen capture tools

---

## 🚨 Emergency: If Credentials Are Exposed

**If your webhook URL, API key, or token is exposed (even briefly):**

### Step 1: Immediately Revoke the Credential

**For Discord Webhooks:**
1. Go to Discord Server → Settings → Integrations → Webhooks
2. Find the exposed webhook
3. Click **Delete**
4. Create a **NEW webhook**

**For Twilio:**
1. Go to Twilio Console → API Tokens & Keys
2. Delete the exposed API Key
3. Generate a **NEW API Key**

**For LIFX:**
1. Go to LIFX Cloud → Settings
2. Revoke the exposed token
3. Generate a **NEW token**

### Step 2: Update Your Credentials

- Update local `.env` with new credentials
- Update Netlify environment variables
- Update password manager
- Update any backups

### Step 3: Check Git History

**If accidentally committed:**
```bash
# See if secret is in history
git log --all -p | grep "your_secret"

# If found, remove from history (dangerous operation)
# Contact a team lead for guidance
```

### Step 4: Communicate with Team

Tell your team:
- Which credential was exposed
- When you revoked it
- That the old credential is now worthless
- To update their local copies

---

## ✅ Security Checklist

Before pushing code:

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` is created with placeholders
- [ ] No credentials in source code comments
- [ ] No credentials in documentation
- [ ] All environment variables use `process.env.VARIABLE_NAME`
- [ ] Team members know how to get credentials (password manager)
- [ ] `.netlify/`, `.twilio-cli/`, `.twilioserverlessrc` are in `.gitignore`
- [ ] Netlify/Twilio environment variables are set in their dashboards
- [ ] Team has access to shared credential vault (1Password, LastPass, etc.)

---

## 📚 Additional Resources

- [OWASP - Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [GitHub - Protecting Sensitive Data](https://docs.github.com/en/code-security/secret-scanning)
- [1Password Team Resources](https://support.1password.com/teams/)
- [Twilio Security Best Practices](https://www.twilio.com/docs/usage/security)

---

## 🎓 Remember

**Your credentials are like your house keys:**
- Don't leave them lying around
- Don't hand them out carelessly
- Change them if you lose them
- Only share with people you trust
- Store them securely

**Questions?** Ask before committing! 🔐
