# Automatic Form-to-Tree Mapping

## ✅ How It Works

The genealogy form **automatically maps** to the family tree chart. Here's how:

### 1. **Real-Time Auto-Save**
- As you type in the form, data is automatically saved every 2 seconds
- Data is saved to browser storage and immediately available to the tree
- No need to manually save - it happens automatically!

### 2. **Automatic Tree Updates**
- The family tree page checks for updates every 2 seconds
- When form data changes, the tree automatically refreshes
- You'll see a notification when the tree updates

### 3. **Data Flow**

```
Form Input → Auto-Save (2 sec) → Browser Storage → Tree Auto-Refresh (2 sec) → Updated Tree
```

### 4. **Manual Actions**

You can also manually trigger updates:

**From Form Page:**
- Click "Save as Draft" - Saves and updates tree immediately
- Click "Submit & Generate Tree" - Saves and redirects to tree page

**From Tree Page:**
- Click "🔄 Refresh Tree" button - Manually refreshes the tree
- Tree auto-refreshes every 2 seconds anyway

## 📊 Data Mapping Structure

### Form Fields → Tree Nodes

| Form Section | Maps To Tree |
|-------------|-------------|
| **Earliest Known Ancestor** | Root node (top of tree) |
| **Generation 1** | First level children |
| **Generation 1 Children** | Second level (grandchildren) |
| **Generation 2** | Additional first level children |
| And so on... | Tree expands automatically |

### Example Mapping

**Form Input:**
```
Earliest Ancestor: Munawwar Chand Sahib
Generation 1 - Father: Muhammad Yaseen
  └─ Child 1: Dr. Samad
  └─ Child 2: Another Child
Generation 2 - Father: Muhammad Abdul Ghani
  └─ Child 1: Muhammad Abdullah
```

**Tree Output:**
```
        Munawwar Chand Sahib
              |
    ┌─────────┴─────────┐
    |                   |
Muhammad Yaseen    Muhammad Abdul Ghani
    |                   |
    |              Muhammad Abdullah
Dr. Samad
Another Child
```

## 🔄 Update Indicators

### On Form Page:
- ✅ Green notification appears when data is saved
- Auto-save happens silently in background

### On Tree Page:
- ✅ Status badge shows "Tree data loaded from form"
- Shows last update timestamp
- 🔄 Refresh button available
- Auto-refresh every 2 seconds

## 🎯 Key Features

1. **No Manual Sync Needed** - Everything happens automatically
2. **Real-Time Updates** - See changes within 2 seconds
3. **Visual Feedback** - Notifications show when data is saved/updated
4. **Persistent Storage** - Data saved in browser, survives page refresh
5. **Export Options** - Export to JSON/PDF anytime

## 💡 Tips

- **Keep form page open** while viewing tree - updates happen in real-time
- **Use "Save as Draft"** for important checkpoints
- **Check status badge** on tree page to confirm data source
- **Export to JSON** regularly as backup

## 🔧 Technical Details

- **Storage**: Browser LocalStorage
- **Update Check**: Every 2 seconds
- **Auto-Save Delay**: 2 seconds after typing stops
- **Data Format**: JSON structure
- **Compatibility**: All modern browsers

---

**The connection is fully automatic - just fill the form and watch the tree update!** 🌳✨
