# GitHub Actions Workflows

This directory contains CI/CD workflows for the HCBE frontend.

## Vercel Deployment (`vercel-deploy.yml`)

Triggers:
- Pull requests to `main`: build and deploy a Vercel preview.
- Pushes to `main`: build and deploy to Vercel production.
- Manual trigger: choose `preview` or `production`.

Required GitHub secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Setup

1. Create a Vercel token from Account Settings > Tokens.
2. Link the project locally once if needed:

```bash
vercel link
```

3. Read `.vercel/project.json` locally to get:

```text
VERCEL_ORG_ID=<orgId>
VERCEL_PROJECT_ID=<projectId>
```

4. Add all three values to GitHub:

Repository > Settings > Secrets and variables > Actions.

Do not commit `.vercel/project.json`; keep project IDs in GitHub secrets only.
