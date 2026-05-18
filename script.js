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
        if (rarity === 'very_rare') baseItems = Math.max(1, baseItems - 3);
        if (rarity === 'legendary') baseItems = Math.max(1, baseItems - 4);
        
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
            case 'staff':
                item = this.generateStaff(item, rarity);
                break;
            case 'wand':
                item = this.generateWand(item, rarity);
                break;
        }
        
        return item;
    }
    
    getItemTypesForRarity(rarity) {
        const commonTypes = ['potion', 'scroll', 'weapon', 'armor'];
        const uncommonTypes = ['potion', 'scroll', 'weapon', 'armor', 'ring', 'wondrous'];
        const rareTypes = ['weapon', 'armor', 'ring', 'wondrous', 'scroll'];
        const veryRareTypes = ['weapon', 'armor', 'ring', 'wondrous', 'staff', 'wand'];
        const legendaryTypes = ['weapon', 'armor', 'ring', 'wondrous', 'staff', 'wand'];
        
        switch (rarity) {
            case 'common': return commonTypes;
            case 'uncommon': return uncommonTypes;
            case 'rare': return rareTypes;
            case 'very_rare': return veryRareTypes;
            case 'legendary': return legendaryTypes;
            default: return commonTypes;
        }
    }
    
    generateWeapon(item, cr, rarity) {
        const weapons = [
            'Longsword', 'Battleaxe', 'Warhammer', 'Greatsword', 'Rapier',
            'Shortbow', 'Longbow', 'Crossbow', 'Dagger', 'Mace',
            'Quarterstaff', 'Spear', 'Trident', 'Flail', 'Morningstar'
        ];
        const weapon = weapons[Math.floor(Math.random() * weapons.length)];
        
        const enchantments = {
            common: ['Well-crafted', 'Balanced', 'Sharp'],
            uncommon: ['+1', 'Flaming', 'Frost', 'Lightning', 'Thunder', 'Poison'],
            rare: ['+2', 'Vorpal', 'Dragon Slayer', 'Giant Slayer', 'Flame Tongue', 'Frost Brand'],
            very_rare: ['+3', 'Holy Avenger', 'Sun Blade', 'Vorpal', 'Luck Blade'],
            legendary: ['+3', 'Holy Avenger', 'Sun Blade', 'Vorpal', 'Luck Blade', 'Sphere of Annihilation']
        };
        
        const enchantment = enchantments[rarity][Math.floor(Math.random() * enchantments[rarity].length)];
        
        item.name = `${enchantment} ${weapon}`;
        item.description = `A ${weapon.toLowerCase()} that has been enhanced with ${enchantment.toLowerCase()} properties.`;
        
        return item;
    }
    
    generateArmor(item, cr, rarity) {
        const armors = [
            'Leather Armor', 'Chain Mail', 'Plate Armor', 'Shield', 'Helmet',
            'Gauntlets', 'Boots', 'Breastplate', 'Scale Mail', 'Splint Mail',
            'Studded Leather', 'Half Plate', 'Ring Mail'
        ];
        const armor = armors[Math.floor(Math.random() * armors.length)];
        
        const enchantments = {
            common: ['Reinforced', 'Comfortable', 'Well-fitted'],
            uncommon: ['+1', 'Adamantine Armor', 'Mithral Armor', 'Elven Chain', 'Glamoured Studded Leather'],
            rare: ['+2', 'Armor of Resistance', 'Elven Chain', 'Glamoured Studded Leather'],
            very_rare: ['+3', 'Armor of Invulnerability', 'Plate Armor of Etherealness'],
            legendary: ['+3', 'Armor of Invulnerability', 'Plate Armor of Etherealness', 'Shield of Missile Attraction']
        };
        
        const enchantment = enchantments[rarity][Math.floor(Math.random() * enchantments[rarity].length)];
        
        item.name = `${enchantment} ${armor}`;
        item.description = `Protective ${armor.toLowerCase()} enhanced with ${enchantment.toLowerCase()} craftsmanship.`;
        
        return item;
    }
    
    generatePotion(item, rarity) {
        const potions = {
            common: [
                { name: 'Potion of Healing', description: 'A red potion that restores 2d4+2 hit points when consumed.' },
                { name: 'Potion of Climbing', description: 'A yellow potion that grants a climbing speed for 1 hour.' }
            ],
            uncommon: [
                { name: 'Potion of Healing (Greater)', description: 'A red potion that restores 4d4+4 hit points when consumed.' },
                { name: 'Potion of Animal Friendship', description: 'A potion that charms beasts for 1 hour when ingested.' },
                { name: 'Potion of Giant Strength (Hill)', description: 'A potion that sets Strength to 21 for 1 hour.' },
                { name: 'Potion of Growth', description: 'A potion that causes the drinker to enlarge for 1 minute.' }
            ],
            rare: [
                { name: 'Potion of Healing (Superior)', description: 'A red potion that restores 8d4+8 hit points when consumed.' },
                { name: 'Potion of Clairvoyance', description: 'A potion that grants the ability to see through solid objects for 1 hour.' },
                { name: 'Potion of Diminution', description: 'A potion that reduces the drinker to 1/10th size for 1 hour.' },
                { name: 'Potion of Gaseous Form', description: 'A potion that transforms the drinker into a gaseous form for 1 hour.' },
                { name: 'Potion of Giant Strength (Fire)', description: 'A potion that sets Strength to 23 for 1 hour.' },
                { name: 'Potion of Giant Strength (Cloud)', description: 'A potion that sets Strength to 25 for 1 hour.' },
                { name: 'Potion of Giant Strength (Storm)', description: 'A potion that sets Strength to 29 for 1 hour.' }
            ],
            very_rare: [
                { name: 'Potion of Healing (Supreme)', description: 'A red potion that restores 4d4+20 hit points when consumed.' },
                { name: 'Potion of Flying', description: 'A potion that grants a flying speed for 1 hour.' },
                { name: 'Potion of Invisibility', description: 'A potion that grants invisibility for 1 hour.' },
                { name: 'Potion of Mind Reading', description: 'A potion that grants the ability to read thoughts for 1 hour.' },
                { name: 'Potion of Giant Strength (Stone)', description: 'A potion that sets Strength to 23 for 1 hour.' },
                { name: 'Potion of Giant Strength (Frost)', description: 'A potion that sets Strength to 25 for 1 hour.' },
                { name: 'Potion of Giant Strength (Fire)', description: 'A potion that sets Strength to 27 for 1 hour.' },
                { name: 'Potion of Giant Strength (Cloud)', description: 'A potion that sets Strength to 29 for 1 hour.' }
            ],
            legendary: [
                { name: 'Potion of Speed', description: 'A potion that grants the Haste spell effect for 1 minute.' },
                { name: 'Potion of Giant Strength (Storm)', description: 'A potion that sets Strength to 29 for 1 hour.' }
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
                { name: 'Ring of Protection', description: 'Grants +1 to AC and saving throws while worn.' },
                { name: 'Ring of Swimming', description: 'Grants a swimming speed and the ability to breathe underwater.' },
                { name: 'Ring of Jumping', description: 'Grants advantage on Strength (Athletics) checks to jump.' }
            ],
            rare: [
                { name: 'Ring of Invisibility', description: 'Grants invisibility while worn, activated by a bonus action.' },
                { name: 'Ring of Fire Resistance', description: 'Grants resistance to fire damage while worn.' },
                { name: 'Ring of Spell Storing', description: 'Can store up to 5 levels of spells and cast them.' },
                { name: 'Ring of Warmth', description: 'Grants resistance to cold damage and comfort in cold environments.' },
                { name: 'Ring of Water Walking', description: 'Allows walking on water as if it were solid ground.' }
            ],
            very_rare: [
                { name: 'Ring of Protection +2', description: 'Grants +2 to AC and saving throws while worn.' },
                { name: 'Ring of Resistance', description: 'Grants resistance to one type of damage while worn.' },
                { name: 'Ring of the Ram', description: 'A ring that can launch a force ram as a weapon.' },
                { name: 'Ring of Telekinesis', description: 'Grants the ability to cast telekinesis at will.' },
                { name: 'Ring of X-Ray Vision', description: 'Grants the ability to see through objects.' }
            ],
            legendary: [
                { name: 'Ring of Three Wishes', description: 'A ring that can grant three wishes.' },
                { name: 'Ring of Invisibility', description: 'Grants invisibility at will while worn.' },
                { name: 'Ring of Protection +3', description: 'Grants +3 to AC and saving throws while worn.' },
                { name: 'Ring of Spell Turning', description: 'Reflects spells back at the caster.' },
                { name: 'Ring of Regeneration', description: 'Regenerates 1d6 hit points at the start of each turn.' }
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
                { name: 'Bag of Holding', description: 'A bag that can hold up to 500 pounds, but only weighs 15 pounds.' },
                { name: 'Bag of Tricks', description: 'A velvet bag that produces 3d8 small fuzzy animals to fight for you.' },
                { name: 'Boots of Elvenkind', description: 'Grants advantage on Stealth checks and silent movement.' },
                { name: 'Boots of Striding and Springing', description: 'Doubles walking speed and grants advantage on jumps.' },
                { name: 'Boots of the Winterlands', description: 'Grants resistance to cold damage and comfort in freezing temperatures.' },
                { name: 'Bracers of Archery', description: 'Grants +2 to damage rolls with ranged weapons.' },
                { name: 'Brooch of Shielding', description: 'Grants immunity to force damage from magic missile.' },
                { name: 'Broom of Flying', description: 'A broom that can fly at 50 feet per minute.' },
                { name: 'Cloak of Elvenkind', description: 'Grants advantage on Stealth checks in dim light or darkness.' },
                { name: 'Cloak of Protection', description: 'Grants +1 to AC and saving throws while worn.' },
                { name: 'Cloak of the Manta Ray', description: 'Grants underwater breathing and swimming speed while worn.' },
                { name: 'Decanter of Endless Water', description: 'Produces unlimited water when uncorked.' },
                { name: 'Deck of Illusions', description: 'A deck of cards that creates illusionary creatures.' },
                { name: 'Dust of Disappearance', description: 'When thrown, creates a cloud that grants invisibility.' },
                { name: 'Dust of Dryness', description: 'Can absorb or create water when used.' },
                { name: 'Dust of Sneezing and Choking', description: 'Dangerous dust that causes choking when inhaled.' },
                { name: 'Efficient Quiver', description: 'A quiver that can hold many weapons and ammunition.' },
                { name: 'Elemental Gem', description: 'A gem that can summon an elemental for 1 minute.' },
                { name: 'Eversmoking Bottle', description: 'When opened, produces thick smoke.' },
                { name: 'Eyes of Charming', description: 'Grants advantage on Charisma (Persuasion) checks.' },
                { name: 'Eyes of Minute Seeing', description: 'Grants advantage on Investigation checks to find small details.' },
                { name: 'Eyes of the Eagle', description: 'Grants advantage on Perception checks involving sight.' },
                { name: 'Figurine of Wondrous Power', description: 'A small figurine that can become a creature for a time.' },
                { name: 'Gauntlets of Ogre Power', description: 'Sets Strength score to 19 while worn.' },
                { name: 'Gem of Brightness', description: 'A gem that can produce light and blinding flashes.' },
                { name: 'Gloves of Missile Snaring', description: 'Grants +5 to AC against ranged weapon attacks.' },
                { name: 'Gloves of Swimming and Climbing', description: 'Grants a swimming speed and climbing speed.' },
                { name: 'Goggles of Night', description: 'Grants darkvision out to 60 feet.' },
                { name: 'Hat of Disguise', description: 'Grants the ability to cast disguise self at will.' },
                { name: 'Headband of Intellect', description: 'Sets Intelligence score to 19 while worn.' },
                { name: 'Helm of Comprehending Languages', description: 'Grants the ability to understand all spoken languages.' },
                { name: 'Helm of Telepathy', description: 'Grants telepathic communication and detect thoughts.' },
                { name: 'Immovable Rod', description: 'A rod that can anchor itself in place when activated.' },
                { name: 'Javelin of Lightning', description: 'A javelin that deals 4d6 lightning damage when thrown.' },
                { name: 'Lantern of Revealing', description: 'A lantern that reveals invisible creatures within 30 feet.' },
                { name: 'Medallion of Thoughts', description: 'Grants the ability to read surface thoughts of nearby creatures.' },
                { name: 'Mithral Armor', description: 'Light armor that can be worn under normal clothes.' },
                { name: 'Necklace of Adaptation', description: 'Grants the ability to breathe in any environment.' },
                { name: 'Oil of Slipperiness', description: 'Makes surfaces extremely slippery when applied.' },
                { name: 'Pearl of Power', description: 'Regains one spell slot of 3rd level or lower once per day.' },
                { name: 'Periapt of Health', description: 'Grants immunity to disease while worn.' },
                { name: 'Periapt of Wound Closure', description: 'Grants advantage on death saving throws.' },
                { name: 'Philter of Love', description: 'Causes the drinker to become charmed by the first creature they see.' },
                { name: 'Pipes of Haunting', description: 'Creates haunting sounds that frighten nearby creatures.' },
                { name: 'Pipes of the Sewers', description: 'Can summon rats to attack or perform tasks.' }
            ],
            rare: [
                { name: 'Amulet of Health', description: 'Sets Constitution score to 19 while worn.' },
                { name: 'Bag of Beans', description: 'A bag containing magical beans that can create various effects.' },
                { name: 'Bead of Force', description: 'A bead that explodes into a force sphere when thrown.' },
                { name: 'Belt of Dwarvenkind', description: 'Grants advantage on saving throws against poison and resistance to poison damage.' },
                { name: 'Belt of Giant Strength (Hill)', description: 'Sets Strength to 21 while worn.' },
                { name: 'Belt of Giant Strength (Stone)', description: 'Sets Strength to 23 while worn.' },
                { name: 'Belt of Giant Strength (Frost)', description: 'Sets Strength to 25 while worn.' },
                { name: 'Belt of Giant Strength (Fire)', description: 'Sets Strength to 27 while worn.' },
                { name: 'Belt of Giant Strength (Cloud)', description: 'Sets Strength to 29 while worn.' },
                { name: 'Berserker Axe', description: 'A greataxe that grants +1 to damage but causes rage attacks.' },
                { name: 'Boots of Levitation', description: 'Grants the ability to levitate at will.' },
                { name: 'Bowl of Commanding Water Elementals', description: 'Can summon water elementals when filled with water.' },
                { name: 'Bracers of Defense', description: 'Grants +2 to AC while worn.' },
                { name: 'Brazier of Commanding Fire Elementals', description: 'Can summon fire elementals when lit.' },
                { name: 'Cape of the Mountebank', description: 'Grants the ability to cast dimension door once per day.' },
                { name: 'Censer of Controlling Air Elementals', description: 'Can summon air elementals when burning incense.' },
                { name: 'Chime of Opening', description: 'A chime that can magically open locked doors and containers.' },
                { name: 'Cloak of Displacement', description: 'Grants advantage on Dexterity saving throws and causes attacks to miss.' },
                { name: 'Cloak of the Bat', description: 'Grants the ability to fly and echolocation while worn.' },
                { name: 'Cube of Force', description: 'A cube that can create force walls for protection.' },
                { name: 'Dagger of Venom', description: 'A dagger that deals poison damage on a hit.' },
                { name: 'Dimensional Shackles', description: 'Shackles that prevent teleportation and planar travel.' },
                { name: 'Dragon Slayer', description: 'A +1 longsword that deals extra damage to dragons.' },
                { name: 'Elven Chain', description: 'Light armor that can be worn by anyone and counts as light armor.' },
                { name: 'Feather Token', description: 'Various tokens that create magical effects when used.' },
                { name: 'Figurine of Wondrous Power', description: 'A small figurine that can become a creature for a time.' },
                { name: 'Flame Tongue', description: 'A +1 weapon that deals extra fire damage and sheds light.' },
                { name: 'Folding Boat', description: 'A small box that unfolds into a boat.' },
                { name: 'Gem of Seeing', description: 'A gem that grants truesight when looked through.' },
                { name: 'Giant Slayer', description: 'A +1 weapon that deals extra damage to Large or larger creatures.' },
                { name: 'Glamoured Studded Leather', description: 'Armor that can appear as normal clothes.' },
                { name: 'Handy Haversack', description: 'A backpack that can hold many items and retrieve them instantly.' },
                { name: 'Helm of Teleportation', description: 'Grants the ability to cast teleport once per day.' },
                { name: 'Horn of Blasting', description: 'A horn that deals thunder damage when blown.' },
                { name: 'Horn of Valhalla', description: 'Summons berserker warriors when blown.' },
                { name: 'Horseshoes of Speed', description: 'Doubles the speed of a horse or similar creature.' },
                { name: 'Instant Fortress', description: 'A small cube that expands into a fortress.' },
                { name: 'Ioun Stone', description: 'A magical stone that orbits the head and grants various bonuses.' },
                { name: 'Iron Bands of Binding', description: 'Bands that can restrain a creature when thrown.' },
                { name: 'Mace of Disruption', description: 'A mace that deals extra damage to undead.' },
                { name: 'Mace of Smiting', description: 'A mace that deals extra damage to constructs.' },
                { name: 'Mace of Terror', description: 'A mace that can frighten creatures on a hit.' },
                { name: 'Mantle of Spell Resistance', description: 'Grants advantage on saving throws against spells.' },
                { name: 'Necklace of Fireballs', description: 'A necklace containing beads that explode as fireballs.' },
                { name: 'Necklace of Prayer Beads', description: 'Beads that can cast cleric spells once per day.' },
                { name: 'Oil of Etherealness', description: 'When applied, allows the user to enter the Ethereal Plane.' },
                { name: 'Periapt of Proof against Poison', description: 'Grants immunity to poison while worn.' },
                { name: 'Portable Hole', description: 'A cloth that can be placed to create a 6-foot diameter extradimensional hole.' },
                { name: 'Potion of Clairvoyance', description: 'A potion that grants the ability to see through solid objects.' },
                { name: 'Potion of Diminution', description: 'A potion that reduces the drinker to 1/10th size.' },
                { name: 'Potion of Gaseous Form', description: 'A potion that transforms the drinker into a gaseous form.' },
                { name: 'Potion of Giant Strength', description: 'A potion that sets Strength to a giant score.' },
                { name: 'Potion of Healing (Superior)', description: 'A red potion that restores 8d4+8 hit points.' },
                { name: 'Potion of Speed', description: 'A potion that grants the Haste spell effect.' }
            ],
            very_rare: [
                { name: 'Amulet of Proof against Detection', description: 'Grants immunity to divination spells while worn.' },
                { name: 'Carpet of Flying', description: 'A carpet that can fly at a speed of 80 feet.' },
                { name: 'Crystal Ball', description: 'A crystal ball that can be used for scrying.' },
                { name: 'Efreeti Bottle', description: 'A bottle that can summon an efreeti.' },
                { name: 'Figurine of Wondrous Power', description: 'A small figurine that can become a creature for a time.' },
                { name: 'Helm of Brilliance', description: 'A helm that can cast various fire spells and grants fire resistance.' },
                { name: 'Horn of Valhalla (Bronze)', description: 'Summons berserker warriors when blown.' },
                { name: 'Horn of Valhalla (Iron)', description: 'Summons berserker warriors when blown.' },
                { name: 'Instrument of the Bards', description: 'A magical instrument that grants various abilities.' },
                { name: 'Iron Flask', description: 'A flask that can trap a creature inside.' },
                { name: 'Mirror of Life Trapping', description: 'A mirror that can trap creatures inside.' },
                { name: 'Nine Lives Stealer', description: 'A weapon that can kill on a critical hit.' },
                { name: 'Otiluke Resilient Sphere', description: 'A sphere that can trap a creature in force.' },
                { name: 'Robe of Eyes', description: 'A robe that grants magical sight abilities.' },
                { name: 'Robe of Scintillating Colors', description: 'A robe that can create dazzling light effects.' },
                { name: 'Robe of Stars', description: 'A robe that can be used to travel to the Astral Plane.' },
                { name: 'Rod of Absorption', description: 'A rod that can absorb spell energy.' },
                { name: 'Rod of Security', description: 'A rod that can create an extradimensional sanctuary.' },
                { name: 'Rod of the Pact Keeper', description: 'A rod that enhances warlock spellcasting.' },
                { name: 'Scarab of Protection', description: 'A scarab that grants protection against spells and death.' },
                { name: 'Sphere of Annihilation', description: 'A sphere that destroys everything it touches.' },
                { name: 'Talisman of the Sphere', description: 'A talisman that can control a sphere of annihilation.' },
                { name: 'Tome of Stilled Tongue', description: 'A tome that can be used to cast silence.' },
                { name: 'Well of Many Worlds', description: 'A well that can be used to travel to other planes.' }
            ],
            legendary: [
                { name: 'Armor of Invulnerability', description: 'Grants resistance to nonmagical damage and advantage on saving throws.' },
                { name: 'Belt of Giant Strength (Storm)', description: 'Sets Strength to 29 while worn.' },
                { name: 'Boots of Speed', description: 'Grants the Haste spell effect as a bonus action.' },
                { name: 'Carpet of Flying', description: 'A carpet that can fly at a speed of 80 feet.' },
                { name: 'Crystal Ball', description: 'A crystal ball that can be used for scrying with special powers.' },
                { name: 'Cubic Gate', description: 'A cube that can be used to travel to other planes.' },
                { name: 'Deck of Many Things', description: 'A deck of cards with powerful and dangerous effects.' },
                { name: 'Efreeti Chain', description: 'A chain that can summon an efreeti.' },
                { name: 'Figurine of Wondrous Power', description: 'A small figurine that can become a powerful creature.' },
                { name: 'Flame Tongue', description: 'A +1 weapon that deals extra fire damage and sheds bright light.' },
                { name: 'Frost Brand', description: 'A +1 weapon that deals extra cold damage and protects from fire.' },
                { name: 'Helm of Brilliance', description: 'A helm that can cast various fire spells and grants fire resistance.' },
                { name: 'Horn of Valhalla (Silver)', description: 'Summons powerful berserker warriors when blown.' },
                { name: 'Horn of Valhalla (Gold)', description: 'Summons the most powerful berserker warriors when blown.' },
                { name: 'Instrument of the Bards', description: 'A legendary magical instrument with great power.' },
                { name: 'Iron Flask', description: 'A flask that can trap powerful creatures inside.' },
                { name: 'Ioun Stone', description: 'A legendary magical stone that orbits the head.' },
                { name: 'Luck Blade', description: 'A sword that grants luck and can cast wish.' },
                { name: 'Mirror of Life Trapping', description: 'A mirror that can trap many creatures inside.' },
                { name: 'Nine Lives Stealer', description: 'A weapon that can kill on a critical hit.' },
                { name: 'Plate Armor of Etherealness', description: 'Armor that allows the wearer to enter the Ethereal Plane.' },
                { name: 'Robe of the Archmagi', description: 'A robe that grants powerful magical abilities to wizards.' },
                { name: 'Rod of Lordly Might', description: 'A rod with multiple powerful functions.' },
                { name: 'Rod of Security', description: 'A rod that can create an extradimensional sanctuary.' },
                { name: 'Scarab of Protection', description: 'A scarab that grants protection against spells and death.' },
                { name: 'Staff of the Magi', description: 'A powerful staff that can absorb and cast spells.' },
                { name: 'Staff of the Python', description: 'A staff that can transform into a giant python.' },
                { name: 'Sword of Answering', description: 'A sword that can counter attacks and cast spells.' },
                { name: 'Vorpal Sword', description: 'A sword that can decapitate on a critical hit.' },
                { name: 'Well of Many Worlds', description: 'A well that can be used to travel to other planes.' }
            ]
        };
        
        const itemList = items[rarity] || items.uncommon;
        const wondrous = itemList[Math.floor(Math.random() * itemList.length)];
        
        item.name = wondrous.name;
        item.description = wondrous.description;
        
        return item;
    }
    
    generateStaff(item, rarity) {
        const staffs = {
            very_rare: [
                { name: 'Staff of Charming', description: 'A staff that can cast charm spells.' },
                { name: 'Staff of Healing', description: 'A staff that can cast healing spells.' },
                { name: 'Staff of Swarming Insects', description: 'A staff that can summon swarms of insects.' },
                { name: 'Staff of the Woodlands', description: 'A staff that can cast nature spells.' },
                { name: 'Staff of Withering', description: 'A staff that can wither plants and creatures.' }
            ],
            legendary: [
                { name: 'Staff of the Magi', description: 'A powerful staff that can absorb and cast spells.' },
                { name: 'Staff of the Python', description: 'A staff that can transform into a giant constrictor snake.' },
                { name: 'Staff of Power', description: 'A staff that grants various magical abilities and protection.' }
            ]
        };
        
        const staffList = staffs[rarity] || staffs.very_rare;
        const staff = staffList[Math.floor(Math.random() * staffList.length)];
        
        item.name = staff.name;
        item.description = staff.description;
        
        return item;
    }
    
    generateWand(item, rarity) {
        const wands = {
            very_rare: [
                { name: 'Wand of Binding', description: 'A wand that can restrain creatures.' },
                { name: 'Wand of Fear', description: 'A wand that can frighten creatures.' },
                { name: 'Wand of Fireballs', description: 'A wand that can cast fireball.' },
                { name: 'Wand of Lightning Bolts', description: 'A wand that can cast lightning bolt.' },
                { name: 'Wand of Paralyzation', description: 'A wand that can paralyze creatures.' },
                { name: 'Wand of the War Mage', description: 'A wand that grants bonuses to spell attacks and defense.' },
                { name: 'Wand of Winter', description: 'A wand that can cast cold spells.' }
            ],
            legendary: [
                { name: 'Wand of Orcus', description: 'A powerful evil wand that can slay living creatures.' }
            ]
        };
        
        const wandList = wands[rarity] || wands.very_rare;
        const wand = wandList[Math.floor(Math.random() * wandList.length)];
        
        item.name = wand.name;
        item.description = wand.description;
        
        return item;
    }
    
    calculateItemValue(cr, rarity) {
        const baseValues = {
            common: { min: 50, max: 100 },
            uncommon: { min: 101, max: 500 },
            rare: { min: 501, max: 5000 },
            very_rare: { min: 5001, max: 50000 },
            legendary: { min: 50001, max: 250000 }
        };
        
        const range = baseValues[rarity];
        const base = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        return base;
    }
    
    generateGold(cr) {
        // Based on DMG Treasure Hoard tables
        const hoardTables = {
            '0-4': { cp: [360, 2100], sp: [0, 1000], gp: [20, 600], pp: [0, 50] },
            '5-10': { cp: [1700, 7000], sp: [0, 3500], gp: [100, 4000], pp: [0, 140] },
            '11-16': { cp: [4000, 15000], sp: [0, 8000], gp: [400, 12000], pp: [0, 700] },
            '17+': { cp: [10000, 40000], sp: [0, 20000], gp: [2000, 35000], pp: [0, 8000] }
        };
        
        let tableKey;
        if (cr <= 4) tableKey = '0-4';
        else if (cr <= 10) tableKey = '5-10';
        else if (cr <= 16) tableKey = '11-16';
        else tableKey = '17+';
        
        const table = hoardTables[tableKey];
        
        const cp = Math.floor(Math.random() * (table.cp[1] - table.cp[0] + 1)) + table.cp[0];
        const sp = Math.floor(Math.random() * (table.sp[1] - table.sp[0] + 1)) + table.sp[0];
        const gp = Math.floor(Math.random() * (table.gp[1] - table.gp[0] + 1)) + table.gp[0];
        const pp = Math.floor(Math.random() * (table.pp[1] - table.pp[0] + 1)) + table.pp[0];
        
        // Convert all to gold pieces (cp = 1/100 gp, sp = 1/10 gp, pp = 10 gp)
        const totalGP = Math.floor(cp / 100) + Math.floor(sp / 10) + gp + (pp * 10);
        
        return totalGP;
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
            const displayRarity = item.rarity.replace('_', ' ').toUpperCase();
            html += `
                <div class="loot-item" style="animation-delay: ${index * 0.1}s">
                    <h3>${item.name}</h3>
                    <p><strong>Type:</strong> ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    <p><strong>Description:</strong> ${item.description}</p>
                    <span class="loot-rarity rarity-${item.rarity}">${displayRarity}</span>
                    <div class="loot-value">Estimated Value: ${item.value.toLocaleString()} gp</div>
                </div>
            `;
        });
        
        const totalValue = loot.gold + loot.items.reduce((sum, item) => sum + item.value, 0);
        const displayRarity = loot.rarity.replace('_', ' ').toUpperCase();
        html += `
            <div class="loot-item" style="background: linear-gradient(135deg, #FFD700, #FFA500); border-left-color: #FFD700;">
                <h3>📊 Summary</h3>
                <p><strong>Total Items:</strong> ${loot.items.length}</p>
                <p><strong>Total Gold:</strong> ${loot.gold.toLocaleString()} gp</p>
                <p><strong>Total Value:</strong> ${totalValue.toLocaleString()} gp</p>
                <p><strong>Source:</strong> CR ${loot.cr} creature, ${displayRarity} loot</p>
            </div>
        `;
        
        this.lootDisplay.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DDLootGenerator();
});
