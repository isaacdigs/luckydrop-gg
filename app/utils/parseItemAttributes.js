// app/utils/parseItemAttributes.js
import { itemTypes } from './itemTypes';

export function parseItemAttributes(ocrText) {
    const lines = ocrText.split('\n').map(line => line.trim());
    let world = '';
    let rarity = '';
    let type = '';
    let itemPower = 0;
    let stat = 0;
    let inherentAffix = '';
    const affixes = [];
    let ability = '';

    lines.forEach(line => {
        if (line.includes('Ancestral')) {
            world = 'Ancestral';
        } else if (line.includes('Sacred')) {
            world = 'Sacred';
        }

        if (line.includes('Legendary')) {
            rarity = 'Legendary';
        } else if (line.includes('Unique')) {
            rarity = 'Unique';
        }

        Object.keys(itemTypes).forEach(itemType => {
            if (line.includes(itemType)) {
                type = itemType;
            }
        });

        if (line.includes('Item Power')) {
            const powerMatch = line.match(/(\d{1,3}(,\d{3})*|\d+)/g);
            if (powerMatch) {
                itemPower = parseInt(powerMatch[0].replace(/,/g, ''), 10);
            }
        }

        if (line.match(/Damage Per Second|Armor/)) {
            const statMatch = line.match(/(\d{1,3}(,\d{3})*|\d+)/g);
            if (statMatch) {
                stat = parseInt(statMatch[0].replace(/,/g, ''), 10);
            }
        }

        if (type && itemTypes[type]?.inherentAffix?.some(affix => line.includes(affix))) {
            inherentAffix = line;
        } else if (type && !inherentAffix && itemTypes[type]?.affixOptions.some(affix => line.includes(affix))) {
            affixes.push(line);
        }

        if (rarity === 'Unique' && !ability && line.startsWith('+')) {
            ability = line.substring(1).trim();
        }
    });

    return {
        world,
        rarity,
        type,
        itemPower,
        stat,
        inherentAffix,
        affixes: affixes.map(affix => ({ checked: false, value: parseInt(affix.replace(/[^0-9]/g, ''), 10), type: affix.replace(/[^A-Za-z ]/g, '').trim() })),
        ability,
    };
}
