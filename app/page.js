// app/page.js
"use client";

import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import ItemForm from './components/ItemForm';
import { parseItemAttributes } from './utils/parseItemAttributes';
import styles from './page.module.css';

export default function Home() {
    const [image, setImage] = useState(null);
    const [itemAttributes, setItemAttributes] = useState({
        world: '',
        rarity: '',
        type: '',
        itemPower: 0,
        stat: 0,
        inherentAffix: '',
        affixes: [],
        ability: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handlePaste = (event) => {
            const items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (let index in items) {
                const item = items[index];
                if (item.kind === 'file') {
                    const blob = item.getAsFile();
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setImage(e.target.result);
                        performOCR(e.target.result);
                    };
                    reader.readAsDataURL(blob);
                }
            }
        };
        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                performOCR(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const performOCR = (image) => {
        setLoading(true);
        Tesseract.recognize(
            image,
            'eng',
            {
                logger: (m) => console.log(m),
            }
        ).then(({ data: { text } }) => {
            console.log('OCR Text:', text);
            const parsedAttributes = parseItemAttributes(text);
            setItemAttributes(parsedAttributes);
            setLoading(false);

            // Log the parsed attributes in a readable format
            console.log('Parsed Attributes:');
            console.log(`World: ${parsedAttributes.world}`);
            console.log(`Rarity: ${parsedAttributes.rarity}`);
            console.log(`Type: ${parsedAttributes.type}`);
            console.log(`Item Power: ${parsedAttributes.itemPower}`);
            console.log(`Stat: ${parsedAttributes.stat}`);
            console.log(`Inherent Affix: ${parsedAttributes.inherentAffix}`);
            console.log('Affixes:');
            parsedAttributes.affixes.forEach((affix, index) => {
                console.log(`  ${index + 1}. ${affix.type}: ${affix.value}`);
            });
            console.log(`Ability: ${parsedAttributes.ability}`);
        });
    };

    const handleSubmit = async (itemAttributes) => {
        try {
            const response = await fetch('/api/compare-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemAttributes),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Item rank:', data.rank);
        } catch (error) {
            console.error('Failed to submit item:', error);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <a href="/" className={styles.logo}>LUCKYDROP.GG</a>
            </header>
            <div className={styles.box}>
                <div className={styles.column}>
                    <div className={styles.uploadBox}>
                        <h1>Paste Item by Ctrl+V</h1>
                        <p>or</p>
                        <h2>Upload from files</h2>
                        <input type="file" onChange={handleImageUpload} />
                        {image && <img src={image} alt="Uploaded item" className={styles.uploadedImage} />}
                    </div>
                </div>
                <div className={styles.column}>
                    {loading && <div className={styles.loadingOverlay}>
                        <img src="/loading.gif" alt="Loading" className={styles.loadingGif} />
                    </div>}
                    <ItemForm itemAttributes={itemAttributes} onSubmit={handleSubmit} disabled={loading} />
                </div>
            </div>
        </div>
    );
}
