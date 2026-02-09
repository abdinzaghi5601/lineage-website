// Default Family Tree Data Structure
const defaultFamilyData = {
    name: "Munawwar Chand Sahib",
    title: "(رحمۃ اللہ علیہ)",
    description: "Police Patil during the Nizam of Deccan era",
    children: [
        {
            name: "Maulana Abul Jameel Muhammad Yaseen Sahib",
            title: "(رحمۃ اللہ علیہ)",
            description: "A distinguished Islamic scholar of his era. Known for outstanding religious and educational contributions.",
            children: [
                {
                    name: "Hakeem & Dr. Muhammad Abdus Samad Samdani",
                    title: "(رحمۃ اللہ علیہ)",
                    description: "Eminent physician, Hakeem, and religious scholar. He had eight (8) children.",
                    children: [
                        { name: "8 Children", description: "Eight (8) children" }
                    ]
                }
            ]
        },
        {
            name: "Late Muhammad Abdul Ghani Sahib",
            description: "Second son of Munawwar Chand Sahib. Known within the family for dignity, responsibility, and moral character.",
            children: [
                {
                    name: "Late Muhammad Abdullah Sahib",
                    description: "Wife: Lalama (paternal/maternal grandmother). Residence: Near Moulali, Moulali Industrial Area, New Srinagar Colony, Moulali",
                    children: [
                        {
                            name: "Abdul Mateen",
                            description: "Three sons and one daughter"
                        },
                        {
                            name: "Abdul Mubeen",
                            description: "One son and two daughters"
                        },
                        {
                            name: "Abdul Mohsin",
                            description: "Three daughters"
                        }
                    ]
                }
            ]
        },
        {
            name: "Third Son of Munawwar Chand Sahib",
            description: "Authentic and verified information not yet available. Family records to be updated when details are obtained."
        }
    ]
};

// Function to convert form data to tree structure
function convertFormDataToTree(formData) {
    const ancestorName = formData['ancestor-name'] || formData['family-name'] || 'Ancestor';
    const ancestorTitle = formData['ancestor-title'] || '';
    const ancestorProfession = formData['ancestor-profession'] || '';
    const ancestorNotes = formData['ancestor-notes'] || '';

    const tree = {
        name: ancestorName,
        title: ancestorTitle,
        description: ancestorNotes || ancestorProfession || 'Earliest known ancestor',
        children: []
    };

    if (formData.generations && Array.isArray(formData.generations)) {
        const sortedGens = [...formData.generations].sort((a, b) => a.number - b.number);

        sortedGens.forEach(gen => {
            const fatherName = formData[`gen-${gen.number}-father`];
            if (fatherName) {
                const profession = formData[`gen-${gen.number}-profession`] || '';
                const dob = formData[`gen-${gen.number}-dob`] || '';
                const dod = formData[`gen-${gen.number}-dod`] || '';
                const residence = formData[`gen-${gen.number}-residence`] || '';

                let description = profession;
                if (dob) description += (description ? ' | ' : '') + `Born: ${dob}`;
                if (dod) description += (description ? ' | ' : '') + `Died: ${dod}`;
                if (residence) description += (description ? ' | ' : '') + `Residence: ${residence}`;

                const child = {
                    name: fatherName,
                    description: description || 'Family member',
                    children: []
                };

                if (gen.children && Array.isArray(gen.children)) {
                    const sortedChildren = [...gen.children].sort((a, b) => a.index - b.index);

                    sortedChildren.forEach(childData => {
                        const childName = formData[`gen-${gen.number}-child-${childData.index}-name`];
                        if (childName) {
                            const childProfession = formData[`gen-${gen.number}-child-${childData.index}-profession`] || '';
                            const childDob = formData[`gen-${gen.number}-child-${childData.index}-dob`] || '';
                            const childSpouse = formData[`gen-${gen.number}-child-${childData.index}-spouse`] || '';
                            const childChildren = formData[`gen-${gen.number}-child-${childData.index}-children`] || '';

                            let childDesc = childProfession;
                            if (childDob) childDesc += (childDesc ? ' | ' : '') + `Born: ${childDob}`;
                            if (childSpouse) childDesc += (childDesc ? ' | ' : '') + `Spouse: ${childSpouse}`;
                            if (childChildren) childDesc += (childDesc ? ' | ' : '') + `Children: ${childChildren}`;

                            child.children.push({
                                name: childName,
                                description: childDesc || 'Family member'
                            });
                        }
                    });
                }

                tree.children.push(child);
            }
        });
    }

    return tree;
}

