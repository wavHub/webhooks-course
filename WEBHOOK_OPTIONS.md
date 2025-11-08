# Webhook Configuration Options

This project has two webhook implementations: Express (local) and Netlify (cloud).

## Option 1: Express Server + ngrok (Local Development)

**Use this for:** Testing and debugging locally

1. Start the Express server:
   ```bash
   cd code/express-discorder
   npm run dev
   ```

2. Start ngrok in another terminal:
   ```bash
   ngrok http 3000
   ```

3. Copy the ngrok public URL (e.g., `https://abc123.ngrok.io`)

4. Set GitHub webhook to: `https://abc123.ngrok.io/github`

**Pros:**
- Full control for testing
- See logs in real-time
- Easy to debug

**Cons:**
- Requires your machine to be running
- ngrok URL changes each session (without paid plan)

---

## Option 2: Netlify Functions (Cloud Deployment)

**Use this for:** Production and always-on webhooks

1. Deploy to Netlify:
   ```bash
   cd code/netlify-discorder
   npx netlify deploy --prod
   ```

2. Get your Netlify function URL from the deployment output

3. Set GitHub webhook to: `https://your-netlify-site.netlify.app/.netlify/functions/discorder`

**Pros:**
- Always running, no manual setup needed
- Permanent URL
- Scalable and reliable
- Free tier available

**Cons:**
- Harder to debug locally
- Need to redeploy for changes

---

## Current Status

- ✅ Express Server: Running on `localhost:3000`
- ✅ Netlify: Deployed and live
- ⏸️ ngrok: Paused (start when testing locally)

## Recommended Setup

Use **Netlify** for production webhooks, and use **Express + ngrok** only when you need to test changes locally.
