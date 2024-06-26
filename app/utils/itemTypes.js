// app/utils/itemTypes.js
export const itemTypes = {
    Helm: {
        affixOptions: ['+X All Stats', '+X% Critical Strike Chance', '+X Maximum Life'],
        inherentAffix: [],
    },
    Chest: {
        affixOptions: ['+X Armor', '+X% Cooldown Reduction', '+X Maximum Life'],
        inherentAffix: [],
    },
    Pants: {
        affixOptions: ['+X Armor', '+X% Damage Reduction', '+X Maximum Life'],
        inherentAffix: ['While Injured, Your Potion Also Restores X% Resource', 'While Injured, Potion Grants X% Max Life as Barrier'],
    },
    Boots: {
        affixOptions: ['+X Armor', '+X% Movement Speed', 'Evade Briefly Grants X% Movement Speed'],
        inherentAffix: ['Attacks Reduce Evade\'s Cooldown by X Seconds', '+X Max Evade Charge', 'Evade Briefly Grants X% Movement Speed'],
    },
    Amulet: {
        affixOptions: ['+X All Stats', '+X% Critical Strike Chance', '+X Maximum Life'],
        inherentAffix: ['+X% Resistance to All Elements'],
    },
    Ring: {
        affixOptions: ['+X% Poison Resistance', '+X% Cold Resistance', '+X% Fire Resistance', '+X% Shadow Resistance', '+X% Lightning Resistance'],
        inherentAffix: [],
    },
    Dagger: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Damage to Close Enemies'],
    },
    Staff: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Damage to Crowd Controlled Enemies'],
    },
    Wand: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Lucky Hit Chance'],
    },
    Crossbow: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Vulnerable Damage'],
    },
    Bow: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Damage to Distant Enemies'],
    },
    Focus: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Cooldown Reduction'],
    },
    Totem: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Spirit Cost Reduction'],
    },
    Shield: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X Thorns'],
    },
    Sword: {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Critical Strike Damage'],
    },
    'Two-Handed Sword': {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Critical Strike Damage'],
    },
    'Two-Handed Axe': {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Damage to Healthy Enemies'],
    },
    'Two-Handed Mace': {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X% Overpower Damage'],
    },
    'Two-Handed Scythe': {
        affixOptions: ['+X% Damage to Close Enemies', '+X% Critical Strike Damage', '+X% Attack Speed'],
        inherentAffix: ['+X Life on Kill'],
    },
};
