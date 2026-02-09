# Family Lineage Website

A beautiful, modern, and interactive website for displaying the family lineage of Munawwar Chand Sahib (رحمۃ اللہ علیہ).

## Features

- **Modern Design**: Clean, professional interface with gradient headers and smooth animations
- **Interactive Family Tree**: Visual representation of family relationships
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Arabic/Urdu Support**: Proper rendering of Arabic text and Islamic honorifics
- **Detailed Information**: Comprehensive family details with descriptions and relationships
- **Easy to Update**: Simple data structure for adding new family members

## File Structure

```
lineage website/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Interactive functionality and family tree
└── README.md       # This file
```

## How to Use

1. **View the Website**: Simply open `index.html` in any modern web browser
2. **No Server Required**: This is a static website that works offline
3. **Update Family Data**: Edit the `familyData` object in `script.js` to add or modify family members

## Updating Family Information

To add or update family members, edit the `familyData` object in `script.js`:

```javascript
const familyData = {
    name: "Person Name",
    title: "(رحمۃ اللہ علیہ)",  // Optional
    description: "Description here",
    children: [
        {
            name: "Child Name",
            description: "Child description",
            children: [
                // Grandchildren here
            ]
        }
    ]
};
```

### Structure:
- `name`: Full name of the person
- `title`: Optional Arabic honorific
- `description`: Brief description or role
- `children`: Array of child objects (can be nested for multiple generations)

## Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    /* ... more colors */
}
```

### Fonts
The website uses:
- **Inter**: For English text
- **Noto Sans Arabic**: For Arabic/Urdu text

Fonts are loaded from Google Fonts. You can change them in the `<head>` section of `index.html`.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Option 1: GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Your site will be live at `username.github.io/repository-name`

### Option 2: Netlify
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be live instantly

### Option 3: Any Web Host
Upload all files to your web hosting service via FTP or file manager.

## Features in Detail

### Family Tree Visualization
- Interactive tree showing relationships
- Color-coded by generation level
- Hover effects for better interactivity
- Click nodes to see details

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly on mobile devices

### Print Support
- Optimized CSS for printing
- Clean layout when printed
- Preserves important information

## Maintenance Tips

1. **Regular Updates**: Keep family information current
2. **Backup**: Save copies before making major changes
3. **Test**: Check on different devices and browsers
4. **Validate**: Ensure all names and relationships are accurate

## Support

For questions or issues:
- Check the code comments in `script.js` for data structure details
- Review `styles.css` for styling customization
- Ensure all file paths are correct if moving files

## License

This is a personal family website. Feel free to use and modify as needed.

---

**Note**: This website is designed to be easily maintainable and updateable. The family tree structure can be expanded as more information becomes available.
