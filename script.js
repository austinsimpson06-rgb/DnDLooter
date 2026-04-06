class DDLootGenerator {
    constructor() {
        this.crSelect = document.getElementById('cr-select');
        this.generateBtn = document.getElementById('generate-btn');
        this.lootDisplay = document.getElementById('loot-display');
        this.rarityButtons = document.querySelectorAll('.rarity-btn');
        
        this.selectedCR = '';
        this.selectedRarity = '';
        
        this.initializeCRDropdown();
        this.attachEventListeners();
    }
    
    initializeCRDropdown() {
        for (let i = 1; i <= 30; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `CR ${i}`;
            this.crSelect.appendChild(option);
        }
    }
    
    attachEventListeners() {
        this.crSelect.addEventListener('change', (e) => {
            this.selectedCR = e.target.value;
            this.updateGenerateButton();
        });
        
        this.rarityButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.rarityButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedRarity = e.target.dataset.rarity;
                this.updateGenerateButton();
            });
        });
        
        this.generateBtn.addEventListener('click', () => {
            this.generateLoot();
        });
    }
    
    updateGenerateButton() {
        this.generateBtn.disabled = !this.selectedCR || !this.selectedRarity;
    }
    
    generateLoot() {
        const cr = parseInt(this.selectedCR);
        const rarity = this.selectedRarity;
        
        const loot = this.createLoot(cr, rarity);
        this.displayLoot(loot);
    }
    
    createLoot(cr, rarity) {
        const lootItems = [];
        const numItems = this.calculateNumberOfItems(cr, rarity);
        
        for (let i = 0; i < numItems; i++) {
            const item = this.generateItem(cr, rarity);
            lootItems.push(item);
        }
        
        const gold = this.generateGold(cr);
        
        return {
            items: lootItems,
            gold: gold,
            cr: cr,
            rarity: rarity
        };
    }
    
    calculateNumberOfItems(cr, rarity) {
        let baseItems = 1;
        
        if (cr >= 5) baseItems = Math.floor(Math.random() * 2) + 1;
        if (cr >= 10) baseItems = Math.floor(Math.random() * 3) + 1;
        if (cr >= 15) baseItems = Math.floor(Math.random() * 4) + 2;
        if (cr >= 20) baseItems = Math.floor(Math.random() * 5) + 3;
        
        if (rarity === 'uncommon') baseItems = Math.max(1, baseItems - 1);
        if (rarity === 'rare') baseItems = Math.max(1, baseItems - 2);
        
        return baseItems;
    }
    
    generateItem(cr, rarity) {
        const itemTypes = this.getItemTypesForRarity(rarity);
        const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        
        let item = {
            name: '',
            type: itemType,
            rarity: rarity,
            description: '',
            value: this.calculateItemValue(cr, rarity)
        };
        
        switch (itemType) {
            case 'weapon':
                item = this.generateWeapon(item, cr, rarity);
                break;
            case 'armor':
                item = this.generateArmor(item, cr, rarity);
                break;
            case 'potion':
                item = this.generatePotion(item, rarity);
                break;
            case 'scroll':
                item = this.generateScroll(item, cr, rarity);
                break;
            case 'ring':
                item = this.generateRing(item, rarity);
                break;
            case 'wondrous':
                item = this.generateWondrous(item, rarity);
                break;
        }
        
        return item;
    }
    
    getItemTypesForRarity(rarity) {
        const commonTypes = ['potion', 'scroll', 'weapon', 'armor'];
        const uncommonTypes = ['potion', 'scroll', 'weapon', 'armor', 'ring', 'wondrous'];
        const rareTypes = ['weapon', 'armor', 'ring', 'wondrous', 'scroll'];
        
        switch (rarity) {
            case 'common': return commonTypes;
            case 'uncommon': return uncommonTypes;
            case 'rare': return rareTypes;
            default: return commonTypes;
        }
    }
    
    generateWeapon(item, cr, rarity) {
        const weapons = [
            'Longsword', 'Battleaxe', 'Warhammer', 'Greatsword', 'Rapier',
            'Shortbow', 'Longbow', 'Crossbow', 'Dagger', 'Mace'
        ];
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        
        const enchantments = {
            common: ['Well-crafted', 'Balanced', 'Sharp'],
            uncommon: ['+1', 'Flaming', 'Frost', 'Lightning', 'Holy'],
            rare: ['+2', 'Vorpal', 'Dragon-slaying', 'Demon-slaying', 'Ghost touch']
        };
        
        const enchantment = enchantments[rarity][Math.floor(Math.random() * enchantments[rarity].length)];
        
        item.name = `${enchantment} ${weapon}`;
        item.description = `A ${weapon.toLowerCase()} that has been enhanced with ${enchantment.toLowerCase()} properties.`;
        
        return item;
    }
    
    generateArmor(item, cr, rarity) {
        const armors = [
            'Leather Armor', 'Chain Mail', 'Plate Armor', 'Shield', 'Helmet',
            'Gauntlets', 'Boots', 'Breastplate', 'Scale Mail', 'Splint Mail'
        ];
        const armor = armors[Math.floor(Math.random() * armors.length)];
        
        const enchantments = {
            common: ['Reinforced', 'Comfortable', 'Well-fitted'],
            uncommon: ['+1', 'Elven', 'Dwarven', 'Camouflage', 'Silent'],
            rare: ['+2', 'Adamantine', 'Mithral', 'Dragon hide', 'Invisible']
        };
        
        const enchantment = enchantments[rarity][Math.floor(Math.random() * enchantments[rarity].length)];
        
        item.name = `${enchantment} ${armor}`;
        item.description = `Protective ${armor.toLowerCase()} enhanced with ${enchantment.toLowerCase()} craftsmanship.`;
        
        return item;
    }
    
    generatePotion(item, rarity) {
        const potions = {
            common: [
                { name: 'Potion of Healing', description: 'Restores 2d4+2 hit points when consumed.' },
                { name: 'Potion of Minor Strength', description: 'Grants +1 to Strength checks for 1 hour.' },
                { name: 'Potion of Clear Mind', description: 'Removes confusion and grants mental clarity.' }
            ],
            uncommon: [
                { name: 'Potion of Greater Healing', description: 'Restores 4d4+4 hit points when consumed.' },
                { name: 'Potion of Invisibility', description: 'Grants invisibility for 1 hour.' },
                { name: 'Potion of Speed', description: 'Grants extra action for 1 minute.' }
            ],
            rare: [
                { name: 'Potion of Superior Healing', description: 'Restores 8d4+8 hit points when consumed.' },
                { name: 'Potion of Heroism', description: 'Grants temporary hit points and advantage on saving throws.' },
                { name: 'Potion of Dragon Strength', description: 'Grants +2 to Strength and damage resistance.' }
            ]
        };
        
        const potionList = potions[rarity];
        const potion = potionList[Math.floor(Math.random() * potionList.length)];
        
        item.name = potion.name;
        item.description = potion.description;
        
        return item;
    }
    
    generateScroll(item, cr, rarity) {
        const spells = {
            common: ['Magic Missile', 'Fire Bolt', 'Shield', 'Detect Magic', 'Light'],
            uncommon: ['Fireball', 'Lightning Bolt', 'Invisibility', 'Fly', 'Haste'],
            rare: ['Chain Lightning', 'Disintegrate', 'Power Word Stun', 'True Seeing', 'Teleport']
        };
        
        const spellList = spells[rarity];
        const spell = spellList[Math.floor(Math.random() * spellList.length)];
        const level = Math.min(Math.floor(cr / 3) + 1, 9);
        
        item.name = `Scroll of ${spell}`;
        item.description = `A magical scroll containing the ${spell.toLowerCase()} spell (${level}th level).`;
        
        return item;
    }
    
    generateRing(item, rarity) {
        const rings = {
            uncommon: [
                { name: 'Ring of Protection', description: 'Grants +1 to AC and saving throws.' },
                { name: 'Ring of Swimming', description: 'Allows underwater breathing and swimming speed.' },
                { name: 'Ring of Jumping', description: 'Grants enhanced jumping ability.' }
            ],
            rare: [
                { name: 'Ring of Invisibility', description: 'Grants invisibility at will.' },
                { name: 'Ring of Fire Resistance', description: 'Grants resistance to fire damage.' },
                { name: 'Ring of Spell Storing', description: 'Can store and cast spells.' }
            ]
        };
        
        const ringList = rings[rarity] || rings.uncommon;
        const ring = ringList[Math.floor(Math.random() * ringList.length)];
        
        item.name = ring.name;
        item.description = ring.description;
        
        return item;
    }
    
    generateWondrous(item, rarity) {
        const items = {
            uncommon: [
                { name: 'Bag of Holding', description: 'A small bag that can hold up to 500 pounds.' },
                { name: 'Boots of Elvenkind', description: 'Grants silent movement and advantage on stealth.' },
                { name: 'Cloak of Protection', description: 'Grants +1 to AC and saving throws.' }
            ],
            rare: [
                { name: 'Amulet of Health', description: 'Sets Constitution score to 19.' },
                { name: 'Boots of Speed', description: 'Grants enhanced movement speed and actions.' },
                { name: 'Cloak of Invisibility', description: 'Grants invisibility while worn.' }
            ]
        };
        
        const itemList = items[rarity] || items.uncommon;
        const wondrous = itemList[Math.floor(Math.random() * itemList.length)];
        
        item.name = wondrous.name;
        item.description = wondrous.description;
        
        return item;
    }
    
    calculateItemValue(cr, rarity) {
        const baseValues = {
            common: { min: 50, max: 200 },
            uncommon: { min: 100, max: 500 },
            rare: { min: 500, max: 2000 }
        };
        
        const range = baseValues[rarity];
        const crMultiplier = 1 + (cr * 0.1);
        
        const base = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        return Math.floor(base * crMultiplier);
    }
    
    generateGold(cr) {
        const baseGold = {
            1: { min: 10, max: 50 },
            2: { min: 25, max: 100 },
            3: { min: 50, max: 200 },
            4: { min: 100, max: 400 },
            5: { min: 200, max: 800 },
            6: { min: 300, max: 1200 },
            7: { min: 400, max: 1600 },
            8: { min: 500, max: 2000 },
            9: { min: 600, max: 2400 },
            10: { min: 800, max: 3200 }
        };
        
        const getGoldRange = (cr) => {
            if (cr <= 10) return baseGold[cr];
            if (cr <= 15) return { min: 1000, max: 4000 };
            if (cr <= 20) return { min: 2000, max: 8000 };
            return { min: 4000, max: 16000 };
        };
        
        const range = getGoldRange(cr);
        return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    }
    
    displayLoot(loot) {
        let html = '';
        
        if (loot.gold > 0) {
            html += `
                <div class="loot-item">
                    <h3>💰 Gold Coins</h3>
                    <p><strong>Amount:</strong> ${loot.gold.toLocaleString()} gp</p>
                    <div class="loot-value">Value: ${loot.gold.toLocaleString()} gold pieces</div>
                </div>
            `;
        }
        
        loot.items.forEach((item, index) => {
            html += `
                <div class="loot-item" style="animation-delay: ${index * 0.1}s">
                    <h3>${item.name}</h3>
                    <p><strong>Type:</strong> ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    <p><strong>Description:</strong> ${item.description}</p>
                    <span class="loot-rarity rarity-${item.rarity}">${item.rarity.toUpperCase()}</span>
                    <div class="loot-value">Estimated Value: ${item.value.toLocaleString()} gp</div>
                </div>
            `;
        });
        
        const totalValue = loot.gold + loot.items.reduce((sum, item) => sum + item.value, 0);
        html += `
            <div class="loot-item" style="background: linear-gradient(135deg, #FFD700, #FFA500); border-left-color: #FFD700;">
                <h3>📊 Summary</h3>
                <p><strong>Total Items:</strong> ${loot.items.length}</p>
                <p><strong>Total Gold:</strong> ${loot.gold.toLocaleString()} gp</p>
                <p><strong>Total Value:</strong> ${totalValue.toLocaleString()} gp</p>
                <p><strong>Source:</strong> CR ${loot.cr} creature, ${loot.rarity} loot</p>
            </div>
        `;
        
        this.lootDisplay.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DDLootGenerator();
});