// Load family data (from form or use default)
function loadFamilyData() {
    const savedData = localStorage.getItem('genealogy-complete');
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            const tree = convertFormDataToTree(formData);
            updateTreeStatus(true);
            return tree;
        } catch (error) {
            updateTreeStatus(false, 'Error loading form data. Using default tree.');
            return defaultFamilyData;
        }
    }
    updateTreeStatus(false, 'No form data found. Using default tree. Fill out the form to update!');
    return defaultFamilyData;
}

// Update tree status indicator
function updateTreeStatus(hasFormData, message = '') {
    const statusDiv = document.getElementById('tree-status');
    if (!statusDiv) return;

    const lastUpdate = localStorage.getItem('genealogy-last-update');
    const updateTime = lastUpdate ? new Date(lastUpdate).toLocaleString() : 'Never';
    const currentLang = localStorage.getItem('preferred-language') || 'en';

    if (hasFormData) {
        const treeLoaded = currentLang === 'ur' ? 'درخت کا ڈیٹا فارم سے لوڈ ہوا' : 'Tree data loaded from form';
        const lastUpdated = currentLang === 'ur' ? 'آخری اپ ڈیٹ:' : 'Last updated:';
        statusDiv.innerHTML = `
            <div class="status-badge success">
                <span>&#10003;</span> ${treeLoaded}
                <span class="update-time">${lastUpdated} ${updateTime}</span>
            </div>
        `;
    } else {
        const defaultMsg = currentLang === 'ur' ? 'پہلے سے طے شدہ خاندانی درخت کا ڈیٹا استعمال کر رہے ہیں' : (message || 'Using default family tree data');
        const fillForm = currentLang === 'ur' ? 'فارم بھریں' : 'Fill Form';
        statusDiv.innerHTML = `
            <div class="status-badge info">
                <span>i</span> ${defaultMsg}
                <a href="genealogy-form.html" class="goto-form-link">${fillForm} &rarr;</a>
            </div>
        `;
    }
}

// Initialize with loaded data
let familyData = loadFamilyData();

