# aroum.github.io

## Run Locally

```bash
npm run dev
```

## Deploy

### Manual Deploy
```bash
npm run deploy
```

### Automatic Deploy
This repository uses GitHub Actions to automatically build and deploy changes.
- Pushing to the `main` branch triggers a new deployment to `gh-pages`.
- Ensure GitHub Actions are enabled in your repository settings.

## Add New Data

To add a new dataset to the application, follow these steps:

### 1. Add CSV File
Place your `.csv` file in the `public/data/csv` folder.

**Special Columns:**
- **`pic` or `pics`**: Used for displaying images (see details below).
- **`link` or `links`**: Used for external links. If a cell contains a URL, it will be rendered as a clickable "click" link.

### 2. Register Dataset
Open `src/constants.ts` and add a new entry to the `DATASETS` array.

Example:
```typescript
{
  id: "my-new-dataset",          // Unique ID
  name: "My New Dataset",        // Display name
  description: "Description...", // Short description
  filename: "my-dataset.csv",    // Filename in public/data/csv/
  category: "My Category",       // Category for grouping
},
```

### 3. Add Images
If you want to display images in your table:

1.  Ensure your CSV has a column named `pic` or `pics`.
2.  **Local Images**:
    - Place image files in the `public/data/pics` folder. You can create subfolders there (e.g., `public/data/pics/my-folder/img.jpg`).
    - In the CSV column, specify the path relative to the `pics` folder (e.g., `my-folder/img.jpg`).
3.  **External Images**:
    - You can also use full URLs (starting with `http` or `https`) directly in the CSV column.

### 4. Add Links
If you want to add a column with links:

1.  Ensure your CSV has a column named `link` or `links`.
2.  Put the full URL (e.g., `https://example.com`) in the cell.
3.  It will be rendered as a clickable link in the table.

## Contributing

We welcome contributions from the community! Whether you have new keyboard switch data, corrections for existing records, or feature improvements, your help is appreciated.

- **Found a bug or have a suggestion?** Please open an [Issue](https://github.com/aroum/aroum.github.io/issues).
- **Want to add data directly?** Feel free to fork the repository, add your CSV files (following the guide above), and submit a **Pull Request**.

## Acknowledgements

Special thanks to the following community members who helped collect data, verify information, and improve this project:

- [@krikun98](github.com/krikun98/)
- [@psswhite](github.com/psswhite/)
