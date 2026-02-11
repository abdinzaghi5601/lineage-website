# Form Management & Version Control System

## Overview

The genealogy form now includes a comprehensive form management system that allows multiple family members to create, edit, and maintain multiple forms with proper version control.

## Key Features

### 1. **Form Numbering System**
- Each form gets a unique sequential number (Form #1, Form #2, etc.)
- Numbers are automatically assigned when creating new forms
- Form numbers are displayed prominently throughout the interface

### 2. **Version Control**
- Each form can have multiple versions (1.0, 1.1, 1.2, etc.)
- Create new versions to preserve history while making changes
- Track which version you're editing
- View complete version history

### 3. **Edit/Amend Functionality**
- Load any existing form for editing
- Make corrections (spelling, additions, summaries)
- Save as new version or update existing
- Clear edit mode indicator shows when you're editing

### 4. **Form Management**
- **New Form**: Create a fresh form with new number
- **Load Form**: Browse and select existing forms to edit
- **Form History**: View all versions of a specific form
- **Delete Form**: Remove forms (with confirmation)

### 5. **Change Tracking & Audit Trail**
- Automatic tracking of who made changes
- Timestamp for each edit
- Change summary showing what was modified
- Last 10 changes kept in history

## How to Use

### Creating a New Form

1. Click **"+ New Form"** button
2. A new form number is automatically assigned
3. Start filling out the form
4. Data auto-saves every 2 seconds

### Editing an Existing Form

1. Click **"📂 Load Form"** button
2. Browse the list of saved forms
3. Click **"Edit"** on the form you want to modify
4. Make your changes (fix spelling, add information, etc.)
5. Save - it will create a new version automatically

### Creating a New Version

1. Load an existing form
2. Click **"New Version"** button
3. A new version number is assigned (e.g., 1.0 → 1.1)
4. Make your changes
5. Save - preserves original and creates new version

### Viewing Version History

1. Load a form first
2. Click **"📋 History"** button
3. See all versions of that form
4. Compare or load any previous version

## Form Storage

### Storage Structure

Forms are saved with unique keys:
```
genealogy-form-{formId}
```

Each form contains:
- Form number (sequential)
- Version number (incremental)
- All form data
- Change history
- Metadata (dates, compiler, etc.)

### Multiple Users

Multiple family members can:
- Create their own forms
- Edit existing forms (creates new version)
- View all forms
- Track who made what changes

## Form Status Indicators

- **Draft**: New form, not yet submitted
- **Edit Mode**: Currently editing an existing form
- **Submitted**: Form has been finalized

## Best Practices

1. **Use Version Control**: Create new versions instead of overwriting
2. **Add Summaries**: Use the notes sections to document changes
3. **Name Compiler**: Always fill in compiler name for tracking
4. **Regular Backups**: Export to JSON regularly
5. **Clear Naming**: Use family name field to identify forms

## Example Workflow

### Scenario: Fixing a Spelling Mistake

1. **Load Form**: Click "Load Form" → Select Form #5
2. **Edit**: Find the misspelled name and correct it
3. **Save**: Click "Save as Draft"
4. **Result**: New version 1.1 created with correction
5. **History**: Original version 1.0 preserved

### Scenario: Adding New Information

1. **Load Form**: Select the form to update
2. **Create Version**: Click "New Version" (optional but recommended)
3. **Add Data**: Fill in new generation or child information
4. **Save**: Save as draft or submit
5. **Tree Updates**: Family tree automatically updates

## Technical Details

### Form Numbering
- Starts at 1
- Increments automatically
- Never reused (even if forms deleted)
- Stored in form metadata

### Version Numbering
- Starts at 1.0 for new forms
- Increments by 0.1 (1.0 → 1.1 → 1.2)
- Tracks parent form ID
- Maintains relationship to original

### Change Tracking
- Records editor name
- Timestamps all changes
- Summarizes modifications
- Maintains audit trail

## Troubleshooting

### Can't find a form?
- Check if it was deleted
- Look in "Load Form" list
- Forms are stored in browser - clear cache may remove them

### Version not showing?
- Make sure you loaded the form first
- Check that form has multiple versions
- Try refreshing the page

### Changes not saving?
- Check browser storage space
- Ensure JavaScript is enabled
- Try manual "Save as Draft"

---

**The system is designed for collaborative family genealogy work with full version control and change tracking!** 📋✨