// Create Family Tree Visualization (SVG)
function createFamilyTree(data, container) {
    const treeContainer = document.getElementById(container);
    treeContainer.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1200 800');
    svg.style.overflow = 'visible';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', 'translate(50, 50)');

    const nodeWidth = 200;
    const nodeHeight = 120;
    const horizontalSpacing = 250;
    const verticalSpacing = 200;

    const nodes = [];
    const links = [];

    function layoutNode(node, x, y, level = 0) {
        const nodeData = {
            id: nodes.length,
            x: x,
            y: y,
            width: nodeWidth,
            height: nodeHeight,
            data: node,
            level: level
        };
        nodes.push(nodeData);

        if (node.children && node.children.length > 0) {
            const childCount = node.children.length;
            const totalWidth = (childCount - 1) * horizontalSpacing;
            const startX = x - totalWidth / 2;

            node.children.forEach((child, index) => {
                const childX = startX + index * horizontalSpacing;
                const childY = y + verticalSpacing;

                links.push({
                    from: nodeData.id,
                    to: nodes.length,
                    fromX: x,
                    fromY: y + nodeHeight,
                    toX: childX,
                    toY: childY
                });

                layoutNode(child, childX, childY, level + 1);
            });
        }

        return nodeData;
    }

    layoutNode(data, 600, 0);

    links.forEach(link => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', link.fromX);
        line.setAttribute('y1', link.fromY);
        line.setAttribute('x2', link.toX);
        line.setAttribute('y2', link.toY);
        line.setAttribute('stroke', '#0f3460');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('class', 'tree-connection');
        g.appendChild(line);
    });

    nodes.forEach(node => {
        const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        nodeGroup.setAttribute('transform', `translate(${node.x - node.width/2}, ${node.y})`);
        nodeGroup.setAttribute('class', 'tree-node');

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', node.width);
        rect.setAttribute('height', node.height);
        rect.setAttribute('rx', '10');
        rect.setAttribute('fill', node.level === 0 ? '#1a1a2e' : node.level === 1 ? '#0f3460' : '#16213e');
        rect.setAttribute('stroke', '#fff');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('opacity', '0.9');
        nodeGroup.appendChild(rect);

        const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        nameText.setAttribute('x', node.width / 2);
        nameText.setAttribute('y', 25);
        nameText.setAttribute('text-anchor', 'middle');
        nameText.setAttribute('fill', '#fff');
        nameText.setAttribute('font-size', '12');
        nameText.setAttribute('font-weight', '600');
        nameText.textContent = truncateText(node.data.name, 25);
        nodeGroup.appendChild(nameText);

        if (node.data.title) {
            const titleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            titleText.setAttribute('x', node.width / 2);
            titleText.setAttribute('y', 45);
            titleText.setAttribute('text-anchor', 'middle');
            titleText.setAttribute('fill', '#fff');
            titleText.setAttribute('font-size', '11');
            titleText.setAttribute('font-family', 'Noto Sans Arabic, Arial');
            titleText.textContent = node.data.title;
            nodeGroup.appendChild(titleText);
        }

        if (node.data.description) {
            const descText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            descText.setAttribute('x', node.width / 2);
            descText.setAttribute('y', 65);
            descText.setAttribute('text-anchor', 'middle');
            descText.setAttribute('fill', '#fff');
            descText.setAttribute('font-size', '10');
            descText.setAttribute('opacity', '0.9');
            descText.textContent = truncateText(node.data.description, 30);
            nodeGroup.appendChild(descText);
        }

        nodeGroup.addEventListener('click', () => {
            showNodeDetails(node.data);
        });

        nodeGroup.addEventListener('mouseenter', () => {
            rect.setAttribute('opacity', '1');
            rect.setAttribute('stroke-width', '3');
        });

        nodeGroup.addEventListener('mouseleave', () => {
            rect.setAttribute('opacity', '0.9');
            rect.setAttribute('stroke-width', '2');
        });

        g.appendChild(nodeGroup);
    });

    svg.appendChild(g);
    treeContainer.appendChild(svg);

    const maxY = Math.max(...nodes.map(n => n.y + n.height)) + 50;
    const maxX = Math.max(...nodes.map(n => n.x + n.width/2)) + 50;
    const minX = Math.min(...nodes.map(n => n.x - n.width/2)) - 50;
    svg.setAttribute('viewBox', `${minX} 0 ${maxX - minX} ${maxY}`);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

