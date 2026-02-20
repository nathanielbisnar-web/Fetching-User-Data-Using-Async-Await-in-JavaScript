# Web Fetch User

Small static app that fetches a user from a public API and displays Name, Email, City.

To open locally:

- With Python 3 (quick):

```bash
cd web-fetch-user
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

- With `npx serve`:

```bash
cd web-fetch-user
npx serve -l 8000
```

- Or open the folder in VS Code and use Live Server extension.

Public API used: `https://jsonplaceholder.typicode.com/users/1`