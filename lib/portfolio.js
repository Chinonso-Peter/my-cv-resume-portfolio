import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

export function getPortfolioData() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return null;
    }
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading portfolio.json:', error);
    return null;
  }
}

export async function savePortfolioData(data) {
  const jsonContent = JSON.stringify(data, null, 2);
  let localSaved = false;

  // 1. Local filesystem write (succeeds in localhost development)
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_PATH, jsonContent, 'utf-8');
    localSaved = true;
  } catch (err) {
    console.warn('Local filesystem write note (read-only on serverless):', err.message);
  }

  // 2. GitHub repository commit (succeeds in Vercel or cloud environments with GITHUB_TOKEN)
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const repoOwner = process.env.GITHUB_REPO_OWNER || 'Chinonso-Peter';
  const repoName = process.env.GITHUB_REPO_NAME || 'my-cv-resume-portfolio';

  if (token) {
    try {
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/portfolio.json`;

      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'Portfolio-CMS-Admin',
        },
      });

      let sha = undefined;
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      }

      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Portfolio-CMS-Admin',
        },
        body: JSON.stringify({
          message: 'chore(cms): update portfolio.json via admin dashboard',
          content: Buffer.from(jsonContent).toString('base64'),
          sha,
          branch: 'main',
        }),
      });

      if (putRes.ok) {
        return true;
      }
    } catch (githubErr) {
      console.error('GitHub API commit error:', githubErr);
    }
  }

  return localSaved;
}
