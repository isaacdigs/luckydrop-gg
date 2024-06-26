// app/components/ItemForm.js
"use client";

import { useState, useEffect } from 'react';
import styles from './ItemForm.module.css';
import { itemTypes } from '../utils/itemTypes';

const rarityOptions = [
    { label: 'Normal', color: 'grey' },
    { label: 'Magic', color: 'blue' },
    { label: 'Rare', color: 'yellow' },
    { label: 'Legendary', color: 'orange' },
    { label: 'Unique', color: 'beige' },
];

const worldOptions = ['Sacred', 'Ancestral'];
const typeOptions = Object.keys(itemTypes);

const ItemForm = ({ itemAttributes, onSubmit, disabled }) => {
    const [formData, setFormData] = useState(itemAttributes);
    const [selectedRarity, setSelectedRarity] = useState(itemAttributes.rarity);

    useEffect(() => {
        setFormData(itemAttributes);
        setSelectedRarity(itemAttributes.rarity);
    }, [itemAttributes]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRaritySelect = (rarity) => {
        setSelectedRarity(rarity);
        setFormData({
            ...formData,
            rarity,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const getStatLabel = () => {
        switch (formData.type) {
            case 'Helm':
            case 'Chest':
            case 'Pants':
            case 'Gloves':
            case 'Boots':
                return 'Armor';
            case 'Shield':
                return 'Armor';
            case 'Amulet':
            case 'Ring':
                return null;
            default:
                return 'Damage';
        }
    };

    const affixOptions = formData.type ? itemTypes[formData.type].affixOptions : [];

    return (
        <form onSubmit={handleSubmit} className={styles.form} disabled={disabled}>
            <div className={styles.worldTypeContainer}>
                <select className={styles.select} name="world" value={formData.world} onChange={handleChange}>
                    <option value="" disabled>World</option>
                    {worldOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select className={styles.select} name="type" value={formData.type} onChange={handleChange}>
                    <option value="" disabled>Type</option>
                    {typeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className={styles.raritySelector}>
                {rarityOptions.map(option => (
                    <div
                        key={option.label}
                        className={`${styles.rarityCircle} ${selectedRarity === option.label ? styles.selected : ''}`}
                        style={{ backgroundColor: option.color }}
                        onClick={() => handleRaritySelect(option.label)}
                        title={option.label}
                    />
                ))}
                <span className={styles.rarityLabel}>{selectedRarity}</span>
            </div>
            <label className={styles.label}>
                Item Power:
                <input className={styles.input} type="number" name="itemPower" value={formData.itemPower} onChange={handleChange} />
            </label>
            {getStatLabel() && (
                <label className={styles.label}>
                    {getStatLabel()}:
                    <input className={styles.input} type="number" name="stat" value={formData.stat} onChange={handleChange} />
                </label>
            )}
            {formData.inherentAffix && (
                <div className={styles.inherentAffixContainer}>
                    <label className={styles.label}>
                        Inherent Affix:
                        <select className={styles.select} name="inherentAffix" value={formData.inherentAffix} onChange={handleChange}>
                            {itemTypes[formData.type].inherentAffix.map((affix, index) => (
                                <option key={index} value={affix}>{affix}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
            {formData.inherentAffix && <div className={styles.divider} />}
            <div className={styles.affixList}>
                {formData.affixes && formData.affixes.map((affix, index) => (
                    <div key={index} className={styles.label}>
                        <input type="checkbox" checked={affix.checked} onChange={() => {
                            const updatedAffixes = [...formData.affixes];
                            updatedAffixes[index].checked = !updatedAffixes[index].checked;
                            setFormData({ ...formData, affixes: updatedAffixes });
                        }} />
                        <input
                            className={styles.input}
                            type="number"
                            value={affix.value}
                            onChange={(e) => {
                                const updatedAffixes = [...formData.affixes];
                                updatedAffixes[index].value = e.target.value;
                                setFormData({ ...formData, affixes: updatedAffixes });
                            }}
                        />
                        <select
                            className={styles.select}
                            value={affix.type}
                            onChange={(e) => {
                                const updatedAffixes = [...formData.affixes];
                                updatedAffixes[index].type = e.target.value;
                                setFormData({ ...formData, affixes: updatedAffixes });
                            }}
                        >
                            {affixOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            {formData.rarity === 'Unique' && (
                <label className={styles.label}>
                    Ability:
                    <textarea className={styles.textarea} name="ability" value={formData.ability} onChange={handleChange} />
                </label>
            )}
            <button type="submit" className={styles.submitButton} disabled={disabled}>Am I Lucky?</button>
        </form>
    );
};

export default ItemForm;
