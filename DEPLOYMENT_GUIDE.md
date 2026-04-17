# BonyanMisr Website - Hostinger Deployment Guide

## 🔒 Security Features Implemented

This website is configured for **static export** with security headers managed via `.htaccess` file.

### Security Headers (via .htaccess)
- ✅ X-Frame-Options (Clickjacking protection)
- ✅ X-Content-Type-Options (MIME sniffing protection)
- ✅ X-XSS-Protection (Cross-site scripting protection)
- ✅ Strict-Transport-Security (HTTPS enforcement with 2-year max-age)
- ✅ Content-Security-Policy (XSS and injection protection)
- ✅ Referrer-Policy (Privacy protection)
- ✅ Permissions-Policy (Feature access control)

### Additional Security
- ✅ Automatic HTTPS redirect
- ✅ Directory browsing disabled
- ✅ Sensitive files protected
- ✅ Server signature hidden

### Performance Features
- ✅ Gzip compression enabled
- ✅ Browser caching configured
- ✅ Image optimization (WebP/AVIF)
- ✅ Static HTML export (fastest loading)

---

## 📋 Pre-Deployment Checklist

### 1. Verify Configuration
The website is already configured for static export in `next.config.ts`:
```typescript
output: 'export',  // Static export enabled
images: {
  unoptimized: true,  // Required for static export
}
```

### 2. Security File Ready
The `.htaccess` file is in `public/.htaccess` and will be included in the build automatically.

---

## 🚀 Deployment Steps

### Step 1: Build the Static Site

```bash
cd bonyanmisr-nextjs
npm install
npm run build
```

This creates an `out/` folder with all static HTML, CSS, JS, and assets.

### Step 2: Upload to Hostinger

#### Option A: Using File Manager (Recommended)

1. Log in to Hostinger control panel (hPanel)
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. **Delete all existing files** in the folder (or backup first)
5. Upload **all contents** from the `out` folder (not the folder itself, just its contents)
6. Verify that `.htaccess` file is present in the root

#### Option B: Using FTP/SFTP

1. Connect using FTP client (FileZilla, WinSCP, etc.)
2. Navigate to `public_html`
3. Delete existing files (or backup first)
4. Upload all contents from the `out` folder
5. Verify `.htaccess` file is uploaded

### Step 3: Enable SSL Certificate

1. In hPanel, go to **SSL**
2. Click **Install SSL** (Hostinger provides free SSL)
3. Select your domain
4. Wait 10-15 minutes for activation
5. Test: Visit `http://yourdomain.com` - should redirect to `https://`

### Step 4: Verify Security Headers

After deployment, test security headers:

1. Visit: https://securityheaders.com
2. Enter your domain
3. Verify all headers are present

Expected results:
- X-Frame-Options: SAMEORIGIN ✅
- X-Content-Type-Options: nosniff ✅
- Strict-Transport-Security: Present ✅
- Content-Security-Policy: Present ✅

If headers are missing:
- Verify `.htaccess` is in the root directory
- Contact Hostinger support to ensure `mod_headers` is enabled
- Clear browser cache and test again

### Step 5: Test the Website

1. **Homepage**: https://yourdomain.com
2. **All pages**: Test navigation (Home, Services, Portfolio, Careers, Contact)
3. **Both languages**: Test English and Arabic versions
4. **Mobile**: Test on mobile devices
5. **WhatsApp links**: Verify they open correctly
6. **Forms**: Test contact forms
7. **Images**: Verify all images load
8. **HTTPS**: Ensure HTTP redirects to HTTPS

---

## 🌐 Domain Configuration

### If Using Custom Domain

1. **In your domain registrar** (GoDaddy, Namecheap, etc.):
   - Add **A Record**: Point to Hostinger IP (get from hPanel)
   - Add **CNAME**: www → yourdomain.com

2. **In Hostinger hPanel**:
   - Go to **Domains**
   - Add your domain
   - Point to your hosting account
   - Wait 24-48 hours for DNS propagation

---

## 🐛 Troubleshooting

### Issue: Site not loading
- Verify all files from `out` folder are uploaded to `public_html`
- Check that `index.html` exists in the root
- Clear browser cache and try again
- Check file permissions (should be 644 for files, 755 for folders)

### Issue: Security headers not working
- Verify `.htaccess` file is in the root directory
- Contact Hostinger support to ensure `mod_headers` is enabled
- Check `.htaccess` syntax for errors
- Clear browser cache and test with: https://securityheaders.com

### Issue: HTTPS redirect not working
- Ensure SSL certificate is active in hPanel
- Verify `.htaccess` file contains the HTTPS redirect rules
- Wait a few minutes for DNS propagation
- Clear browser cache

