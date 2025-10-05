// game-hub/script.js (ФИНАЛЬНАЯ ВЕРСИЯ)

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    
    // 1. ИНИЦИАЛИЗАЦИЯ: Сначала пытаемся получить язык, сохраненный специально для Хаба.
    let currentLang = localStorage.getItem('gevbookGameHubLang') || 'ru';
    
    // Устанавливаем текущий язык в селекторе сразу
    if (languageSelect) {
        languageSelect.value = currentLang;
    }

    // --- ФУНКЦИИ ПЕРЕВОДА ---

    async function loadTranslations() {
        // Проверяем 4 самых вероятных пути для файла переводов, 
        // чтобы гарантировать, что он будет найден независимо от того, как загружен index.html.
        const possiblePaths = [
            './translations_games.json',         // Если index.html в game-hub
            'translations_games.json',           // Если "./" не нужен
            '../game-hub/translations_games.json', // Если index.html загружен из другого места
            '../../game-hub/translations_games.json' // Если index.html загружен из более глубокого каталога
        ];

        for (const path of possiblePaths) {
            try {
                const response = await fetch(path); 
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                // Игнорируем ошибку, пробуем следующий путь
            }
        }
        
        console.error("КРИТИЧЕСКАЯ ОШИБКА: Не удалось загрузить translations_games.json ни по одному пути.");
        return { ru: {} }; 
    }

    async function applyTranslations(lang) {
        const translations = await loadTranslations();
        const langTranslations = translations[lang] || translations['ru'];

        if (Object.keys(langTranslations).length === 0) {
            return;
        }

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = langTranslations[key];
            
            if (translation !== undefined) {
                if (key === 'pageTitle') {
                    document.title = translation;
                } else if (key.includes('Tooltip')) {
                    element.title = translation;
                } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Устанавливаем атрибут языка для HTML
        document.documentElement.lang = lang;
        
        if (languageSelect) {
            languageSelect.value = lang;
        }
    }

    // --- Инициализация и Слушатель событий ---
    
    // Применяем переводы при загрузке страницы
    applyTranslations(currentLang);

    if (languageSelect) {
        languageSelect.addEventListener('change', (event) => {
            currentLang = event.target.value;
            
            // 2. ПЕРСИСТЕНТНОСТЬ: Сохраняем выбор в отдельный ключ Хаба.
            localStorage.setItem('gevbookGameHubLang', currentLang); 
            
            applyTranslations(currentLang);
        });
    }
});