# Wordled: setup guide

Files: `index.html` (the game), `config.js` (your settings), `apps-script.gs` (collects entries).
You only ever edit `config.js`.

## Part 1: Collect entries in a Google Sheet (free)
GitHub Pages can only show a page; it cannot store entries. So entries go into a Google Sheet,
which you can download as a CSV at any time.

1. Go to sheets.google.com and create a blank sheet. Name it "Wordled entries".
2. Click Extensions, then Apps Script. Delete the sample code and paste in all of `apps-script.gs`. Click Save.
3. Click Deploy, then New deployment. Click the gear icon and choose Web app.
   - Execute as: Me
   - Who has access: Anyone
4. Click Deploy and approve the permissions. Copy the Web app URL.
5. Open `config.js` and paste the URL between the quotes of `entryEndpoint`.

Using the entries:
- Download CSV: in the sheet, File, Download, Comma Separated Values (.csv).
- Draw a winner: reload the sheet, then use the new "Lantern Draw" menu, Draw a winner. It shows the name and email.
- Duplicate emails are rejected automatically.

If you change the Apps Script later, use Deploy, Manage deployments, edit, New version.

## Part 2: Put the game on GitHub Pages
1. On github.com click + then New repository. Name it (for example `wordled`), set it to Public, click Create.
2. Click "uploading an existing file", drag in `index.html` and `config.js` (keep these names), click Commit changes.
3. Go to Settings, then Pages. Set Source to Deploy from a branch, branch `main`, folder `/ (root)`. Save.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

To change words, title or fields later: open `config.js` on GitHub, click the pencil icon, edit, commit.

## Notes
- The "you won" check runs in the browser, so a determined player could skip it. That is fine for a casual prize draw.
- Do not put passwords or tokens in these files; the repository is public.
