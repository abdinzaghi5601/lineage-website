// Default Family Tree Data Structure
// Root: Munawwar Chand Sahib → Abdul Jameel → Abdul Waheed (and his children)
const defaultFamilyData = {
    name: "Munawwar Chand Sahib",
    title: "(رحمۃ اللہ علیہ)",
    description: "Police Patil during the Nizam of Deccan era",
    children: [
        {
            name: "Maulana Abul Jameel Muhammad Yaseen Sahib",
            title: "Abdul Jameel (رحمۃ اللہ علیہ)",
            description: "A distinguished Islamic scholar of his era. Known for outstanding religious and educational contributions. Ancestral homeland Hyderabad.",
            children: [
                {
                    name: "Hakeem & Dr. Muhammad Abdus Samad Samdani",
                    title: "(رحمۃ اللہ علیہ)",
                    description: "Eminent physician, Hakeem, and religious scholar. He had eight (8) children.",
                    children: []
                },
                {
                    name: "Hafiz Abdul Waheed",
                    description: "Hafiz, teacher, court auditor, religious scholar. Graduate from Umrabad and King Faisal University. Residence: Qatar. Wife: Asma Shaheen.",
                    children: [
                        { name: "Farha Yasmeen", description: "Family member" },
                        { name: "Abdullah", description: "Engineer. Born: 1987-01-05. Compiled this genealogy." },
                        { name: "Fatima Zeba", description: "Family member" },
                        { name: "Abdur Rahman", description: "Pharmacist. Born: 1988-12-12" }
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
                    description: "Wife: Lalama. Residence: Near Moulali, Moulali Industrial Area, New Srinagar Colony, Moulali",
                    children: [
                        { name: "Abdul Mateen", description: "Three sons and one daughter" },
                        { name: "Abdul Mubeen", description: "One son and two daughters" },
                        { name: "Abdul Mohsin", description: "Three daughters" }
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
    const updateTime = lastUpdate ? new Date(lastUpdate).toLocaleString() : '';
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
        // No form link shown to public visitors
        statusDiv.innerHTML = '';
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

// HTML-based tree with expand/collapse and connector lines
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

        const cardBottom = document.createElement('div');
        cardBottom.className = 'tree-card-bottom';

        if (hasChildren) {
            const totalDesc = countDescendants(node);
            const badge = document.createElement('span');
            badge.className = 'tree-member-badge';
            badge.textContent = `${node.children.length} child${node.children.length > 1 ? 'ren' : ''} · ${totalDesc} total`;
            cardBottom.appendChild(badge);

            const chevron = document.createElement('span');
            chevron.className = 'tree-chevron';
            chevron.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
            cardBottom.appendChild(chevron);
        }

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

        if (hasChildren) {
            // Vertical line down from parent card
            const lineDown = document.createElement('div');
            lineDown.className = 'tree-line-down';
            nodeDiv.appendChild(lineDown);

            // Horizontal bar connecting children (only if more than 1 child)
            if (node.children.length > 1) {
                const lineHoriz = document.createElement('div');
                lineHoriz.className = 'tree-line-horiz';
                nodeDiv.appendChild(lineHoriz);
            }

            // Children row
            const childrenRow = document.createElement('div');
            childrenRow.className = 'tree-children';
            childrenRow.setAttribute('data-count', node.children.length);

            if (level > 0) {
                childrenRow.classList.add('collapsed');
                lineDown.classList.add('collapsed');
                if (node.children.length > 1) {
                    nodeDiv.querySelector('.tree-line-horiz').classList.add('collapsed');
                }
            } else {
                card.classList.add('expanded');
            }

            node.children.forEach(child => {
                // Wrapper for each child with its own vertical connector
                const childWrapper = document.createElement('div');
                childWrapper.className = 'tree-child-wrapper';

                if (node.children.length > 1) {
                    const childLineUp = document.createElement('div');
                    childLineUp.className = 'tree-line-up';
                    childWrapper.appendChild(childLineUp);
                }

                childWrapper.appendChild(createNodeHTML(child, level + 1));
                childrenRow.appendChild(childWrapper);
            });

            nodeDiv.appendChild(childrenRow);

            // Click to expand/collapse
            card.addEventListener('click', (e) => {
                if (e.target.closest('.tree-info-btn')) return;

                const lines = nodeDiv.querySelectorAll(':scope > .tree-line-down, :scope > .tree-line-horiz');
                const isCollapsed = childrenRow.classList.contains('collapsed');

                if (isCollapsed) {
                    childrenRow.classList.remove('collapsed');
                    childrenRow.classList.add('expanding', 'animating');
                    lines.forEach(l => l.classList.remove('collapsed'));
                    card.classList.add('expanded');
                    const height = childrenRow.scrollHeight;
                    childrenRow.style.maxHeight = height + 'px';
                    setTimeout(() => {
                        childrenRow.classList.remove('expanding', 'animating');
                        childrenRow.style.maxHeight = 'none';
                        // Scroll expanded area into view inside the tree container
                        const treeContainer = document.getElementById('family-tree');
                        if (treeContainer && childrenRow.offsetParent) {
                            childrenRow.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                        }
                    }, 380);
                } else {
                    const height = childrenRow.scrollHeight;
                    childrenRow.classList.add('animating');
                    childrenRow.style.maxHeight = height + 'px';
                    childrenRow.offsetHeight;
                    childrenRow.classList.add('collapsing');
                    childrenRow.style.maxHeight = '0';
                    lines.forEach(l => l.classList.add('collapsed'));
                    card.classList.remove('expanded');
                    setTimeout(() => {
                        childrenRow.classList.remove('collapsing', 'animating');
                        childrenRow.classList.add('collapsed');
                        childrenRow.style.maxHeight = '';
                    }, 350);
                }
            });
        }

        return nodeDiv;
    }

    const treeHTML = createNodeHTML(data);
    treeContainer.appendChild(treeHTML);
}

// Horizontal (left-to-right) family tree with expand/collapse
function createHorizontalFamilyTree(data, containerId) {
    const treeContainer = document.getElementById(containerId);
    if (!treeContainer) return;
    treeContainer.innerHTML = '';
    treeContainer.classList.add('tree-horizontal-wrap');

    function createHNode(node, level) {
        const wrapper = document.createElement('div');
        wrapper.className = 'htree-node';

        const row = document.createElement('div');
        row.className = 'htree-row';

        // Card
        const card = document.createElement('div');
        card.className = 'tree-node-card tree-horizontal-card';
        if (level === 0) card.classList.add('root-node');
        else if (level === 1) card.classList.add('first-gen');
        else card.classList.add('child-node');

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

        const hasChildren = node.children && node.children.length > 0;

        const cardBottom = document.createElement('div');
        cardBottom.className = 'tree-card-bottom';

        if (hasChildren) {
            const totalDesc = countDescendants(node);
            const badge = document.createElement('span');
            badge.className = 'tree-member-badge';
            badge.textContent = `${node.children.length} child${node.children.length > 1 ? 'ren' : ''} · ${totalDesc} total`;
            cardBottom.appendChild(badge);

            // Chevron pointing right (rotates down when expanded)
            const chevron = document.createElement('span');
            chevron.className = 'htree-chevron';
            chevron.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>';
            cardBottom.appendChild(chevron);
        }

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
        row.appendChild(card);

        if (hasChildren) {
            // Horizontal connector line from card to children
            const lineH = document.createElement('div');
            lineH.className = 'htree-line-h';
            row.appendChild(lineH);

            // Vertical branch + children column
            const childrenBlock = document.createElement('div');
            childrenBlock.className = 'htree-children-block';

            const vertLine = document.createElement('div');
            vertLine.className = 'htree-line-v';
            childrenBlock.appendChild(vertLine);

            const childrenCol = document.createElement('div');
            childrenCol.className = 'htree-children';

            // Start collapsed for levels > 0
            if (level > 0) {
                childrenBlock.classList.add('htree-collapsed');
                lineH.classList.add('htree-collapsed');
            } else {
                card.classList.add('expanded');
            }

            node.children.forEach(child => {
                childrenCol.appendChild(createHNode(child, level + 1));
            });

            childrenBlock.appendChild(childrenCol);
            row.appendChild(childrenBlock);

            // Click card to expand/collapse
            card.addEventListener('click', (e) => {
                if (e.target.closest('.tree-info-btn')) return;

                const isCollapsed = childrenBlock.classList.contains('htree-collapsed');

                if (isCollapsed) {
                    childrenBlock.classList.remove('htree-collapsed');
                    lineH.classList.remove('htree-collapsed');
                    card.classList.add('expanded');
                    // Animate in
                    childrenBlock.style.maxWidth = '0';
                    childrenBlock.style.opacity = '0';
                    childrenBlock.offsetHeight; // force reflow
                    childrenBlock.style.transition = 'max-width 0.4s ease, opacity 0.3s ease';
                    childrenBlock.style.maxWidth = childrenBlock.scrollWidth + 'px';
                    childrenBlock.style.opacity = '1';
                    setTimeout(() => {
                        childrenBlock.style.maxWidth = 'none';
                        childrenBlock.style.transition = '';
                    }, 420);
                } else {
                    // Animate out
                    childrenBlock.style.maxWidth = childrenBlock.scrollWidth + 'px';
                    childrenBlock.style.opacity = '1';
                    childrenBlock.offsetHeight;
                    childrenBlock.style.transition = 'max-width 0.4s ease, opacity 0.25s ease';
                    childrenBlock.style.maxWidth = '0';
                    childrenBlock.style.opacity = '0';
                    lineH.classList.add('htree-collapsed');
                    card.classList.remove('expanded');
                    setTimeout(() => {
                        childrenBlock.classList.add('htree-collapsed');
                        childrenBlock.style.maxWidth = '';
                        childrenBlock.style.opacity = '';
                        childrenBlock.style.transition = '';
                    }, 400);
                }
            });
        } else {
            // Leaf node — just click for details
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.tree-info-btn')) showNodeDetails(node);
            });
        }

        wrapper.appendChild(row);
        return wrapper;
    }

    treeContainer.appendChild(createHNode(data, 0));
}

// Refresh tree with latest data
function refreshTree() {
    familyData = loadFamilyData();
    const treeContainer = document.getElementById('family-tree');
    if (treeContainer) {
        if (currentTreeView === 'horizontal') {
            createHorizontalFamilyTree(familyData, 'family-tree');
        } else {
            createHTMLFamilyTree(familyData, 'family-tree');
        }
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

// ========== CUSTOM DROPDOWN LOGIC ==========

function initializeCustomDropdowns() {
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector('.custom-dropdown-trigger');
        if (!trigger || trigger.hasAttribute('data-dropdown-init')) return;
        trigger.setAttribute('data-dropdown-init', 'true');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');
            // Close all dropdowns
            document.querySelectorAll('.custom-dropdown.open').forEach(d => d.classList.remove('open'));
            if (!isOpen) {
                dropdown.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            } else {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard support
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            } else if (e.key === 'Escape') {
                dropdown.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close dropdowns when clicking outside
    if (!document._dropdownCloseInit) {
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-dropdown.open').forEach(d => {
                d.classList.remove('open');
                d.querySelector('.custom-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
            });
        });
        document._dropdownCloseInit = true;
    }
}

function setCustomDropdownValue(dropdownId, value, label) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    const hidden = dropdown.querySelector('input[type="hidden"]');
    const labelEl = dropdown.querySelector('.custom-dropdown-label');
    const items = dropdown.querySelectorAll('.custom-dropdown-item');

    if (hidden) hidden.value = value;
    if (labelEl) labelEl.textContent = label;

    items.forEach(item => {
        item.classList.toggle('selected', item.getAttribute('data-value') === value);
        item.setAttribute('aria-selected', item.getAttribute('data-value') === value ? 'true' : 'false');
    });

    dropdown.classList.remove('open');
    dropdown.querySelector('.custom-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
}

function populateCustomDropdown(dropdownId, listId, options, defaultLabel) {
    const list = document.getElementById(listId);
    if (!list) return;

    // Clear existing items
    list.innerHTML = '';

    // Add default "All" item
    const defaultItem = document.createElement('li');
    defaultItem.className = 'custom-dropdown-item selected';
    defaultItem.setAttribute('data-value', '');
    defaultItem.setAttribute('role', 'option');
    defaultItem.setAttribute('aria-selected', 'true');
    defaultItem.textContent = defaultLabel;
    defaultItem.addEventListener('click', (e) => {
        e.stopPropagation();
        setCustomDropdownValue(dropdownId, '', defaultLabel);
        applyFilters();
    });
    list.appendChild(defaultItem);

    // Add option items
    options.forEach(opt => {
        const item = document.createElement('li');
        item.className = 'custom-dropdown-item';
        item.setAttribute('data-value', opt);
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', 'false');
        item.textContent = opt;
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            setCustomDropdownValue(dropdownId, opt, opt);
            applyFilters();
        });
        list.appendChild(item);
    });
}

// Populate filter dropdowns
function populateFilters() {
    const genHidden = document.getElementById('filter-generation');
    const profHidden = document.getElementById('filter-profession');

    if (!genHidden || !profHidden) return;

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

    const genOptions = Array.from(generations).sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || 0);
        const numB = parseInt(b.match(/\d+/)?.[0] || 0);
        return numA - numB;
    });

    const profOptions = Array.from(professions).sort().filter(p => p && p.length > 2).slice(0, 20);

    populateCustomDropdown('filter-generation-dropdown', 'filter-generation-list', genOptions, 'All Generations');
    populateCustomDropdown('filter-profession-dropdown', 'filter-profession-list', profOptions, 'All Professions');

    initializeCustomDropdowns();

    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn && !clearBtn.hasAttribute('data-listener-added')) {
        clearBtn.addEventListener('click', function() {
            setCustomDropdownValue('filter-generation-dropdown', '', 'All Generations');
            setCustomDropdownValue('filter-profession-dropdown', '', 'All Professions');
            document.getElementById('family-search').value = '';
            applyFilters();
            performSearch('');
        });
        clearBtn.setAttribute('data-listener-added', 'true');
    }
}

