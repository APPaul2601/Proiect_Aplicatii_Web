# Quick Deployment Checklist for Professor Submission

## ✅ What's Been Done

- [x] Serverless API functions created in `/api` folder
- [x] `vercel.json` configured for proper deployment
- [x] `.gitignore` set up
- [x] Root `package.json` created
- [x] Frontend `.env.local` ready
- [x] `DEPLOYMENT.md` guide created

## 🚀 Next Steps (In Order)

### 1. **Create MongoDB Atlas Cluster** (5 minutes)

- Go to https://mongodb.com
- Sign up free
- Create M0 free cluster
- Get connection string

### 2. **Push to GitHub** (2 minutes)

```bash
cd c:\Users\Paul\Desktop\Proiect_Aplicatii_Web
git init
git add .
git commit -m "Castle Clicker Game - Ready for deployment"
```

- Create repo on GitHub
- Push code

### 3. **Deploy to Vercel** (3 minutes)

- Go to vercel.com → New Project
- Import GitHub repo
- Add Environment Variables:
  - `MONGODB_URI` = your connection string
  - `JWT_SECRET` = random secret key
- Click Deploy

### 4. **Test & Update Frontend API URL** (2 minutes)

- Get your Vercel domain from deployment
- Update frontend `.env.local`:
  ```
  REACT_APP_API_URL=https://your-domain.vercel.app/api
  ```
- Redeploy frontend

### 5. **Submit Links to Professor**

- Frontend: `https://your-domain.vercel.app`
- API: Same domain, routes like `/api/auth/login`

## 📝 Important Notes

**Local Development:**

- Set `REACT_APP_API_URL=http://localhost:5000/api` in `frontend/.env.local`
- Run backend: `npm start` (from backend folder)
- Run frontend: `npm start` (from frontend folder)

**Production:**

- Set `REACT_APP_API_URL=https://your-vercel-domain.vercel.app/api`
- Everything runs on Vercel automatically

## 💡 If You Get Errors

1. **Build fails**: Check Vercel logs in dashboard
2. **API 404**: Verify API_URL is correct in frontend
3. **Database fails**: Check MongoDB URI and whitelist IP
4. **Auth fails**: Ensure JWT_SECRET is set in Vercel

See `DEPLOYMENT.md` for detailed troubleshooting!
