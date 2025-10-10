# Deployment Guide for Auto Key Deals

## 🚀 Deploy to Vercel via GitHub

### **Step 1: Create GitHub Repository**

1. **Create a new repository** on GitHub (e.g., `auto-key-deals`)
2. **Initialize and push** your code:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Auto Key Deals website with Angular + Vercel"

# Connect to GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/auto-key-deals.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 2: Connect to Vercel**

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import** your `auto-key-deals` repository
5. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `frontend/dist/frontend`
   - **Install Command**: `npm install`

### **Step 3: Deploy**

1. **Click "Deploy"**
2. **Wait** for the deployment to complete (~2-3 minutes)
3. **Visit** your live website at the provided Vercel URL

### **Step 4: Environment Variables (Optional)**

If you need any environment variables:

1. **Go to** Project Settings → Environment Variables
2. **Add variables** like:
   - `NODE_ENV=production`
   - Any API keys or configuration

### **Step 5: Custom Domain (Optional)**

1. **Go to** Project Settings → Domains
2. **Add** your custom domain
3. **Configure** DNS settings as instructed

---

## 🔧 Vercel Configuration

Your project includes these Vercel-specific files:

### **vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist/frontend" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/frontend/dist/frontend/index.html" }
  ]
}
```

### **API Functions**
- `api/products.js` - Products endpoint
- `api/contact.js` - Contact form handler

---

## 🌐 URLs After Deployment

- **Production Site**: `https://your-project-name.vercel.app`
- **API Endpoints**:
  - Products: `https://your-project-name.vercel.app/api/products`
  - Contact: `https://your-project-name.vercel.app/api/contact`

---

## 🔄 Automatic Deployments

Every push to the `main` branch will automatically trigger a new deployment.

### **Development Workflow**:

1. **Make changes** locally
2. **Test** with `npm run dev:frontend`
3. **Build** with `npm run build`
4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
5. **Vercel automatically deploys** the changes

---

## 🛠 Troubleshooting

### **Common Issues**:

1. **Build Fails**: Check `package.json` scripts and dependencies
2. **API Not Working**: Verify serverless functions in `/api` directory
3. **Routing Issues**: Check `vercel.json` routing configuration
4. **Environment Variables**: Ensure they're set in Vercel dashboard

### **Local Testing**:

```bash
# Test frontend build
npm run build

# Test development servers
npm run dev:frontend  # Port 4200
npm run dev:backend   # Port 3000
```

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues for bugs or feature requests
- **Build Logs**: Available in Vercel dashboard

---

**Ready to deploy! 🚀**