function applyFilters() {
    const genFilterEl = document.getElementById('filter-generation');
    const profFilterEl = document.getElementById('filter-profession');
    const genFilter = genFilterEl ? genFilterEl.value : '';
    const profFilter = profFilterEl ? profFilterEl.value : '';
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
    const horizontalViewBtn = document.getElementById('horizontal-view-btn');
    const timelineViewBtn = document.getElementById('timeline-view-btn');
    const mapViewBtn = document.getElementById('map-view-btn');
    const statsViewBtn = document.getElementById('stats-view-btn');

    if (!treeViewBtn) return;

    treeViewBtn.addEventListener('click', () => switchView('tree'));
    if (horizontalViewBtn) horizontalViewBtn.addEventListener('click', () => switchView('horizontal'));
    timelineViewBtn.addEventListener('click', () => switchView('timeline'));
    if (mapViewBtn) mapViewBtn.addEventListener('click', () => switchView('map'));
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
    const mapContainer = document.getElementById('map-container');
    const statsDashboard = document.querySelector('.stats-dashboard');

    // Hide all view-specific containers
    if (treeContainer) treeContainer.style.display = 'none';
    if (treeDetails) treeDetails.style.display = 'none';
    if (timelineContainer) timelineContainer.style.display = 'none';
    if (mapContainer) mapContainer.style.display = 'none';
    if (statsDashboard) statsDashboard.style.display = 'none';

    if (view === 'tree') {
        currentTreeView = 'tree';
        if (treeContainer) treeContainer.style.display = 'block';
        if (treeDetails) treeDetails.style.display = 'block';
        if (statsDashboard) statsDashboard.style.display = 'block';
        const treeEl = document.getElementById('family-tree');
        if (treeEl) {
            treeEl.classList.remove('tree-horizontal-wrap');
            createHTMLFamilyTree(familyData, 'family-tree');
        }
    } else if (view === 'horizontal') {
        currentTreeView = 'horizontal';
        if (treeContainer) treeContainer.style.display = 'block';
        if (treeDetails) treeDetails.style.display = 'block';
        if (statsDashboard) statsDashboard.style.display = 'block';
        const treeEl = document.getElementById('family-tree');
        if (treeEl) {
            createHorizontalFamilyTree(familyData, 'family-tree');
        }
    } else if (view === 'timeline') {
        if (timelineContainer) timelineContainer.style.display = 'block';
        generateTimeline();
    } else if (view === 'map') {
        if (mapContainer) mapContainer.style.display = 'block';
        initializeMap();
    } else if (view === 'stats') {
        if (statsDashboard) statsDashboard.style.display = 'block';
        calculateStatistics();
    }
}

