# CV Builder

**A CV builder that doesn't look like it was designed by a government committee.**

Europass is fine if you enjoy filling out forms from 2025 :) This is not that.

## What it is

A Next.js app that renders your CV as a clean, printable PDF — straight from the browser. No account, no subscription, no data sent anywhere. Just open it, fill it in, export it.

Live-editable. Click any text on the CV and type. Everything updates in real time.


## Features

- **Click-to-edit** — every field on the rendered CV is directly editable
- **JSON import/export** — save your data as a file, load it back anytime
- **Print to PDF** — `Export PDF` triggers `window.print()`. What you see is what you get.
- **Skill tags** — color-coded by type: `dev`, `data`, `domain`, `biz`
- **Sections** — About, Skills, Experience, Certifications, Honours, Languages
- **Zero backend** — runs entirely in the browser, no server, no cloud


## Stack

- Next.js 16 + React 19
- Pure CSS (no UI lib, no Tailwind, no component framework)
- `window.print()` for PDF — the most underrated browser API


## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit the CV. Click `Export PDF`.


## Data format

Your CV lives in a JSON file. Import it, edit it, export it. Schema is in [`public/schema.json`](public/schema.json).

```json
{
  "fullName": "Jane Doe",
  "jobTitle": "Software Engineer",
  "skills": [
    { "category": "Languages", "type": "dev", "value": "Python, Go, TypeScript" }
  ],
  "experience": [
    {
      "role": "Senior Engineer",
      "company": "Acme Corp",
      "start": "2021",
      "end": "Present",
      "bullets": ["Built X", "Reduced Y by 40%"],
      "tags": [{ "text": "FastAPI", "type": "dev" }]
    }
  ]
}
```


## Credits

Design inspired by the excellent templates from:
- [Yvtq8K3n/CV](https://github.com/Yvtq8K3n/CV)
- [xQsme/CV](https://github.com/xQsme/CV)

Huge thanks.


## License

MIT. Fork it, use it, make your own.
