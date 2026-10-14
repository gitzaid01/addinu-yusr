# Complete Production Deployment Guide: Render & Netlify

This guide provides step-by-step instructions for deploying the **Addinu Yusr Institute** platform to **Render** or **Netlify**.

---

## 🏛️ Architecture & Platform Recommendations

| Component | Technology | Best Platform | Why? |
|---|---|---|---|
| **Backend API** (`/server`) | Node.js, Express, MongoDB Atlas, TypeScript | **Render** (Web Service) | Requires a persistent Node.js process and active MongoDB connection pool. Netlify is serverless and does not run persistent Express servers natively. |
| **Frontend Web** (`/client`) | Next.js 16 (App Router), React 19, Tailwind CSS | **Render** or **Netlify** | Both platforms support Next.js SSR and dynamic routing (`/courses/[id]`). |

### Recommended Deployment Strategies:
- **Strategy A (Easiest — All on Render)**: Deploy both Backend and Frontend on Render using the included `render.yaml` Blueprint. Single dashboard, unified logs, and zero cross-platform friction.
- **Strategy B (Render + Netlify)**: Deploy the Backend API on Render and the Frontend Web App on Netlify.

---

## 0. Prerequisite: MongoDB Atlas IP Access List

Before deploying, ensure Render can communicate with your MongoDB Atlas cluster:

1. Log into your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/).
2. In the left navigation bar, go to **Network Access** (under *Security*).
3. Click **+ Add IP Address**.
4. Click **Allow Access from Anywhere** (`0.0.0.0/0`) and click **Confirm**.
   > *Note: Render's free tier uses dynamic IP addresses, so `0.0.0.0/0` is required for cloud server connectivity.*
5. Copy your MongoDB connection string (e.g., `mongodb+srv://user:password@cluster0.it2nuxv.mongodb.net/?appName=Cluster0`).

---

## 1. Prepare Git Repository

If you haven't yet pushed this project to GitHub:

```bash
# 1. Initialize git repository from project root
git init

# 2. Add all files (the root .gitignore will exclude node_modules, build artifacts, and .env files)
git add .

# 3. Create initial commit
git commit -m "feat: configure production deployment for Render and Netlify"

# 4. Link to your GitHub repository and push
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

## 2. Strategy A: Deploy Everything on Render (1-Click Blueprint)

The repository includes a ready-to-use [`render.yaml`](./render.yaml) Blueprint that configures both services automatically.

### Step-by-Step Instructions:

1. Go to [dashboard.render.com](https://dashboard.render.com/) and sign in.
2. Click **New +** in the top navigation bar and select **Blueprint**.
3. Connect your GitHub account and select your repository (`addinu_yusr`).
4. Render will read `render.yaml` and display two services:
   - `addinu-yusr-api` (Backend Web Service)
   - `addinu-yusr-web` (Frontend Web Service)
5. Fill in the required environment variables:
   - **`DATABASE_URL`**: Your full MongoDB Atlas connection string.
   - **`FRONTEND_URL`**: Leave blank initially, or enter `https://addinu-yusr-web.onrender.com`.
   - **`NEXT_PUBLIC_API_URL`**: Enter `https://addinu-yusr-api.onrender.com/api`.
6. Click **Apply**.
7. Once deployed, copy your actual frontend and backend URLs from Render. If your URLs differ from the defaults:
   - Go to `addinu-yusr-api` -> **Environment** -> Update `FRONTEND_URL` with your actual frontend URL.
   - Go to `addinu-yusr-web` -> **Environment** -> Update `NEXT_PUBLIC_API_URL` with your actual API URL (must include `/api`).
   - Trigger a manual deploy of `addinu-yusr-web` so the client picks up the new environment variable.

---

## 3. Strategy B: Deploy Backend on Render + Frontend on Netlify

### Step 1: Deploy Backend on Render

