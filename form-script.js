// Form Data Management
let formData = {
    generations: []
};

// Form Management System
let currentFormId = null;
let currentFormNumber = null;
let isEditMode = false;
let parentFormId = null;

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeFormManagement();
    
    // Set default compilation date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('compilation-date').value = today;
    
    // Initialize new form if none exists
    if (!currentFormId) {
        const formNumber = getNextFormNumber();
        currentFormId = 'form-' + Date.now();
        currentFormNumber = formNumber;

        document.getElementById('form-id').value = currentFormId;
        document.getElementById('form-number').value = formNumber;
        document.getElementById('form-version').value = '1.0';
        updateFormDisplay();

        // Pre-fill default genealogy data if no saved forms exist
        const existingForms = getAllForms();
        if (existingForms.length === 0) {
            prefillDefaultGenealogy();
        }
    }

    // Check if loading a specific form from URL
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('formId');
    if (formId) {
        loadFormById(formId);
    }
});

// Initialize form management system
function initializeFormManagement() {
    // New form button
    document.getElementById('new-form-btn').addEventListener('click', createNewForm);
    
    // Load form button
    document.getElementById('load-form-btn').addEventListener('click', showFormSelector);
    
    // Form history button
    document.getElementById('form-history-btn').addEventListener('click', showFormHistory);
    
    // Close buttons
    document.getElementById('close-selector-btn').addEventListener('click', () => {
        document.getElementById('form-selector-panel').style.display = 'none';
    });
    
    document.getElementById('close-history-btn').addEventListener('click', () => {
        document.getElementById('form-history-panel').style.display = 'none';
    });
    
    // Exit edit mode
    document.getElementById('exit-edit-btn').addEventListener('click', exitEditMode);
    
    // Backup and import buttons
    document.getElementById('backup-all-btn').addEventListener('click', backupAllForms);
    document.getElementById('import-forms-btn').addEventListener('click', showImportPanel);
    document.getElementById('close-import-btn').addEventListener('click', () => {
        document.getElementById('import-panel').style.display = 'none';
    });
    document.getElementById('execute-import-btn').addEventListener('click', executeImport);
    document.getElementById('import-file-input').addEventListener('change', handleFileSelect);
    
    // Load form list on page load
    updateFormDisplay();
}

// Pre-fill form with default genealogy data
function prefillDefaultGenealogy() {
    // Section 1: Family Identification
    document.getElementById('family-name').value = 'Munawwar Chand / Waheed';
    document.getElementById('ancestral-title').value = 'Munawwar Chand Sahib (رحمۃ اللہ علیہ)';
    document.getElementById('ancestral-homeland').value = 'Hyderabad';
    document.getElementById('present-residence').value = 'Qatar';

    // Section 2: Earliest Known Ancestor
    document.getElementById('ancestor-name').value = 'Munawwar Chand Sahib';
    document.getElementById('ancestor-title').value = '(رحمۃ اللہ علیہ)';
    document.getElementById('ancestor-profession').value = 'Police Patil during the Nizam of Deccan era';
    document.getElementById('ancestor-notes').value = 'He served under the Nizam of Deccan and was responsible for maintaining law and order. He was widely respected for his integrity, administrative ability, and public service. He had three sons.';

    // Section 11: Compiler
    document.getElementById('compiler-name').value = 'Abdullah';

    // Section 3: Generation 1 - Maulana Abul Jameel Muhammad Yaseen Sahib
    addGeneration();
    const gen1Father = document.querySelector('[name="gen-1-father"]');
    if (gen1Father) gen1Father.value = 'Maulana Abul Jameel Muhammad Yaseen Sahib';
    const gen1Prof = document.querySelector('[name="gen-1-profession"]');
    if (gen1Prof) gen1Prof.value = 'A distinguished Islamic scholar of his era. Known for outstanding religious and educational contributions.';
    const gen1Res = document.querySelector('[name="gen-1-residence"]');
    if (gen1Res) gen1Res.value = 'Hyderabad';

    // Gen 1 Children: Dr. Samdani and Hafiz Abdul Waheed
    addChild(1);
    const gen1Child1Name = document.querySelector('[name="gen-1-child-1-name"]');
    if (gen1Child1Name) gen1Child1Name.value = 'Hakeem & Dr. Muhammad Abdus Samad Samdani (رحمۃ اللہ علیہ)';
    const gen1Child1Prof = document.querySelector('[name="gen-1-child-1-profession"]');
    if (gen1Child1Prof) gen1Child1Prof.value = 'Eminent physician, Hakeem, and religious scholar. He had eight (8) children.';

    addChild(1);
    const gen1Child2Name = document.querySelector('[name="gen-1-child-2-name"]');
    if (gen1Child2Name) gen1Child2Name.value = 'Hafiz Abdul Waheed';
    const gen1Child2Prof = document.querySelector('[name="gen-1-child-2-profession"]');
    if (gen1Child2Prof) gen1Child2Prof.value = 'Hafiz, teacher, court auditor, religious scholar. Graduate from Umrabad and King Faisal University.';
    const gen1Child2Spouse = document.querySelector('[name="gen-1-child-2-spouse"]');
    if (gen1Child2Spouse) gen1Child2Spouse.value = 'Asma Shaheen (family background: Religious Scholar)';
    const gen1Child2Children = document.querySelector('[name="gen-1-child-2-children"]');
    if (gen1Child2Children) gen1Child2Children.value = 'Farha Yasmeen, Abdullah (Engineer, Born: 1987-01-05), Fatima Zeba, Abdur Rahman (Pharmacist, Born: 1988-12-12)';

    // Section 3: Generation 2 - Late Muhammad Abdul Ghani Sahib
    addGeneration();
    const gen2Father = document.querySelector('[name="gen-2-father"]');
    if (gen2Father) gen2Father.value = 'Late Muhammad Abdul Ghani Sahib';
    const gen2Prof = document.querySelector('[name="gen-2-profession"]');
    if (gen2Prof) gen2Prof.value = 'Second son of Munawwar Chand Sahib. Known within the family for dignity, responsibility, and moral character.';

    // Gen 2 Child: Late Muhammad Abdullah Sahib
    addChild(2);
    const gen2Child1Name = document.querySelector('[name="gen-2-child-1-name"]');
    if (gen2Child1Name) gen2Child1Name.value = 'Late Muhammad Abdullah Sahib';
    const gen2Child1Spouse = document.querySelector('[name="gen-2-child-1-spouse"]');
    if (gen2Child1Spouse) gen2Child1Spouse.value = 'Lalama (paternal/maternal grandmother)';
    const gen2Child1Children = document.querySelector('[name="gen-2-child-1-children"]');
    if (gen2Child1Children) gen2Child1Children.value = 'Abdul Mateen (3 sons, 1 daughter), Abdul Mubeen (1 son, 2 daughters), Abdul Mohsin (3 daughters)';

    // Section 3: Generation 3 - Third Son (unknown)
    addGeneration();
    const gen3Father = document.querySelector('[name="gen-3-father"]');
    if (gen3Father) gen3Father.value = 'Third Son of Munawwar Chand Sahib';
    const gen3Prof = document.querySelector('[name="gen-3-profession"]');
    if (gen3Prof) gen3Prof.value = 'Authentic and verified information not yet available. Family records to be updated when details are obtained.';
}

