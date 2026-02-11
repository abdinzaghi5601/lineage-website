# Family Genealogy Website - Usage Guide

## Overview

This website provides two main features:
1. **Family Tree Visualization** - View your family lineage in an interactive tree format
2. **Genealogy Form** - Fill out a comprehensive form to record family information

## Getting Started

### Viewing the Family Tree

1. Open `index.html` in your web browser
2. The family tree will automatically display
3. Click on any person in the tree to see their details

### Using the Genealogy Form

1. Click on "Genealogy Form" in the navigation menu, or open `genealogy-form.html`
2. Fill out the form section by section:
   - **Section 1**: Family Identification
   - **Section 2**: Earliest Known Ancestor
   - **Section 3**: Generation-wise Lineage (add as many generations as needed)
   - **Sections 4-11**: Additional details about the family

## Form Features

### Adding Generations

1. Scroll to "Generation-wise Lineage Record" section
2. Click the "+ Add Generation" button
3. Fill in the details for that generation:
   - Father's name, dates, profession, residence
   - Spouse details
   - Children (use "+ Add Child" for each child)

### Adding Children

1. Within any generation section, click "+ Add Child"
2. Fill in the child's information:
   - Name, date of birth, profession/education
   - Spouse name (if married)
   - Children (if any)

### Managing Data

- **Save as Draft**: Saves your progress to browser storage
- **Load Saved Data**: Restores a previously saved draft
- **Export to JSON**: Downloads all form data as a JSON file
- **Export to PDF**: Opens print dialog to save as PDF
- **Reset Form**: Clears all form data

### Submitting the Form

1. Fill out all relevant sections
2. Check the declaration checkbox at the bottom
3. Click "Submit & Generate Tree"
4. The data will be saved and you can view it in the family tree

## Data Flow

```
Genealogy Form → Save/Submit → Local Storage → Family Tree Visualization
```

When you submit the form:
1. Data is saved to browser's local storage
2. Navigate to the Family Tree page
3. The tree automatically loads and displays your form data

## Tips for Best Results

1. **Start with the earliest known ancestor** - Fill Section 2 completely
2. **Add generations in order** - Start with Generation 1, then 2, 3, etc.
3. **Be consistent with names** - Use full names consistently
4. **Save frequently** - Use "Save as Draft" to avoid losing work
5. **Export regularly** - Export to JSON as a backup

## Browser Compatibility

Works best with:
- Google Chrome (recommended)
- Microsoft Edge
- Mozilla Firefox
- Safari

## Data Privacy

- All data is stored locally in your browser
- No data is sent to any server
- Export files are saved to your computer
- Clear browser data to remove saved information

## Troubleshooting

### Form data not appearing in tree
- Make sure you clicked "Submit & Generate Tree" after filling the form
- Check that the declaration checkbox was checked
- Try refreshing the tree page

### Lost form data
- Check if you saved a draft using "Save as Draft"
- If you exported to JSON, you can manually restore it
- Always export important data as backup

### Tree not displaying
- Check browser console for errors (F12)
- Try clearing browser cache
- Ensure JavaScript is enabled

## Advanced Usage

### Manual Data Entry

You can manually edit the `familyData` object in `script.js` to add family members programmatically.

### Customization

- Edit `styles.css` to change colors and appearance
- Modify `form-styles.css` for form-specific styling
- Update form structure in `genealogy-form.html`

## Support

For issues or questions:
1. Check the browser console (F12) for error messages
2. Verify all required fields are filled
3. Ensure JavaScript is enabled
4. Try a different browser if issues persist

---

**Note**: This is a client-side application. All data remains on your computer and is not transmitted to any server.