// Show node details in a modal
function showNodeDetails(node) {
    const modal = document.getElementById('person-modal');
    const modalName = document.getElementById('modal-name');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalChildren = document.getElementById('modal-children');

    if (!modal) return;

    modalName.textContent = node.name || '';
    modalTitle.textContent = node.title || '';
    modalDesc.textContent = node.description || 'No additional details available.';

    // Show children list in modal
    if (modalChildren) {
        modalChildren.innerHTML = '';
        if (node.children && node.children.length > 0) {
            const heading = document.createElement('div');
            heading.className = 'modal-children-heading';
            heading.textContent = `Members (${node.children.length})`;
            modalChildren.appendChild(heading);

            node.children.forEach(child => {
                const item = document.createElement('div');
                item.className = 'modal-child-item';
                const cName = document.createElement('div');
                cName.className = 'modal-child-name';
                cName.textContent = child.name;
                item.appendChild(cName);
                if (child.description) {
                    const cDesc = document.createElement('div');
                    cDesc.className = 'modal-child-desc';
                    cDesc.textContent = child.description;
                    item.appendChild(cDesc);
                }
                if (child.children && child.children.length > 0) {
                    const cCount = document.createElement('span');
                    cCount.className = 'modal-child-count';
                    cCount.textContent = `${child.children.length} descendant${child.children.length > 1 ? 's' : ''}`;
                    item.appendChild(cCount);
                }
                modalChildren.appendChild(item);
            });
            modalChildren.style.display = 'block';
        } else {
            modalChildren.style.display = 'none';
        }
    }

    modal.hidden = false;
    modal.offsetHeight;
    modal.classList.add('visible');

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeModal() {
    const modal = document.getElementById('person-modal');
    if (!modal) return;

    modal.classList.remove('visible');
    setTimeout(() => {
        modal.hidden = true;
    }, 200);
}

// Count all descendants recursively
function countDescendants(node) {
    if (!node.children || node.children.length === 0) return 0;
    let count = node.children.length;
    node.children.forEach(child => {
        count += countDescendants(child);
    });
    return count;
}

// HTML-based tree with expand/collapse on click
function createHTMLFamilyTree(data, container) {
    const treeContainer = document.getElementById(container);
    treeContainer.innerHTML = '';

    function createNodeHTML(node, level = 0) {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = `tree-node-html level-${level}`;

        const hasChildren = node.children && node.children.length > 0;

        const card = document.createElement('div');
        card.className = 'tree-node-card';
        if (level === 0) card.classList.add('root-node');
        else if (level === 1) card.classList.add('first-gen');
        else card.classList.add('child-node');

        // Card inner layout
        const cardTop = document.createElement('div');
        cardTop.className = 'tree-card-top';

        const name = document.createElement('div');
        name.className = 'tree-node-name';
        name.textContent = node.name;
        cardTop.appendChild(name);

        card.appendChild(cardTop);

        if (node.title) {
            const title = document.createElement('div');
            title.className = 'tree-node-title arabic';
            title.textContent = node.title;
            card.appendChild(title);
        }

        if (node.description) {
            const desc = document.createElement('div');
            desc.className = 'tree-node-desc';
            desc.textContent = node.description;
            card.appendChild(desc);
        }

        // Bottom row: member count badge + info button
        const cardBottom = document.createElement('div');
        cardBottom.className = 'tree-card-bottom';

        if (hasChildren) {
            const totalDesc = countDescendants(node);
            const badge = document.createElement('span');
            badge.className = 'tree-member-badge';
            badge.textContent = `${node.children.length} child${node.children.length > 1 ? 'ren' : ''} · ${totalDesc} total`;
            cardBottom.appendChild(badge);

            // Expand/collapse chevron
            const chevron = document.createElement('span');
            chevron.className = 'tree-chevron';
            chevron.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
            cardBottom.appendChild(chevron);
        }

        // Info button
        const infoBtn = document.createElement('button');
        infoBtn.className = 'tree-info-btn';
        infoBtn.setAttribute('aria-label', `View details for ${node.name}`);
        infoBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>';
        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNodeDetails(node);
        });
        cardBottom.appendChild(infoBtn);

        card.appendChild(cardBottom);

        nodeDiv.appendChild(card);

        // Children container (starts collapsed except root level)
        if (hasChildren) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';

            // Root starts expanded, everything else collapsed
            if (level > 0) {
                childrenContainer.classList.add('collapsed');
            } else {
                card.classList.add('expanded');
            }

            node.children.forEach(child => {
                childrenContainer.appendChild(createNodeHTML(child, level + 1));
            });

            nodeDiv.appendChild(childrenContainer);

            // Click the card to expand/collapse
            card.addEventListener('click', (e) => {
                // Don't toggle if clicking the info button
                if (e.target.closest('.tree-info-btn')) return;

                const isCollapsed = childrenContainer.classList.contains('collapsed');
                if (isCollapsed) {
                    childrenContainer.classList.remove('collapsed');
                    childrenContainer.classList.add('expanding');
                    card.classList.add('expanded');
                    // Measure height for animation
                    const height = childrenContainer.scrollHeight;
                    childrenContainer.style.maxHeight = height + 'px';
                    setTimeout(() => {
                        childrenContainer.classList.remove('expanding');
                        childrenContainer.style.maxHeight = 'none';
                    }, 350);
                } else {
                    // Collapse
                    const height = childrenContainer.scrollHeight;
                    childrenContainer.style.maxHeight = height + 'px';
                    childrenContainer.offsetHeight; // force reflow
                    childrenContainer.classList.add('collapsing');
                    childrenContainer.style.maxHeight = '0';
                    card.classList.remove('expanded');
                    setTimeout(() => {
                        childrenContainer.classList.remove('collapsing');
                        childrenContainer.classList.add('collapsed');
                        childrenContainer.style.maxHeight = '';
                    }, 350);
                }
            });
        }

        return nodeDiv;
    }

    const treeHTML = createNodeHTML(data);
    treeContainer.appendChild(treeHTML);
}