// ========== MAP VIEW ==========

let familyMap = null;

// Known location coordinates (no external geocoding needed)
const knownLocations = {
    'hyderabad': { lat: 17.385, lng: 78.4867, label: 'Hyderabad, India' },
    'qatar': { lat: 25.2854, lng: 51.531, label: 'Doha, Qatar' },
    'doha': { lat: 25.2854, lng: 51.531, label: 'Doha, Qatar' },
    'moulali': { lat: 17.3753, lng: 78.4977, label: 'Moulali, Hyderabad' },
    'umrabad': { lat: 16.0167, lng: 78.1333, label: 'Umrabad, India' },
    'king faisal university': { lat: 25.3748, lng: 49.5883, label: 'King Faisal University, Saudi Arabia' },
    'saudi arabia': { lat: 24.7136, lng: 46.6753, label: 'Saudi Arabia' },
    'new srinagar colony': { lat: 17.3753, lng: 78.4977, label: 'New Srinagar Colony, Hyderabad' },
};

function initializeMap() {
    const mapEl = document.getElementById('family-map');
    if (!mapEl || !window.L) return;

    if (familyMap) {
        familyMap.remove();
        familyMap = null;
    }

    familyMap = L.map('family-map').setView([17.385, 78.4867], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(familyMap);

    const locations = collectLocations(familyData);
    plotLocations(locations);

    // Ensure map renders correctly after container becomes visible
    setTimeout(() => {
        familyMap.invalidateSize();
        if (locations.length > 0) {
            const group = L.featureGroup(locations.map(loc => L.marker([loc.lat, loc.lng])));
            familyMap.fitBounds(group.getBounds().pad(0.3));
        }
    }, 200);
}

function findNodeLocation(node) {
    const desc = (node.description || '').toLowerCase();
    for (const [key, coords] of Object.entries(knownLocations)) {
        if (desc.includes(key)) {
            let type = 'Mentioned';
            if (desc.includes('residence') || desc.includes('residence:')) type = 'Residence';
            else if (desc.includes('born') || desc.includes('birth')) type = 'Birthplace';
            else if (desc.includes('homeland') || desc.includes('ancestral')) type = 'Ancestral Homeland';
            else if (desc.includes('buried') || desc.includes('burial')) type = 'Burial Place';
            return { coords, type };
        }
    }
    return null;
}

function collectLocations(node, level = 0, parentLocation = null) {
    const locations = [];

    if (node.name) {
        const name = node.name;
        const ownLocation = findNodeLocation(node);

        // Use own location, or inherit from parent, or default to Hyderabad for root
        const loc = ownLocation
            || parentLocation
            || (level === 0 ? { coords: knownLocations['hyderabad'], type: 'Ancestral Homeland' } : null);

        if (loc) {
            const offset = 0.008; // spread markers so they don't stack
            locations.push({
                lat: loc.coords.lat + (Math.random() - 0.5) * offset,
                lng: loc.coords.lng + (Math.random() - 0.5) * offset,
                name: name,
                description: node.description || '',
                type: ownLocation ? loc.type : 'Family (inherited)',
                label: loc.coords.label,
                level: level
            });
        }

        // Pass this node's location (or inherited) down to children
        const locationForChildren = ownLocation || parentLocation
            || (level === 0 ? { coords: knownLocations['hyderabad'], type: 'Ancestral Homeland' } : null);

        if (node.children) {
            node.children.forEach(child => {
                locations.push(...collectLocations(child, level + 1, locationForChildren));
            });
        }
    }

    return locations;
}

function plotLocations(locations) {
    if (!familyMap) return;

    // Group locations by place label
    const groups = {};
    locations.forEach(loc => {
        if (!groups[loc.label]) groups[loc.label] = [];
        groups[loc.label].push(loc);
    });

    for (const [label, members] of Object.entries(groups)) {
        // Use the average lat/lng for the group marker position
        const avgLat = members.reduce((s, m) => s + m.lat, 0) / members.length;
        const avgLng = members.reduce((s, m) => s + m.lng, 0) / members.length;

        const isHomeland = label === 'Hyderabad, India';
        const icon = isHomeland
            ? L.divIcon({
                className: 'map-homeland-icon',
                html: `<div style="background:#e94560;color:#fff;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:2px solid #fff;">&#9733; ${members.length}</div>`,
                iconSize: [36, 36],
                iconAnchor: [18, 18]
            })
            : L.divIcon({
                className: 'map-member-icon',
                html: `<div style="background:#0f3460;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:2px solid #fff;">${members.length}</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

        const marker = L.marker([avgLat, avgLng], { icon }).addTo(familyMap);

        // Build popup with all members at this location
        let popupHTML = `<div class="map-popup-name">${escapeHTML(label)}</div>`;
        popupHTML += `<div class="map-popup-type">${members.length} family member${members.length > 1 ? 's' : ''}</div>`;
        popupHTML += '<div style="max-height:200px;overflow-y:auto;margin-top:8px;">';
        members.forEach(m => {
            popupHTML += `<div style="padding:4px 0;border-bottom:1px solid #eee;">`;
            popupHTML += `<strong style="font-size:0.9em;">${escapeHTML(m.name)}</strong>`;
            if (m.description && m.description !== 'Family member') {
                popupHTML += `<div style="font-size:0.8em;color:#636e72;">${escapeHTML(m.description)}</div>`;
            }
            popupHTML += `<div class="map-popup-type">${escapeHTML(m.type)}</div>`;
            popupHTML += `</div>`;
        });
        popupHTML += '</div>';

        marker.bindPopup(popupHTML, { maxWidth: 300, maxHeight: 300 });
    }
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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