1. Log into [Render](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Select your GitHub repository.
4. Configure the service settings:
   - **Name**: `addinu-yusr-api`
   - **Region**: Choose the region closest to you (e.g., Singapore, Frankfurt, Oregon)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Expand **Advanced** and set **Health Check Path**: `/health`
6. Under **Environment Variables**, add:
   | Key | Value | Description |
   |---|---|---|
   | `NODE_ENV` | `production` | Production mode |
   | `PORT` | `5000` | Port (Render will route automatically) |
   | `DATABASE_URL` | `mongodb+srv://...` | Your MongoDB Atlas connection URI |
   | `JWT_SECRET` | `generate-a-strong-random-key` | A 32+ character random string |
   | `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
   | `FRONTEND_URL` | `http://localhost:3000` | Temporary value; will update with Netlify URL in Step 3 |
7. Click **Create Web Service**. Wait for the build to finish.
8. Verify health by visiting `https://<your-render-api>.onrender.com/health`. You should receive:
   ```json
   {"status":"OK","timestamp":"..."}
   ```
9. Copy your Backend URL: `https://<your-render-api>.onrender.com`.

---

### Step 2: Deploy Frontend on Netlify

1. Log into [Netlify](https://app.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Select **GitHub** and authorize your repository.
4. Netlify will detect the configuration automatically from the included [`netlify.toml`](./netlify.toml):
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/.next` (or left blank for `@netlify/plugin-nextjs`)
5. Under **Environment variables**, click **Add a variable**:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://<your-render-api>.onrender.com/api` *(Make sure to append `/api` at the end)*
6. Click **Deploy addinu_yusr** (or **Deploy site**).
7. Netlify will build your Next.js application using Turbopack and SSR edge functions.
8. Once the deploy completes, copy your Netlify site URL (e.g., `https://addinu-yusr.netlify.app`).

---

### Step 3: Link Backend CORS to Netlify

Now that you have your live Netlify frontend URL:

1. Go back to your [Render Dashboard](https://dashboard.render.com/).
2. Select your `addinu-yusr-api` service.
3. In the left menu, click **Environment**.
4. Update `FRONTEND_URL` to:
   ```
   https://<your-netlify-site>.netlify.app,http://localhost:3000
   ```
   *(The backend server supports comma-separated URLs and wildcard subdomains, so both your live Netlify site and local dev are permitted without CORS errors!)*
5. Click **Save Changes**. Render will automatically restart the backend service.

---

## 4. Verification & Testing Checklist

Once deployed, run through this quick checklist to confirm everything is running smoothly:

1. **Backend Health Check**:
   - Open `https://<your-backend-url>/health` in your browser.
   - Result: `{"status":"OK","timestamp":"..."}`.
2. **Catalog Page**:
   - Open `https://<your-frontend-url>/courses`.
   - Result: Loads cleanly without JavaScript errors in browser DevTools (Console / Network tab).
3. **Account Creation**:
   - Go to `/login` -> Click **REGISTER** -> Select **ADMIN SCHOLAR** or **STUDENT**.
   - Create a test account.
   - Result: JWT token is stored, and you are redirected to the Admin or Student console.
4. **Admin Course Creation**:
   - While logged in as an Admin, go to `/admin` -> **COURSES** -> Fill in details and click **SAVE & PUBLISH COURSE**.
   - Result: The course appears immediately in `/courses`.

---

## 5. Troubleshooting & FAQ

### Issue: "NetworkError when attempting to fetch resource" or CORS error
- **Cause**: The frontend is trying to call `http://localhost:5000` instead of your deployed Render backend, or the backend CORS rejected the frontend domain.
- **Fix**:
  1. Check Netlify or Render frontend environment variable: `NEXT_PUBLIC_API_URL` must equal `https://<your-backend-api>.onrender.com/api`.
  2. If you changed `NEXT_PUBLIC_API_URL`, you **must trigger a redeploy/rebuild** of the frontend, because Next.js bakes `NEXT_PUBLIC_*` variables into the static bundle during `npm run build`.
  3. Ensure Render backend `FRONTEND_URL` includes your exact frontend domain.

### Issue: Backend crashes on startup with `MongooseServerSelectionError`
- **Cause**: MongoDB Atlas blocked the connection.
- **Fix**: Go to MongoDB Atlas -> Network Access -> Ensure `0.0.0.0/0` is added to the IP Access List.

### Issue: Render Free Tier Spin-Down / Delay on first request
- **Cause**: Render's free tier services spin down after 15 minutes of inactivity. The first request after spin-down may take ~30-50 seconds to wake up.
- **Fix**: This is expected on the free tier. For zero latency, upgrade the backend service to the Render "Starter" plan ($7/mo) or use a free uptime pinger (like Cron-job.org or UptimeRobot) pinging `/health` every 10 minutes.
