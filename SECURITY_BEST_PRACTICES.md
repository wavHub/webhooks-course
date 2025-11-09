# Security Best Practices

## ⚠️ Critical: Environment Variables (.env)

### Rule: ALWAYS add `.env` to `.gitignore`

**Never commit `.env` files to version control!**

Environment files contain sensitive information like:
- API keys
- Webhook URLs
- Database passwords
- Secret tokens
- Authentication credentials

### How to Set Up Properly

1. **Add `.env` to `.gitignore` immediately:**
   ```bash
   echo ".env" >> .gitignore
   git add .gitignore
   git commit -m "Ensure .env is in .gitignore"
   ```

2. **Create a `.env.example` template** (safe to commit):
   ```
   NODE_ENV=development
   DISCORD_WEBHOOK_URL=your_webhook_url_here
   ```

3. **If you accidentally commit `.env`:**
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from version control"
   git push origin main
   ```

### For This Project

- ✅ `.env` files are in `.gitignore`
- ✅ `.env.example` templates are provided
- ✅ Discord webhook URLs should NEVER be in committed files

### Regenerating Exposed Webhooks

If a webhook URL is exposed (even briefly):

1. Delete the old webhook in Discord
2. Create a new webhook
3. Update your local `.env` with the new URL
4. Redeploy to Netlify with the new URL

---

## Other Security Notes

- ✅ Keep API keys and secrets in `.env` files only
- ✅ Never hardcode credentials in source code
- ✅ Use environment variables for all sensitive data
- ✅ Review `.gitignore` before pushing to GitHub
- ✅ Check Git history if you suspect exposed credentials

---

## Webhook URL Security

Discord webhook URLs are like passwords:
- Anyone with the URL can POST to your channel
- They should be treated as secrets
- Regenerate them if they're ever exposed

---

**Last Updated:** November 9, 2025
