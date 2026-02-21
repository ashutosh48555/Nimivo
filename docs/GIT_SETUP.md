# Git Setup & Workflow Documentation

## Current Repository Configuration

This project uses a **fork-based collaboration workflow**.

### Remote Configuration

```
origin   → https://github.com/ashutosh48555/Nimivo.git (your fork)
upstream → https://github.com/Pankaj-Bashera/Nimivo.git (original repo)
```

### Commands to Verify Setup
```bash
git remote -v
```

Should output:
```
origin    https://github.com/ashutosh48555/Nimivo.git (fetch)
origin    https://github.com/ashutosh48555/Nimivo.git (push)
upstream  https://github.com/Pankaj-Bashera/Nimivo.git (fetch)
upstream  https://github.com/Pankaj-Bashera/Nimivo.git (push)
```

## Workflow Guide

### 1. Make Changes Locally
```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Stage and commit
git add .
git commit -m "Your descriptive commit message"
```

### 2. Push to Your Fork
```bash
# Push to your fork (origin)
git push origin feature/your-feature-name
```

### 3. Create a Pull Request
- Go to https://github.com/ashutosh48555/Nimivo
- GitHub will prompt you to create a PR to the original repo
- Create PR from your fork → `Pankaj-Bashera/Nimivo`

### 4. Sync with Original Repo
```bash
# Fetch latest from original repo
git fetch upstream

# Rebase your branch on latest upstream main
git rebase upstream/main

# Or merge if you prefer
git merge upstream/main
```

### 5. Common Commands Reference

```bash
# View all remotes
git remote -v

# Pull from your fork
git pull origin main

# Push to your fork
git push origin main

# Sync with original repo
git pull upstream main

# Create a new branch
git checkout -b feature/branch-name

# List branches
git branch -a

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

## Important Notes

⚠️ **NEVER push directly to upstream** - All commits go to your fork first
- Your changes: `git push origin`
- Original repo updates: `git pull upstream main`

✅ **Always create PRs** for code review before merging to original repo

✅ **Before starting new work**, sync with upstream:
```bash
git fetch upstream
git rebase upstream/main
```

## AI Assistant Instructions

When using AI tools to make changes and push:
1. Make edits locally
2. Push only to `origin` (your fork): `git push origin <branch-name>`
3. Never push to `upstream`
4. Create PRs manually on GitHub for review
5. For multi-file changes, use atomic commits with clear messages
