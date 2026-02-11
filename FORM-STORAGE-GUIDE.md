# Form Storage & Access Guide

## 📍 Where Forms Are Stored

### Current Storage Location

**Browser LocalStorage** (Default)
- Forms are stored in your web browser's local storage
- Location: Browser's internal storage (not visible as files)
- Access: Only on the same browser/device where you created them
- Limitation: Not accessible from other devices or browsers

### Storage Details

- **Storage Type**: Browser LocalStorage
- **Storage Key Format**: `genealogy-form-{formId}`
- **Data Format**: JSON
- **Capacity**: Typically 5-10MB per browser
- **Persistence**: Survives browser restarts, cleared if browser data is cleared

## 🔄 How to Access Forms Across Devices

### Option 1: Export/Import (Recommended)

**Export Forms:**
1. Click **"💾 Backup All Forms"** button
2. All forms are saved to a single JSON file
3. File is downloaded to your computer
4. File name: `genealogy-forms-backup-YYYY-MM-DD.json`

**Import Forms:**
1. Click **"📥 Import Forms"** button
2. Select the backup JSON file
3. Choose whether to overwrite existing forms
4. Click **"Import Forms"**
5. All forms are restored to the browser

**Best Practice:**
- Export regularly (weekly/monthly)
- Keep backup files in a safe location (cloud storage, USB drive)
- Share backup files with family members
- Import on any device to access forms

### Option 2: Individual Form Export

**Export Single Form:**
1. Load the form you want to export
2. Click **"📥 Export to JSON"** button
3. Single form is downloaded as JSON file
4. Share this file with others

**Import Single Form:**
1. Use the Import Forms feature
2. Select the single form JSON file
3. Form is added to your collection

## 📂 File Storage Locations

### Where Backup Files Are Saved

When you click "Backup All Forms", the file is saved to:

**Windows:**
- Default: `C:\Users\[YourName]\Downloads\`
- File name: `genealogy-forms-backup-YYYY-MM-DD.json`

**Mac:**
- Default: `~/Downloads/`
- File name: `genealogy-forms-backup-YYYY-MM-DD.json`

**Linux:**
- Default: `~/Downloads/` or `~/Downloads/`
- File name: `genealogy-forms-backup-YYYY-MM-DD.json`

### Recommended Storage Locations

For better organization and sharing:

1. **Cloud Storage** (Recommended)
   - Google Drive
   - Dropbox
   - OneDrive
   - iCloud
   - Create folder: "Family Genealogy Forms"

2. **USB Drive / External Hard Drive**
   - Keep physical backup
   - Store in safe location
   - Update regularly

3. **Network Drive**
   - If family has shared network storage
   - Accessible to all family members

4. **Email to Yourself**
   - Send backup files to your email
   - Access from any device
   - Keep in email archive

## 👥 Sharing Forms with Family Members

### Method 1: Share Backup File

1. **Export all forms** using "Backup All Forms"
2. **Share the file** via:
   - Email attachment
   - Cloud storage link (Google Drive, Dropbox)
   - USB drive
   - File sharing service
3. **Family member imports** the file on their device
4. **Everyone has access** to the same forms

### Method 2: Individual Form Sharing

1. **Export specific form** using "Export to JSON"
2. **Share individual form** file
3. **Recipient imports** the form
4. **Form is added** to their collection

## 🔐 Backup Strategy

### Daily/Weekly Backups

1. **Regular Exports**: Export all forms weekly
2. **Multiple Locations**: Save to cloud + USB drive
3. **Version Naming**: Keep dated backups
   - `genealogy-forms-backup-2024-01-15.json`
   - `genealogy-forms-backup-2024-01-22.json`
   - etc.

### Before Major Changes

1. **Export before editing** important forms
2. **Create backup** of current state
3. **Make changes** with confidence
4. **Restore if needed** from backup

## 🚨 Important Notes

### Browser Storage Limitations

- **Clearing browser data** will delete all forms
- **Private/Incognito mode** doesn't save forms permanently
- **Different browsers** have separate storage
- **Mobile browsers** may clear storage more aggressively

### Best Practices

1. ✅ **Export regularly** - Don't rely only on browser storage
2. ✅ **Keep multiple backups** - Cloud + USB + Email
3. ✅ **Share with family** - Multiple people have copies
4. ✅ **Document changes** - Use compiler name field
5. ✅ **Version control** - Create new versions for major changes

## 📱 Accessing on Different Devices

### Same Person, Different Device

1. **Export on Device 1**: Backup all forms
2. **Transfer file**: Email, cloud, or USB
3. **Import on Device 2**: Use Import Forms feature
4. **Continue working**: All forms now available

### Multiple Family Members

1. **One person exports** all forms
2. **Shares backup file** with family
3. **Each person imports** on their device
4. **Everyone can edit** and create new versions
5. **Share updates** by exporting and sharing again

## 🔧 Troubleshooting

### Forms Not Showing

- **Check browser storage**: May be full or cleared
- **Import backup**: Restore from backup file
- **Different browser**: Storage is browser-specific

### Can't Import File

- **Check file format**: Must be valid JSON
- **File size**: Very large files may fail
- **Browser permissions**: Allow file access

### Lost Forms

- **Check backups**: Restore from backup file
- **Browser data**: May have been cleared
- **Export regularly**: Prevent data loss

## 💡 Pro Tips

1. **Automated Backups**: Set calendar reminder to export monthly
2. **Cloud Sync**: Use cloud storage that syncs automatically
3. **Family Repository**: Create shared folder for all backups
4. **Documentation**: Keep notes about what each backup contains
5. **Version History**: Use version numbers to track changes

---

**Remember: Browser storage is temporary. Always keep backup files!** 💾✨