### Issue: Images not loading
- Check that all files from `out` folder are uploaded
- Verify image paths are correct (should be relative paths)
- Check browser console for 404 errors
- Ensure file names match exactly (case-sensitive)

### Issue: Pages showing 404 errors
- Verify all HTML files from `out` folder are uploaded
- Check that folder structure is maintained
- Ensure `.htaccess` is present
- Try accessing pages with `.html` extension

### Issue: Arabic text not displaying correctly
- Verify UTF-8 encoding in `.htaccess`:
  ```apache
  AddDefaultCharset UTF-8
  ```
- Check that HTML files have UTF-8 charset meta tag

---

## ⚡ Performance Optimization

### 1. Enable Hostinger CDN (if available)
- Go to hPanel → Website → CDN
- Enable Cloudflare integration
- This will speed up your site globally

### 2. Verify Caching
The `.htaccess` file includes browser caching rules:
- Images: 1 year cache
- CSS/JS: 1 month cache
- HTML: No cache (always fresh)

Test with: https://gtmetrix.com

### 3. Image Optimization
Images are already optimized during build:
- WebP format used where supported
- AVIF format used where supported
- Proper sizing and compression

### 4. Monitor Performance
- Use Google PageSpeed Insights: https://pagespeed.web.dev
- Aim for 90+ score on mobile and desktop
- Check Core Web Vitals

---

## 🔄 Updates & Maintenance

### To Update the Website

1. Make changes locally in your code
2. Test thoroughly: `npm run dev`
3. Build new static export: `npm run build`
4. Upload contents of `out` folder to Hostinger (replace existing files)
5. Clear browser cache and test

### Regular Maintenance

- **Weekly**: Check website for issues
- **Monthly**: Update dependencies (`npm update`)
- **Monthly**: Review security headers
- **Quarterly**: Check SSL certificate (Hostinger auto-renews)
- **Quarterly**: Run security audit (`npm audit`)

---

## 📊 Monitoring & Analytics

### 1. Uptime Monitoring
Use UptimeRobot (free): https://uptimerobot.com
- Monitor website availability 24/7
- Get alerts if site goes down

### 2. Google Analytics (Optional)
Add tracking code to your pages for visitor analytics

### 3. Google Search Console
- Submit your sitemap: `https://yourdomain.com/sitemap.xml`
- Monitor search performance
- Check for crawl errors

---

## 🧪 Testing Tools

### Security
- Security Headers: https://securityheaders.com
- SSL Test: https://www.ssllabs.com/ssltest/
- Security Scan: https://observatory.mozilla.org

### Performance
- PageSpeed Insights: https://pagespeed.web.dev
- GTmetrix: https://gtmetrix.com
- WebPageTest: https://www.webpagetest.org

### Mobile & SEO
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Rich Results Test: https://search.google.com/test/rich-results

---

## ✅ Final Checklist

Before going live:
- [ ] SSL certificate installed and active
- [ ] HTTPS redirect working (test: http://yourdomain.com)
- [ ] Security headers verified (test: https://securityheaders.com)
- [ ] All pages loading correctly
- [ ] Both languages (English/Arabic) working
- [ ] Mobile responsiveness checked
- [ ] All images loading
- [ ] WhatsApp links working
- [ ] Contact forms tested
- [ ] Performance score 90+ (test: https://pagespeed.web.dev)
- [ ] Backup created in hPanel
- [ ] Domain DNS configured (if using custom domain)

---

## 📞 Support Resources

### Hostinger Support
- **Live Chat**: 24/7 available in hPanel
- **Email**: support@hostinger.com
- **Knowledge Base**: https://support.hostinger.com
- **Tutorials**: https://www.hostinger.com/tutorials

### Next.js Documentation
- Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Deployment: https://nextjs.org/docs/deployment

---

## 🎯 Quick Reference

### Build Command
```bash
npm run build
```

### Upload Location
Upload contents of `out` folder to `public_html`

### Important Files in Build
- `index.html` - Home page
- `.htaccess` - Security headers and redirects
- `404.html` - Error page
- `robots.txt` - SEO configuration
- `sitemap.xml` - Search engine sitemap (if generated)

### File Structure After Upload
```
public_html/
├── .htaccess          (security & redirects)
├── index.html         (home page)
├── 404.html           (error page)
├── robots.txt         (SEO)
├── _next/             (Next.js assets)
├── images/            (your images)
├── en/                (English pages)
├── ar/                (Arabic pages)
└── ...                (other files)
```

---

## 🎉 You're Ready!

Your BonyanMisr website is now secure and ready for production on Hostinger!

**Deployment Type**: Static Export (HTML/CSS/JS)
**Hosting Requirements**: Any Hostinger plan with SSL support
**No Node.js Required**: This is a static site, works on basic hosting

**Last Updated**: February 2026
**Next.js Version**: 15.x