// Generate next form number
function getNextFormNumber() {
    const forms = getAllForms();
    if (forms.length === 0) return 1;
    
    const numbers = forms.map(f => f.formNumber || 0).filter(n => n > 0);
    return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
}

// Generate next version number
function getNextVersionNumber(formId) {
    const versions = getFormVersions(formId);
    if (versions.length === 0) return '1.0';
    
    const versionNumbers = versions.map(v => parseFloat(v.version) || 0);
    const maxVersion = Math.max(...versionNumbers);
    return (maxVersion + 0.1).toFixed(1);
}

// Create new form
function createNewForm() {
    if (confirm('Create a new form? Any unsaved changes will be lost.')) {
        // Reset form
        document.getElementById('genealogy-form').reset();
        formData.generations = [];
        document.getElementById('generations-container').innerHTML = '';
        document.getElementById('marriages-container').innerHTML = '';
        
        // Generate new form number
        const formNumber = getNextFormNumber();
        const formId = 'form-' + Date.now();
        
        currentFormId = formId;
        currentFormNumber = formNumber;
        isEditMode = false;
        parentFormId = null;
        
        // Update form metadata
        document.getElementById('form-id').value = formId;
        document.getElementById('form-number').value = formNumber;
        document.getElementById('form-version').value = '1.0';
        document.getElementById('is-edit-mode').value = 'false';
        document.getElementById('parent-form-id').value = '';
        
        // Update display
        updateFormDisplay();
        hideEditMode();
        
        // Set compilation date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('compilation-date').value = today;
        
        showNotification('New form created! Form #' + formNumber, 'success');
    }
}

// Get all saved forms
function getAllForms() {
    const forms = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
        if (key.startsWith('genealogy-form-')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                if (data.formNumber) {
                    forms.push({
                        id: key.replace('genealogy-form-', ''),
                        ...data
                    });
                }
            } catch (e) {
                console.error('Error parsing form:', key, e);
            }
        }
    });
    
    // Sort by form number
    return forms.sort((a, b) => (b.formNumber || 0) - (a.formNumber || 0));
}

// Get versions of a specific form
function getFormVersions(formId) {
    const versions = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
        if (key.startsWith('genealogy-form-')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                if (data.formNumber && data.formId === formId) {
                    versions.push(data);
                }
            } catch (e) {
                console.error('Error parsing version:', key, e);
            }
        }
    });
    
    // Sort by version number (descending)
    return versions.sort((a, b) => parseFloat(b.version || 0) - parseFloat(a.version || 0));
}

// Show form selector
function showFormSelector() {
    const forms = getAllForms();
    const listContainer = document.getElementById('forms-list');
    listContainer.innerHTML = '';
    
    if (forms.length === 0) {
        listContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">No saved forms found.</p>';
    } else {
        forms.forEach(form => {
            const formItem = document.createElement('div');
            formItem.className = 'form-item';
            formItem.innerHTML = `
                <div class="form-item-info">
                    <strong>Form #${form.formNumber || 'N/A'}</strong>
                    <span class="form-item-version">v${form.version || '1.0'}</span>
                    <span class="form-item-date">${form.lastUpdated ? new Date(form.lastUpdated).toLocaleDateString() : 'No date'}</span>
                </div>
                <div class="form-item-actions">
                    <button class="btn btn-small" onclick="loadFormById('${form.id}')">Edit</button>
                    <button class="btn btn-small" onclick="createNewVersion('${form.id}')">New Version</button>
                    <button class="btn btn-small btn-danger" onclick="deleteForm('${form.id}')">Delete</button>
                </div>
                <div class="form-item-details">
                    <small>Family: ${form['family-name'] || form['ancestor-name'] || 'Unnamed'}</small>
                </div>
            `;
            listContainer.appendChild(formItem);
        });
    }
    
    document.getElementById('form-selector-panel').style.display = 'block';
}

// Show form history
function showFormHistory() {
    if (!currentFormId) {
        showNotification('Please load a form first to view its history.', 'info');
        return;
    }
    
    const versions = getFormVersions(currentFormId);
    const listContainer = document.getElementById('versions-list');
    listContainer.innerHTML = '';
    
    document.getElementById('history-form-number').textContent = currentFormNumber || 'N/A';
    
    if (versions.length === 0) {
        listContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">No versions found for this form.</p>';
    } else {
        versions.forEach(version => {
            const versionItem = document.createElement('div');
            versionItem.className = 'version-item';
            versionItem.innerHTML = `
                <div class="version-info">
                    <strong>Version ${version.version || '1.0'}</strong>
                    <span class="version-date">${version.lastUpdated ? new Date(version.lastUpdated).toLocaleString() : 'No date'}</span>
                    <span class="version-compiler">By: ${version['compiler-name'] || 'Unknown'}</span>
                </div>
                <div class="version-actions">
                    <button class="btn btn-small" onclick="loadFormById('${version.id}')">Load</button>
                    <button class="btn btn-small" onclick="compareVersions('${version.id}')">Compare</button>
                </div>
            `;
            listContainer.appendChild(versionItem);
        });
    }
    
    document.getElementById('form-history-panel').style.display = 'block';
}