// Refresh tree with latest data
function refreshTree() {
    familyData = loadFamilyData();
    const treeContainer = document.getElementById('family-tree');
    if (treeContainer) {
        createHTMLFamilyTree(familyData, 'family-tree');
        populateFilters();
        calculateStatistics();

        const currentLang = localStorage.getItem('preferred-language') || 'en';
        const message = currentLang === 'ur'
            ? 'خاندانی درخت تازہ ترین ڈیٹا کے ساتھ اپ ڈیٹ ہو گیا!'
            : 'Family tree updated with latest data!';
        showTreeNotification(message, 'success');
    }
}

// Show notification
function showTreeNotification(message, type = 'info') {
    const existing = document.querySelector('.tree-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `tree-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 14px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 380px;
        font-weight: 500;
        font-size: 0.95em;
        cursor: pointer;
    `;

    notification.addEventListener('click', () => notification.remove());
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Use storage event instead of polling (fires when another tab changes localStorage)
function setupAutoRefresh() {
    window.addEventListener('storage', function(e) {
        if (e.key === 'genealogy-last-update' || e.key === 'genealogy-complete') {
            refreshTree();
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    familyData = loadFamilyData();
    createHTMLFamilyTree(familyData, 'family-tree');

    setupAutoRefresh();
    addRefreshButton();
    initializeSearch();
    initializeStatistics();
    initializeTimeline();
    initializeViewToggles();
    initializeModal();
    initializeLanguageSwitcher();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll-reveal animation
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.generation-section, .person-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize language switcher via addEventListener (no inline onclick)
function initializeLanguageSwitcher() {
    const btn = document.getElementById('language-switcher');
    if (!btn) return;

    btn.addEventListener('click', function() {
        const currentLang = localStorage.getItem('preferred-language') || 'en';
        const newLang = currentLang === 'en' ? 'ur' : 'en';

        if (typeof switchLanguage === 'function') {
            switchLanguage(newLang);
        } else {
            localStorage.setItem('preferred-language', newLang);
            location.reload();
        }
    });
}

// Initialize modal close behavior
function initializeModal() {
    const modal = document.getElementById('person-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
}

// Add refresh button
function addRefreshButton() {
    const treeContainer = document.querySelector('.family-tree-container');
    if (!treeContainer) return;

    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = 'Refresh Tree';
    refreshBtn.className = 'refresh-tree-btn';
    refreshBtn.setAttribute('aria-label', 'Refresh family tree data');

    refreshBtn.addEventListener('click', () => {
        refreshBtn.textContent = 'Refreshing...';
        refreshBtn.disabled = true;
        setTimeout(() => {
            refreshTree();
            refreshBtn.textContent = 'Refresh Tree';
            refreshBtn.disabled = false;
        }, 500);
    });

    const sectionTitle = treeContainer.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.parentElement.style.position = 'relative';
        treeContainer.appendChild(refreshBtn);
    }
}

// ========== SEARCH ==========

function initializeSearch() {
    const searchInput = document.getElementById('family-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        performSearch(searchTerm);
    });

    populateFilters();
}

function performSearch(term) {
    if (!term) {
        document.querySelectorAll('.person-card, .generation-section, .tree-node-card').forEach(el => {
            el.style.display = '';
            el.classList.remove('hidden');
        });
        // Clear any previous highlights
        document.querySelectorAll('.highlight').forEach(el => {
            el.replaceWith(document.createTextNode(el.textContent));
        });
        return;
    }

    let found = false;

    document.querySelectorAll('.person-name, .person-card, .tree-node-name').forEach(el => {
        const text = el.textContent.toLowerCase();
        const parent = el.closest('.person-card, .generation-section, .tree-node-card');

        if (text.includes(term)) {
            if (parent) {
                parent.style.display = '';
                parent.classList.remove('hidden');
                highlightText(el, term);
                found = true;
            }
        } else {
            if (parent && !parent.querySelector('.person-name, .tree-node-name')?.textContent.toLowerCase().includes(term)) {
                parent.style.display = 'none';
                parent.classList.add('hidden');
            }
        }
    });

    if (!found && term.length > 0) {
        const currentLang = localStorage.getItem('preferred-language') || 'en';
        const message = currentLang === 'ur'
            ? 'آپ کی تلاش سے میل کھانے والا کوئی خاندانی رکن نہیں ملا۔'
            : 'No family members found matching your search.';
        showTreeNotification(message, 'info');
    }
}

// Escape special regex characters to prevent ReDoS / errors
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Safe highlight using DOM manipulation instead of innerHTML (prevents XSS)
function highlightText(element, term) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    const escapedTerm = escapeRegExp(term);
    const regex = new RegExp(`(${escapedTerm})`, 'gi');

    textNodes.forEach(textNode => {
        const text = textNode.nodeValue;
        if (!regex.test(text)) return;
        regex.lastIndex = 0;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            }
            const mark = document.createElement('span');
            mark.className = 'highlight';
            mark.textContent = match[1];
            fragment.appendChild(mark);
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        textNode.parentNode.replaceChild(fragment, textNode);
    });
}

// Populate filter dropdowns
function populateFilters() {
    const genFilter = document.getElementById('filter-generation');
    const profFilter = document.getElementById('filter-profession');

    if (!genFilter || !profFilter) return;

    while (genFilter.children.length > 1) {
        genFilter.removeChild(genFilter.lastChild);
    }
    while (profFilter.children.length > 1) {
        profFilter.removeChild(profFilter.lastChild);
    }

    const data = familyData;
    const generations = new Set();
    const professions = new Set();

    const savedData = localStorage.getItem('genealogy-complete');
    let formData = null;
    if (savedData) {
        try {
            formData = JSON.parse(savedData);
        } catch (e) {
            // Ignore parse errors
        }
    }

    function collectData(node, level = 0) {
        if (node.name) {
            generations.add(`Generation ${level + 1}`);

            if (node.description) {
                const profPatterns = [
                    /Profession[:\s]+([^|]+)/i,
                    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*(?:-|–|—)/,
                    /(?:as|was|is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i
                ];

                for (const pattern of profPatterns) {
                    const match = node.description.match(pattern);
                    if (match && match[1]) {
                        const prof = match[1].trim();
                        if (prof.length > 2 && prof.length < 50) {
                            professions.add(prof);
                        }
                    }
                }

                const commonProfs = ['Scholar', 'Physician', 'Doctor', 'Hakeem', 'Teacher', 'Engineer', 'Lawyer', 'Business', 'Farmer', 'Merchant', 'Administrator', 'Police', 'Judge', 'Imam', 'Maulana'];
                commonProfs.forEach(prof => {
                    if (node.description.toLowerCase().includes(prof.toLowerCase())) {
                        professions.add(prof);
                    }
                });
            }
        }

        if (node.children) {
            node.children.forEach(child => collectData(child, level + 1));
        }
    }

    collectData(data);

    if (formData) {
        if (formData.generations && Array.isArray(formData.generations)) {
            formData.generations.forEach(gen => {
                const genNum = gen.number || 1;
                generations.add(`Generation ${genNum}`);

                const profKey = `gen-${genNum}-profession`;
                if (formData[profKey]) {
                    const prof = formData[profKey].trim();
                    if (prof) professions.add(prof);
                }

                if (gen.children && Array.isArray(gen.children)) {
                    gen.children.forEach(child => {
                        const childProfKey = `gen-${genNum}-child-${child.index}-profession`;
                        if (formData[childProfKey]) {
                            const childProf = formData[childProfKey].trim();
                            if (childProf) professions.add(childProf);
                        }
                    });
                }
            });
        }

        if (formData['ancestor-profession']) {
            professions.add(formData['ancestor-profession'].trim());
        }

        if (formData['main-profession']) {
            const mainProfs = formData['main-profession'].split(',').map(p => p.trim()).filter(p => p);
            mainProfs.forEach(p => professions.add(p));
        }
    }

    Array.from(generations).sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0);
        return numA - numB;
    }).forEach(gen => {
        const option = document.createElement('option');
        option.value = gen;
        option.textContent = gen;
        genFilter.appendChild(option);
    });

    Array.from(professions).sort().filter(p => p && p.length > 2).slice(0, 20).forEach(prof => {
        const option = document.createElement('option');
        option.value = prof;
        option.textContent = prof;
        profFilter.appendChild(option);
    });

    if (!genFilter.hasAttribute('data-listener-added')) {
        genFilter.addEventListener('change', applyFilters);
        genFilter.setAttribute('data-listener-added', 'true');
    }

    if (!profFilter.hasAttribute('data-listener-added')) {
        profFilter.addEventListener('change', applyFilters);
        profFilter.setAttribute('data-listener-added', 'true');
    }

    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn && !clearBtn.hasAttribute('data-listener-added')) {
        clearBtn.addEventListener('click', function() {
            genFilter.value = '';
            profFilter.value = '';
            document.getElementById('family-search').value = '';
            applyFilters();
            performSearch('');
        });
        clearBtn.setAttribute('data-listener-added', 'true');
    }
}

function applyFilters() {
    const genFilter = document.getElementById('filter-generation').value;
    const profFilter = document.getElementById('filter-profession').value;
    const searchTerm = document.getElementById('family-search').value.toLowerCase();

    document.querySelectorAll('.person-card, .generation-section, .tree-node-card').forEach(el => {
        let show = true;

        if (genFilter) {
            const genText = el.textContent;
            if (!genText.includes(genFilter)) show = false;
        }

        if (profFilter && show) {
            const profText = el.textContent;
            if (!profText.includes(profFilter)) show = false;
        }

        if (searchTerm && show) {
            const searchText = el.textContent.toLowerCase();
            if (!searchText.includes(searchTerm)) show = false;
        }

        el.style.display = show ? '' : 'none';
    });
}

// ========== STATISTICS ==========

function initializeStatistics() {
    calculateStatistics();
}

function calculateStatistics() {
    const data = familyData;

    let totalMembers = 0;
    let maxGeneration = 0;
    let families = 0;
    let dates = [];

    function countMembers(node, level = 0) {
        if (node.name) {
            totalMembers++;
            maxGeneration = Math.max(maxGeneration, level + 1);

            const dateMatch = node.description?.match(/\d{4}-\d{2}-\d{2}|\d{4}/g);
            if (dateMatch) {
                dates.push(...dateMatch);
            }
        }

        if (node.children && node.children.length > 0) {
            families += node.children.length;
            node.children.forEach(child => countMembers(child, level + 1));
        }
    }

    countMembers(data);

    const yearDates = dates.map(d => {
        const year = d.match(/\d{4}/)?.[0];
        return year ? parseInt(year) : null;
    }).filter(y => y !== null);

    const timelineSpan = yearDates.length > 0
        ? `${Math.min(...yearDates)} - ${Math.max(...yearDates)}`
        : 'N/A';

    document.getElementById('stat-total-members').textContent = totalMembers;
    document.getElementById('stat-generations').textContent = maxGeneration;
    document.getElementById('stat-families').textContent = families || 'N/A';
    document.getElementById('stat-timeline').textContent = timelineSpan;
}

// ========== TIMELINE ==========

function initializeTimeline() {
    // Timeline generated on demand when view is switched
}

function generateTimeline() {
    const timelineContainer = document.getElementById('timeline-content');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = '';

    const events = [];

    function collectEvents(node, level = 0) {
        if (node.name) {
            events.push({
                name: node.name,
                title: node.title || '',
                description: node.description || '',
                level: level,
                date: extractDate(node.description)
            });
        }

        if (node.children) {
            node.children.forEach(child => collectEvents(child, level + 1));
        }
    }

    collectEvents(familyData);

    events.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date.localeCompare(b.date);
    });

    events.forEach(event => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        const currentLang = localStorage.getItem('preferred-language') || 'en';
        const dateStr = event.date || (currentLang === 'ur' ? 'تاریخ نامعلوم' : 'Date Unknown');
        const levelStr = `Generation ${event.level + 1}`;

        const dateDiv = document.createElement('div');
        dateDiv.className = 'timeline-date';
        dateDiv.textContent = dateStr;
        timelineItem.appendChild(dateDiv);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'timeline-name';
        nameDiv.textContent = `${event.name} ${event.title}`;
        timelineItem.appendChild(nameDiv);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'timeline-details';
        const strong = document.createElement('strong');
        strong.textContent = levelStr;
        detailsDiv.appendChild(strong);
        detailsDiv.appendChild(document.createElement('br'));
        detailsDiv.appendChild(document.createTextNode(event.description || 'No additional details available.'));
        timelineItem.appendChild(detailsDiv);

        timelineContainer.appendChild(timelineItem);
    });

    if (events.length === 0) {
        const currentLang = localStorage.getItem('preferred-language') || 'en';
        const message = currentLang === 'ur'
            ? 'وقت کی لائن کا ڈیٹا دستیاب نہیں۔ وقت کی لائن دیکھنے کے لیے فارم میں تاریخوں کے ساتھ بھریں۔'
            : 'No timeline data available. Fill out the form with dates to see timeline.';
        const p = document.createElement('p');
        p.style.cssText = 'text-align: center; color: #636e72; padding: 40px;';
        p.textContent = message;
        timelineContainer.appendChild(p);
    }
}

function extractDate(description) {
    if (!description) return null;

    const datePatterns = [
        /\d{4}-\d{2}-\d{2}/,
        /\d{2}\/\d{2}\/\d{4}/,
        /\d{4}/
    ];

    for (const pattern of datePatterns) {
        const match = description.match(pattern);
        if (match) return match[0];
    }

    return null;
}

// ========== VIEW TOGGLES ==========

function initializeViewToggles() {
    const treeViewBtn = document.getElementById('tree-view-btn');
    const timelineViewBtn = document.getElementById('timeline-view-btn');
    const statsViewBtn = document.getElementById('stats-view-btn');

    if (!treeViewBtn) return;

    treeViewBtn.addEventListener('click', () => switchView('tree'));
    timelineViewBtn.addEventListener('click', () => switchView('timeline'));
    statsViewBtn.addEventListener('click', () => switchView('stats'));
}

function switchView(view) {
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    const activeBtn = document.getElementById(`${view}-view-btn`);
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');

    const treeContainer = document.querySelector('.family-tree-container');
    const treeDetails = document.querySelector('.family-details');
    const timelineContainer = document.getElementById('timeline-container');
    const statsDashboard = document.querySelector('.stats-dashboard');

    if (view === 'tree') {
        if (treeContainer) treeContainer.style.display = 'block';
        if (treeDetails) treeDetails.style.display = 'block';
        if (timelineContainer) timelineContainer.style.display = 'none';
        if (statsDashboard) statsDashboard.style.display = 'block';
    } else if (view === 'timeline') {
        if (treeContainer) treeContainer.style.display = 'none';
        if (treeDetails) treeDetails.style.display = 'none';
        if (timelineContainer) timelineContainer.style.display = 'block';
        if (statsDashboard) statsDashboard.style.display = 'none';
        generateTimeline();
    } else if (view === 'stats') {
        if (treeContainer) treeContainer.style.display = 'none';
        if (treeDetails) treeDetails.style.display = 'none';
        if (timelineContainer) timelineContainer.style.display = 'none';
        if (statsDashboard) statsDashboard.style.display = 'block';
        calculateStatistics();
    }
}

// Force update filters
function updateFilters() {
    familyData = loadFamilyData();
    populateFilters();
    calculateStatistics();
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    const message = currentLang === 'ur'
        ? 'فلٹرز تازہ ترین فارم ڈیٹا کے ساتھ اپ ڈیٹ ہو گئے!'
        : 'Filters updated with latest form data!';
    showTreeNotification(message, 'success');
}
