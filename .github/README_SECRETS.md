# GitHub Secrets Setup for Cloudflare Deployment

## Required Secrets

Add these in GitHub repo → Settings → Secrets and variables → Actions:

| Secret Name | How to get it |
|-------------|---------------|
| `CLOUDFLARE_API_TOKEN` | Create at https://dash.cloudflare.com/profile/api-tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Found in Workers & Pages dashboard URL or run `wrangler whoami` |

## Creating CLOUDFLARE_API_TOKEN

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Click "Create Custom Token"
4. Name: `GitHub Deploy - shinhan-pos`
5. Account permissions:
   - Workers & Pages: Edit
6. Zone permissions: None needed
7. Click "Create Token"
8. Copy the token immediately (shown only once)
9. Add to GitHub: repo → Settings → Secrets → Actions → New repository secret
   - Name: `CLOUDFLARE_API_TOKEN`
   - Secret: paste the token

## Creating CLOUDFLARE_ACCOUNT_ID

1. Log into Cloudflare Dashboard
2. Go to Workers & Pages
3. Your account ID is shown in the right sidebar or in any worker URL:
   `https://dash.cloudflare.com/<ACCOUNT_ID>/workers/overview`
4. Copy it and add to GitHub as `CLOUDFLARE_ACCOUNT_ID`