// Load form by ID
function loadFormById(formId) {
    const formKey = 'genealogy-form-' + formId;
    const savedData = localStorage.getItem(formKey);
    
    if (!savedData) {
        showNotification('Form not found!', 'error');
        return;
    }
    
    try {
        const data = JSON.parse(savedData);
        
        // Set current form info
        currentFormId = formId;
        currentFormNumber = data.formNumber || data['form-number'];
        isEditMode = true;
        parentFormId = data.parentFormId || data.formId || formId;
        
        // Update form metadata
        document.getElementById('form-id').value = formId;
        document.getElementById('form-number').value = currentFormNumber;
        document.getElementById('form-version').value = data.version || data['form-version'] || '1.0';
        document.getElementById('is-edit-mode').value = 'true';
        document.getElementById('parent-form-id').value = parentFormId;
        
        // Clear existing generations
        document.getElementById('generations-container').innerHTML = '';
        formData.generations = [];
        
        // Populate form fields
        Object.keys(data).forEach(key => {
            if (!['generations', 'formId', 'formNumber', 'version', 'lastUpdated', 'changes', 'status', 'submittedDate', 'parentFormId', 'createdFrom'].includes(key)) {
                const field = document.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = data[key] === 'on' || data[key] === true || data[key] === 'true';
                    } else {
                        field.value = data[key] || '';
                    }
                }
            }
        });
        
        // Restore generations with full data
        if (data.generations && Array.isArray(data.generations)) {
            // Sort generations by number
            const sortedGens = [...data.generations].sort((a, b) => a.number - b.number);
            
            sortedGens.forEach(gen => {
                addGeneration();
                
                // Populate generation fields
                const genBlock = document.querySelector(`[data-generation="${gen.number}"]`);
                if (genBlock) {
                    const fatherName = data[`gen-${gen.number}-father`];
                    if (fatherName) {
                        const fatherField = genBlock.querySelector(`[name="gen-${gen.number}-father"]`);
                        if (fatherField) fatherField.value = fatherName;
                    }
                    
                    // Populate other generation fields
                    ['dob', 'dod', 'profession', 'residence', 'wife-name', 'wife-background', 'marriage-date'].forEach(field => {
                        const value = data[`gen-${gen.number}-${field}`];
                        if (value) {
                            const fieldElement = genBlock.querySelector(`[name="gen-${gen.number}-${field}"]`);
                            if (fieldElement) fieldElement.value = value;
                        }
                    });
                    
                    // Restore children
                    if (gen.children && Array.isArray(gen.children)) {
                        const sortedChildren = [...gen.children].sort((a, b) => a.index - b.index);
                        sortedChildren.forEach(childData => {
                            addChild(gen.number);
                            
                            // Populate child fields
                            const childItem = genBlock.querySelector(`[data-child-index="${childData.index}"]`);
                            if (childItem) {
                                ['name', 'dob', 'profession', 'spouse', 'children'].forEach(field => {
                                    const value = data[`gen-${gen.number}-child-${childData.index}-${field}`];
                                    if (value) {
                                        const fieldElement = childItem.querySelector(`[name="gen-${gen.number}-child-${childData.index}-${field}"]`);
                                        if (fieldElement) fieldElement.value = value;
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
        
        // Update display
        updateFormDisplay();
        showEditMode();
        
        // Close selector
        document.getElementById('form-selector-panel').style.display = 'none';
        
        showNotification(`Form #${currentFormNumber} loaded for editing!`, 'success');
        
    } catch (error) {
        console.error('Error loading form:', error);
        showNotification('Error loading form: ' + error.message, 'error');
    }
}

// Create new version of existing form
function createNewVersion(parentFormId) {
    if (!parentFormId) {
        showNotification('No parent form selected!', 'error');
        return;
    }
    
    const parentKey = 'genealogy-form-' + parentFormId;
    const parentData = localStorage.getItem(parentKey);
    
    if (!parentData) {
        showNotification('Parent form not found!', 'error');
        return;
    }
    
    try {
        const parent = JSON.parse(parentData);
        const newVersion = getNextVersionNumber(parentFormId);
        const newFormId = 'form-' + Date.now();
        
        // Create new version
        const newFormData = {
            ...parent,
            formId: newFormId,
            formNumber: parent.formNumber,
            version: newVersion,
            parentFormId: parentFormId,
            lastUpdated: new Date().toISOString(),
            createdFrom: parentFormId
        };
        
        // Save new version
        localStorage.setItem('genealogy-form-' + newFormId, JSON.stringify(newFormData));
        
        // Load the new version
        loadFormById(newFormId);
        
        showNotification(`New version ${newVersion} created!`, 'success');
        
    } catch (error) {
        showNotification('Error creating new version: ' + error.message, 'error');
    }
}

// Delete form
function deleteForm(formId) {
    if (confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
        localStorage.removeItem('genealogy-form-' + formId);
        showNotification('Form deleted!', 'success');
        showFormSelector(); // Refresh list
    }
}

// Update form display
function updateFormDisplay() {
    const formNumber = document.getElementById('form-number').value || currentFormNumber || 'New';
    const formVersion = document.getElementById('form-version').value || '1.0';
    const status = isEditMode ? 'Edit Mode' : 'Draft';
    
    document.getElementById('form-number-display').textContent = `Form #: ${formNumber}`;
    document.getElementById('form-version-display').textContent = `Version: ${formVersion}`;
    document.getElementById('form-status').textContent = `Status: ${status}`;
    
    // Update action buttons area
    const actionFormNumber = document.getElementById('action-form-number');
    const actionVersion = document.getElementById('action-version');
    if (actionFormNumber) actionFormNumber.textContent = formNumber;
    if (actionVersion) actionVersion.textContent = formVersion;
}

// Show edit mode indicator
function showEditMode() {
    document.getElementById('edit-mode-indicator').style.display = 'flex';
    document.getElementById('edit-form-number').textContent = currentFormNumber || 'N/A';
    document.getElementById('edit-version-number').textContent = document.getElementById('form-version').value || '1.0';
}

// Hide edit mode indicator
function hideEditMode() {
    document.getElementById('edit-mode-indicator').style.display = 'none';
}

// Exit edit mode
function exitEditMode() {
    if (confirm('Exit edit mode? You can save your changes first.')) {
        createNewForm();
    }
}

// Backup all forms to a single file
function backupAllForms() {
    const allForms = getAllForms();
    
    if (allForms.length === 0) {
        showNotification('No forms to backup!', 'info');
        return;
    }
    
    // Collect all form data
    const backupData = {
        exportDate: new Date().toISOString(),
        exportVersion: '1.0',
        totalForms: allForms.length,
        forms: []
    };
    
    allForms.forEach(form => {
        const formKey = 'genealogy-form-' + form.id;
        const formData = localStorage.getItem(formKey);
        if (formData) {
            try {
                backupData.forms.push(JSON.parse(formData));
            } catch (e) {
                console.error('Error adding form to backup:', form.id, e);
            }
        }
    });
    
    // Create and download file
    const json = JSON.stringify(backupData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    a.download = `genealogy-forms-backup-${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification(`Backed up ${allForms.length} form(s) successfully!`, 'success');
}

// Show import panel
function showImportPanel() {
    document.getElementById('import-panel').style.display = 'block';
    document.getElementById('import-file-input').value = '';
    document.getElementById('import-file-name').textContent = 'No file selected';
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('import-file-name').textContent = file.name;
    } else {
        document.getElementById('import-file-name').textContent = 'No file selected';
    }
}

// Execute import
function executeImport() {
    const fileInput = document.getElementById('import-file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Please select a file to import!', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            
            if (!backupData.forms || !Array.isArray(backupData.forms)) {
                showNotification('Invalid backup file format!', 'error');
                return;
            }
            
            const overwrite = document.getElementById('import-overwrite').checked;
            let imported = 0;
            let skipped = 0;
            let errors = 0;
            
            backupData.forms.forEach(formData => {
                try {
                    if (!formData.formId) {
                        // Generate new ID if missing
                        formData.formId = 'form-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                    }
                    
                    const formKey = 'genealogy-form-' + formData.formId;
                    const existing = localStorage.getItem(formKey);
                    
                    if (existing && !overwrite) {
                        skipped++;
                        return;
                    }
                    
                    // Save form
                    localStorage.setItem(formKey, JSON.stringify(formData));
                    imported++;
                    
                } catch (error) {
                    console.error('Error importing form:', error);
                    errors++;
                }
            });
            
            // Close import panel
            document.getElementById('import-panel').style.display = 'none';
            
            // Show results
            let message = `Import complete! `;
            if (imported > 0) message += `Imported: ${imported} form(s). `;
            if (skipped > 0) message += `Skipped: ${skipped} form(s). `;
            if (errors > 0) message += `Errors: ${errors} form(s).`;
            
            showNotification(message, imported > 0 ? 'success' : 'info');
            
            // Refresh form list if selector is open
            if (document.getElementById('form-selector-panel').style.display !== 'none') {
                showFormSelector();
            }
            
        } catch (error) {
            showNotification('Error reading file: ' + error.message, 'error');
        }
    };
    
    reader.onerror = function() {
        showNotification('Error reading file!', 'error');
    };
    
    reader.readAsText(file);
}

// Make functions globally available
window.loadFormById = loadFormById;
window.createNewVersion = createNewVersion;
window.deleteForm = deleteForm;
window.compareVersions = function(formId) {
    showNotification('Version comparison feature coming soon!', 'info');
};

// Initialize form event listeners
function initializeForm() {
    // Add generation button
    document.getElementById('add-generation-btn').addEventListener('click', addGeneration);
    
    // Marriages count change
    document.getElementById('marriages-count').addEventListener('change', updateMarriages);
    
    // Form submission
    document.getElementById('genealogy-form').addEventListener('submit', handleFormSubmit);
    
    // Save draft
    document.getElementById('save-draft-btn').addEventListener('click', saveDraft);
    
    // Export buttons
    document.getElementById('export-pdf-btn').addEventListener('click', exportToPDF);
    document.getElementById('export-json-btn').addEventListener('click', exportToJSON);
    
    // Load data
    document.getElementById('load-data-btn').addEventListener('click', loadSavedData);
    
    // Setup auto-save
    setupAutoSave();
}

// Add a new generation section
function addGeneration() {
    const container = document.getElementById('generations-container');
    const generationNumber = formData.generations.length + 1;
    
    const parentLabel = generationNumber === 1
        ? 'Child of Earliest Known Ancestor (Section 2) — enter name here:'
        : 'Child of person in Generation ' + (generationNumber - 1) + ' — enter name here:';
    const generationHTML = `
        <div class="generation-block" data-generation="${generationNumber}">
            <div class="generation-block-header">
                <h4 class="generation-block-title">Generation No. ${generationNumber}</h4>
                <button type="button" class="remove-generation-btn" onclick="removeGeneration(${generationNumber})">Remove</button>
            </div>
            <p class="generation-relation-hint">${parentLabel}</p>
            
            <div class="form-group">
                <label>Name (person in this generation):</label>
                <input type="text" name="gen-${generationNumber}-father" placeholder="Enter full name">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="gen-${generationNumber}-dob">
                </div>
                <div class="form-group">
                    <label>Date of Death:</label>
                    <input type="date" name="gen-${generationNumber}-dod">
                </div>
            </div>
            
            <div class="form-group">
                <label>Profession / Position:</label>
                <input type="text" name="gen-${generationNumber}-profession" placeholder="Enter profession or position">
            </div>
            
            <div class="form-group">
                <label>Place(s) of Residence:</label>
                <textarea name="gen-${generationNumber}-residence" rows="2" placeholder="Enter place(s) of residence"></textarea>
            </div>
            
            <div class="form-group">
                <label>Spouse Details:</label>
                <div class="form-row">
                    <div class="form-group">
                        <label>Wife's Name:</label>
                        <input type="text" name="gen-${generationNumber}-wife-name" placeholder="Enter wife's name">
                    </div>
                    <div class="form-group">
                        <label>Family Background:</label>
                        <input type="text" name="gen-${generationNumber}-wife-background" placeholder="Enter family background">
                    </div>
                </div>
                <div class="form-group">
                    <label>Date of Marriage:</label>
                    <input type="date" name="gen-${generationNumber}-marriage-date">
                </div>
            </div>
            
            <div class="children-list">
                <h5 style="margin-bottom: 15px; color: var(--primary-color);">Children:</h5>
                <div class="children-container-${generationNumber}">
                    <!-- Children will be added here -->
                </div>
                <button type="button" class="add-child-btn" onclick="addChild(${generationNumber})">
                    + Add Child
                </button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', generationHTML);
    formData.generations.push({
        number: generationNumber,
        children: []
    });
}

// Remove a generation section
function removeGeneration(genNumber) {
    const block = document.querySelector(`[data-generation="${genNumber}"]`);
    if (block && confirm('Are you sure you want to remove this generation?')) {
        block.remove();
        formData.generations = formData.generations.filter(g => g.number !== genNumber);
        updateGenerationNumbers();
    }
}

// Update generation numbers after removal
function updateGenerationNumbers() {
    const blocks = document.querySelectorAll('.generation-block');
    blocks.forEach((block, index) => {
        const newNumber = index + 1;
        block.setAttribute('data-generation', newNumber);
        const title = block.querySelector('.generation-block-title');
        if (title) title.textContent = `Generation No. ${newNumber}`;
        
        const hint = block.querySelector('.generation-relation-hint');
        if (hint) {
            hint.textContent = newNumber === 1
                ? 'Child of Earliest Known Ancestor (Section 2) — enter name here:'
                : 'Child of person in Generation ' + (newNumber - 1) + ' — enter name here:';
        }
        
        // Update all input names
        block.querySelectorAll('input, textarea, select').forEach(input => {
            const name = input.getAttribute('name');
            if (name && name.startsWith('gen-')) {
                const newName = name.replace(/gen-\d+/, `gen-${newNumber}`);
                input.setAttribute('name', newName);
            }
        });
        
        // Update button onclick
        const removeBtn = block.querySelector('.remove-generation-btn');
        if (removeBtn) {
            removeBtn.setAttribute('onclick', `removeGeneration(${newNumber})`);
        }
        
        const addChildBtn = block.querySelector('.add-child-btn');
        if (addChildBtn) {
            addChildBtn.setAttribute('onclick', `addChild(${newNumber})`);
        }
        
        // Update children container class
        const childrenContainer = block.querySelector('[class^="children-container-"]');
        if (childrenContainer) {
            childrenContainer.className = `children-container-${newNumber}`;
        }
    });
}

// Add a child to a generation
function addChild(genNumber) {
    const container = document.querySelector(`.children-container-${genNumber}`);
    if (!container) return;
    
    const childIndex = container.children.length + 1;
    const childHTML = `
        <div class="child-item" data-child-index="${childIndex}">
            <div class="child-item-header">
                <span class="child-item-title">Child ${childIndex}</span>
                <button type="button" class="remove-child-btn" onclick="removeChild(${genNumber}, ${childIndex})">Remove</button>
            </div>
            
            <div class="form-group">
                <label>Son / Daughter Name:</label>
                <input type="text" name="gen-${genNumber}-child-${childIndex}-name" placeholder="Enter child's name">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="gen-${genNumber}-child-${childIndex}-dob">
                </div>
                <div class="form-group">
                    <label>Profession / Education:</label>
                    <input type="text" name="gen-${genNumber}-child-${childIndex}-profession" placeholder="Enter profession or education">
                </div>
            </div>
            
            <div class="form-group">
                <label>Spouse Name (if married):</label>
                <input type="text" name="gen-${genNumber}-child-${childIndex}-spouse" placeholder="Enter spouse name if married">
            </div>
            
            <div class="form-group">
                <label>Children (if any):</label>
                <textarea name="gen-${genNumber}-child-${childIndex}-children" rows="2" placeholder="List children if any"></textarea>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', childHTML);
    
    // Add to formData
    const generation = formData.generations.find(g => g.number === genNumber);
    if (generation) {
        generation.children.push({ index: childIndex });
    }
}

// Remove a child
function removeChild(genNumber, childIndex) {
    const childItem = document.querySelector(`.children-container-${genNumber} [data-child-index="${childIndex}"]`);
    if (childItem && confirm('Are you sure you want to remove this child?')) {
        childItem.remove();
        
        // Update formData
        const generation = formData.generations.find(g => g.number === genNumber);
        if (generation) {
            generation.children = generation.children.filter(c => c.index !== childIndex);
        }
        
        // Update child indices
        updateChildIndices(genNumber);
    }
}

// Update child indices after removal
function updateChildIndices(genNumber) {
    const container = document.querySelector(`.children-container-${genNumber}`);
    if (!container) return;
    
    const children = container.querySelectorAll('.child-item');
    children.forEach((child, index) => {
        const newIndex = index + 1;
        child.setAttribute('data-child-index', newIndex);
        
        const title = child.querySelector('.child-item-title');
        if (title) title.textContent = `Child ${newIndex}`;
        
        // Update input names
        child.querySelectorAll('input, textarea').forEach(input => {
            const name = input.getAttribute('name');
            if (name) {
                const newName = name.replace(/child-\d+/, `child-${newIndex}`);
                input.setAttribute('name', newName);
            }
        });
        
        // Update remove button
        const removeBtn = child.querySelector('.remove-child-btn');
        if (removeBtn) {
            removeBtn.setAttribute('onclick', `removeChild(${genNumber}, ${newIndex})`);
        }
    });
}

// Update marriages section
function updateMarriages() {
    const count = parseInt(document.getElementById('marriages-count').value) || 0;
    const container = document.getElementById('marriages-container');
    container.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        const marriageHTML = `
            <div class="marriage-item">
                <h5 style="margin-bottom: 15px; color: var(--primary-color);">Marriage ${i}:</h5>
                <div class="form-group">
                    <label>Spouse Name:</label>
                    <input type="text" name="marriage-${i}-spouse" placeholder="Enter spouse name">
                </div>
                <div class="form-group">
                    <label>Children from This Marriage:</label>
                    <textarea name="marriage-${i}-children" rows="3" placeholder="List children from this marriage"></textarea>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', marriageHTML);
    }
}

// Collect all form data including dynamic fields
function collectAllFormData() {
    const form = document.getElementById('genealogy-form');
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj);
    
    // Collect all generation data
    const generations = [];
    document.querySelectorAll('.generation-block').forEach(block => {
        const genNumber = block.getAttribute('data-generation');
        if (genNumber) {
            const genData = {
                number: parseInt(genNumber),
                children: []
            };
            
            // Collect children data
            const childrenContainer = block.querySelector(`.children-container-${genNumber}`);
            if (childrenContainer) {
                childrenContainer.querySelectorAll('.child-item').forEach((childItem, index) => {
                    const childIndex = childItem.getAttribute('data-child-index') || (index + 1);
                    genData.children.push({ index: parseInt(childIndex) });
                });
            }
            
            generations.push(genData);
        }
    });
    
    data.generations = generations;
    data.lastUpdated = new Date().toISOString();
    
    // Add form management metadata
    if (!data['form-id'] || data['form-id'] === '') {
        // New form - generate ID and number
        if (!currentFormId) {
            currentFormId = 'form-' + Date.now();
            currentFormNumber = getNextFormNumber();
        }
        data['form-id'] = currentFormId;
        data.formId = currentFormId;
        data['form-number'] = currentFormNumber || getNextFormNumber();
        data.formNumber = currentFormNumber || getNextFormNumber();
    } else {
        data.formId = data['form-id'];
        data.formNumber = parseInt(data['form-number']) || currentFormNumber;
    }
    
    // Version management
    if (isEditMode && parentFormId) {
        // Creating new version
        data.version = getNextVersionNumber(parentFormId);
        data.parentFormId = parentFormId;
    } else {
        data.version = data['form-version'] || '1.0';
    }
    
    // Change tracking and audit trail
    const existingData = currentFormId ? JSON.parse(localStorage.getItem('genealogy-form-' + currentFormId) || '{}') : {};
    
    data.changes = {
        editedBy: data['compiler-name'] || 'Unknown',
        editDate: new Date().toISOString(),
        isEdit: isEditMode,
        previousVersion: existingData.version || null,
        changeSummary: generateChangeSummary(existingData, data)
    };
    
    // Maintain change history
    if (!data.changeHistory) {
        data.changeHistory = [];
    }
    data.changeHistory.push({
        date: new Date().toISOString(),
        editedBy: data['compiler-name'] || 'Unknown',
        version: data.version,
        changes: data.changes.changeSummary
    });
    
    // Keep only last 10 changes
    if (data.changeHistory.length > 10) {
        data.changeHistory = data.changeHistory.slice(-10);
    }
    
    return data;
}

// Generate change summary
function generateChangeSummary(oldData, newData) {
    const changes = [];
    
    // Compare key fields
    const keyFields = ['family-name', 'ancestor-name', 'ancestor-title', 'ancestor-profession'];
    keyFields.forEach(field => {
        if (oldData[field] !== newData[field]) {
            changes.push(`${field} changed`);
        }
    });
    
    // Compare generations count
    const oldGenCount = oldData.generations?.length || 0;
    const newGenCount = newData.generations?.length || 0;
    if (oldGenCount !== newGenCount) {
        changes.push(`Generations: ${oldGenCount} → ${newGenCount}`);
    }
    
    return changes.length > 0 ? changes.join(', ') : 'Minor updates';
}

// Save form data as draft
function saveDraft() {
    const data = collectAllFormData();
    
    // Save with form ID as key for version management
    const formKey = 'genealogy-form-' + data.formId;
    localStorage.setItem(formKey, JSON.stringify(data));
    
    // Also save to legacy keys for compatibility
    localStorage.setItem('genealogy-draft', JSON.stringify(data));
    localStorage.setItem('genealogy-complete', JSON.stringify(data));
    localStorage.setItem('genealogy-last-update', new Date().toISOString());
    
    // Update display
    updateFormDisplay();
    
    showNotification(`Form #${data.formNumber} saved successfully! Tree will update automatically.`, 'success');
}

// Load saved data
function loadSavedData() {
    const saved = localStorage.getItem('genealogy-draft');
    if (!saved) {
        if (confirm('No saved draft found. Would you like to start fresh?')) {
            return;
        }
        return;
    }
    
    if (confirm('Load saved draft? This will replace current form data.')) {
        try {
            const data = JSON.parse(saved);
            
            // Populate form fields
            Object.keys(data).forEach(key => {
                if (key !== 'generations') {
                    const field = document.querySelector(`[name="${key}"]`);
                    if (field) {
                        if (field.type === 'checkbox') {
                            field.checked = data[key] === 'on' || data[key] === true;
                        } else {
                            field.value = data[key] || '';
                        }
                    }
                }
            });
            
            // Restore generations
            if (data.generations && data.generations.length > 0) {
                data.generations.forEach(gen => {
                    addGeneration();
                    // Note: Full restoration would require more complex logic
                    // This is a simplified version
                });
            }
            
            alert('Draft loaded successfully!');
        } catch (error) {
            alert('Error loading draft: ' + error.message);
        }
    }
}

// Export to JSON
function exportToJSON() {
    const data = collectAllFormData();
    data.exportDate = new Date().toISOString();
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genealogy-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported to JSON successfully!', 'success');
}

// Export to PDF (uses jsPDF if available, otherwise print dialog)
function exportToPDF() {
    try {
        // Check if jsPDF is available
        if (window.jspdf && window.jspdf.jsPDF) {
            const data = collectAllFormData();
            generateFormPDF(data, false);
        } else {
            // Fallback to print dialog
            showNotification('Opening print dialog. Use "Save as PDF" option.', 'info');
            setTimeout(() => {
                window.print();
            }, 500);
        }
    } catch (error) {
        console.error('Error exporting PDF:', error);
        // Fallback to print
        window.print();
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate declaration
    const declaration = document.getElementById('declaration-accept');
    if (!declaration.checked) {
        showNotification('Please accept the declaration to proceed.', 'error');
        return;
    }
    
    // Collect all form data
    const data = collectAllFormData();
    
    // Mark as submitted
    data.status = 'submitted';
    data.submittedDate = new Date().toISOString();
    
    // Save with form ID as key
    const formKey = 'genealogy-form-' + data.formId;
    localStorage.setItem(formKey, JSON.stringify(data));
    
    // Also save to legacy keys for compatibility
    localStorage.setItem('genealogy-complete', JSON.stringify(data));
    localStorage.setItem('genealogy-draft', JSON.stringify(data));
    localStorage.setItem('genealogy-last-update', new Date().toISOString());
    
    // Update display
    updateFormDisplay();
    
    // Check for PDF generation and email options
    const generatePDF = document.getElementById('generate-pdf').checked;
    const emailPDF = document.getElementById('email-pdf').checked;
    
    // Show success message
    const action = isEditMode ? 'updated' : 'submitted';
    showNotification(`Form #${data.formNumber} ${action} successfully!`, 'success');
    
    // Generate PDF if requested
    if (generatePDF || emailPDF) {
        setTimeout(() => {
            generateFormPDF(data, emailPDF);
        }, 500);
    }
    
    // Redirect to tree view after a delay (longer if PDF is being generated)
    const redirectDelay = (generatePDF || emailPDF) ? 4000 : 2000;
    setTimeout(() => {
        window.location.href = 'index.html';
    }, redirectDelay);
}

// Generate PDF from form data
function generateFormPDF(data, shouldEmail = false) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let yPosition = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        
        // Helper function to add text with word wrap
        function addText(text, fontSize = 10, isBold = false, color = [0, 0, 0]) {
            doc.setFontSize(fontSize);
            doc.setTextColor(color[0], color[1], color[2]);
            if (isBold) {
                doc.setFont(undefined, 'bold');
            } else {
                doc.setFont(undefined, 'normal');
            }
            
            const lines = doc.splitTextToSize(text || '', maxWidth);
            if (yPosition + (lines.length * fontSize * 0.4) > doc.internal.pageSize.getHeight() - 20) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.text(lines, margin, yPosition);
            yPosition += lines.length * fontSize * 0.4 + 5;
            return yPosition;
        }
        
        // Title
        addText('FAMILY GENEALOGY FORM', 18, true, [0, 51, 102]);
        addText('(Shajra-e-Nasab / Family Tree Record)', 12, false, [102, 102, 102]);
        yPosition += 10;
        
        // Form Number and Version
        if (data.formNumber) {
            addText(`Form #${data.formNumber} | Version ${data.version || '1.0'}`, 10, true);
            yPosition += 5;
        }
        
        // Section 1: Family Identification
        addText('1. FAMILY IDENTIFICATION', 14, true, [0, 102, 204]);
        addText(`Family/Clan Name: ${data['family-name'] || 'N/A'}`, 10);
        addText(`Ancestral Title/Surname: ${data['ancestral-title'] || 'N/A'}`, 10);
        addText(`Ancestral Homeland: ${data['ancestral-homeland'] || 'N/A'}`, 10);
        addText(`Present Regions of Residence: ${data['present-residence'] || 'N/A'}`, 10);
        yPosition += 5;
        
        // Section 2: Earliest Known Ancestor
        addText('2. EARLIEST KNOWN ANCESTOR', 14, true, [0, 102, 204]);
        addText(`Full Name: ${data['ancestor-name'] || 'N/A'}`, 10);
        addText(`Title/Nickname: ${data['ancestor-title'] || 'N/A'}`, 10);
        addText(`Date of Birth: ${data['ancestor-dob'] || 'N/A'}`, 10);
        addText(`Place of Birth: ${data['ancestor-pob'] || 'N/A'}`, 10);
        addText(`Date of Death: ${data['ancestor-dod'] || 'N/A'}`, 10);
        addText(`Place of Burial: ${data['ancestor-burial'] || 'N/A'}`, 10);
        addText(`Profession/Status: ${data['ancestor-profession'] || 'N/A'}`, 10);
        if (data['ancestor-notes']) {
            addText(`Notes: ${data['ancestor-notes']}`, 10);
        }
        yPosition += 5;
        
        // Section 3: Generations
        if (data.generations && data.generations.length > 0) {
            addText('3. GENERATION-WISE LINEAGE RECORD', 14, true, [0, 102, 204]);
            data.generations.forEach((gen, index) => {
                const genNum = gen.number || (index + 1);
                addText(`Generation No. ${genNum}`, 12, true);
                addText(`Father's Name: ${data[`gen-${genNum}-father`] || 'N/A'}`, 10);
                addText(`Date of Birth: ${data[`gen-${genNum}-dob`] || 'N/A'}`, 10);
                addText(`Date of Death: ${data[`gen-${genNum}-dod`] || 'N/A'}`, 10);
                addText(`Profession/Position: ${data[`gen-${genNum}-profession`] || 'N/A'}`, 10);
                addText(`Residence: ${data[`gen-${genNum}-residence`] || 'N/A'}`, 10);
                addText(`Wife's Name: ${data[`gen-${genNum}-wife-name`] || 'N/A'}`, 10);
                addText(`Family Background: ${data[`gen-${genNum}-wife-background`] || 'N/A'}`, 10);
                addText(`Marriage Date: ${data[`gen-${genNum}-marriage-date`] || 'N/A'}`, 10);
                
                // Children
                if (gen.children && gen.children.length > 0) {
                    addText('Children:', 10, true);
                    gen.children.forEach(child => {
                        const childName = data[`gen-${genNum}-child-${child.index}-name`] || 'N/A';
                        const childDob = data[`gen-${genNum}-child-${child.index}-dob`] || '';
                        const childProf = data[`gen-${genNum}-child-${child.index}-profession`] || '';
                        addText(`  - ${childName}${childDob ? ' (Born: ' + childDob + ')' : ''}${childProf ? ' - ' + childProf : ''}`, 9);
                    });
                }
                yPosition += 5;
            });
        }
        
        // Additional sections (abbreviated for PDF)
        if (data['religious-roles'] || data['institutions'] || data['writings']) {
            addText('5. SCHOLARLY, RELIGIOUS, AND SOCIAL CONTRIBUTIONS', 14, true, [0, 102, 204]);
            if (data['religious-roles']) addText(`Religious Roles: ${data['religious-roles']}`, 10);
            if (data['institutions']) addText(`Institutions: ${data['institutions']}`, 10);
            if (data['writings']) addText(`Writings: ${data['writings']}`, 10);
            yPosition += 5;
        }
        
        // Compiler Details
        if (data['compiler-name']) {
            addText('11. COMPILER DETAILS', 14, true, [0, 102, 204]);
            addText(`Compiled By: ${data['compiler-name']}`, 10);
            addText(`Date: ${data['compilation-date'] || new Date().toLocaleDateString()}`, 10);
            if (data['compiler-contact']) addText(`Contact: ${data['compiler-contact']}`, 10);
            yPosition += 5;
        }
        
        // Footer
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10);
            doc.text(`Generated: ${new Date().toLocaleString()}`, margin, doc.internal.pageSize.getHeight() - 10);
        }
        
        // Generate filename
        const formNumber = data.formNumber || 'New';
        const dateStr = new Date().toISOString().split('T')[0];
        const filename = `Genealogy-Form-${formNumber}-${dateStr}.pdf`;
        
        // Save PDF
        doc.save(filename);
        
        showNotification('PDF generated successfully!', 'success');
        
        // Handle email if requested
        if (shouldEmail) {
            setTimeout(() => {
                handleEmailPDF(filename, data);
            }, 1000);
        }
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating PDF: ' + error.message, 'error');
    }
}

// Handle email PDF
function handleEmailPDF(filename, data) {
    const emailAddress = 'abdinzaghi@gmail.com';
    const formNumber = data.formNumber || 'New';
    const subject = encodeURIComponent(`Family Genealogy Form #${formNumber} - Submission`);
    const body = encodeURIComponent(
        `Dear Administrator,\n\n` +
        `Please find attached the Family Genealogy Form #${formNumber}.\n\n` +
        `Form Details:\n` +
        `- Form Number: ${formNumber}\n` +
        `- Version: ${data.version || '1.0'}\n` +
        `- Compiled By: ${data['compiler-name'] || 'N/A'}\n` +
        `- Date: ${data['compilation-date'] || new Date().toLocaleDateString()}\n\n` +
        `The PDF file "${filename}" should be attached to this email.\n\n` +
        `Thank you.\n\n` +
        `---\n` +
        `This is an automated message from the Family Genealogy System.`
    );
    
    // Create mailto link
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    // Show instructions
    const emailInstructions = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    z-index: 10001; max-width: 500px;">
            <h3 style="margin-top: 0; color: #2c3e50;">📧 Email PDF Instructions</h3>
            <p>The PDF has been generated and saved to your Downloads folder.</p>
            <p><strong>To email the PDF:</strong></p>
            <ol style="text-align: left;">
                <li>Click the button below to open your email client</li>
                <li>Attach the PDF file: <strong>${filename}</strong></li>
                <li>Send the email</li>
            </ol>
            <p style="font-size: 0.9em; color: #666;">
                <strong>Note:</strong> The PDF file is in your Downloads folder. 
                You may need to attach it manually if your email client doesn't support automatic attachment.
            </p>
            <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
                <a href="${mailtoLink}" class="btn btn-primary" style="text-decoration: none; display: inline-block; padding: 10px 20px; background: #3498db; color: white; border-radius: 8px;">
                    📧 Open Email Client
                </a>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-secondary" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Close
                </button>
            </div>
            <p style="margin-top: 15px; font-size: 0.85em; color: #666;">
                <strong>Email Address:</strong> ${emailAddress}
            </p>
        </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000;';
    overlay.innerHTML = emailInstructions;
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    document.body.appendChild(overlay);
    
    showNotification('PDF generated! Follow instructions to email it.', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.form-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Auto-save on input change (debounced)
let autoSaveTimeout;
function setupAutoSave() {
    const form = document.getElementById('genealogy-form');
    if (!form) return;
    
    form.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const data = collectAllFormData();
            localStorage.setItem('genealogy-draft', JSON.stringify(data));
            localStorage.setItem('genealogy-complete', JSON.stringify(data));
            localStorage.setItem('genealogy-last-update', new Date().toISOString()); // Update timestamp
            console.log('Auto-saved at', new Date().toLocaleTimeString());
        }, 2000); // Auto-save after 2 seconds of inactivity
    });
}

// Make functions globally available
window.addGeneration = addGeneration;
window.removeGeneration = removeGeneration;
window.addChild = addChild;
window.removeChild = removeChild;
