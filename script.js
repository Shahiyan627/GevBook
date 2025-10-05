document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openRegistrationModal');
    const closeModalBtn = document.getElementById('closeRegistrationModal');
    const registrationModal = document.getElementById('registrationModal');
    const languageSelect = document.getElementById('languageSelect');
    const registrationForm = document.querySelector('.registration-form');
    const loginButton = document.querySelector('.login-button');

    let currentTranslations = {};

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`translations_${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${lang}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async function applyTranslations(lang) {
        currentTranslations = await loadTranslations(lang);

        if (Object.keys(currentTranslations).length === 0) {
            console.warn("Translations for the selected language are empty or not loaded.");
            return;
        }

        document.documentElement.lang = lang;

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (currentTranslations[key] !== undefined) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = currentTranslations[key];
                } else if (key === 'createPageText') {
                    const createPageLinkText = currentTranslations['createPageLink'];
                    const fullText = currentTranslations[key];
                    element.innerHTML = `<a href="#" class="create-page-link" data-key="createPageLink">${createPageLinkText}</a>${fullText}`;
                } else if (key === 'termsText') {
                    const part1 = currentTranslations['termsTextPart1'];
                    const termsLinkText = currentTranslations['termsLink'];
                    const privacyLinkText = currentTranslations['privacyPolicyLink'];
                    const cookiesLinkText = currentTranslations['cookiesPolicyLink'];
                    const part2 = currentTranslations['termsTextPart2'];

                    element.innerHTML = `${part1}<a href="#">${termsLinkText}</a>, <a href="#">${privacyLinkText}</a> и <a href="#">${cookiesLinkText}</a>${part2}`;
                } else if (element.tagName === 'SPAN' && element.closest('.gender-radio-label')) {
                    element.textContent = currentTranslations[key];
                }
                else {
                    element.textContent = currentTranslations[key];
                }
            }
        });

        populateDateDropdowns(currentTranslations);
    }

    const initialLang = localStorage.getItem('selectedLanguage') || 'ru';
    languageSelect.value = initialLang;
    applyTranslations(initialLang);

    languageSelect.addEventListener('change', (event) => {
        const newLang = event.target.value;
        localStorage.setItem('selectedLanguage', newLang);
        applyTranslations(newLang);
    });

    openModalBtn.addEventListener('click', () => {
        registrationModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        registrationModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === registrationModal) {
            registrationModal.style.display = 'none';
        }
    });

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = registrationForm.querySelector('[data-key="firstNamePlaceholder"]').value;
        const emailOrPhone = registrationForm.querySelector('[data-key="emailOrPhonePlaceholder"]').value;
        const newPassword = registrationForm.querySelector('[data-key="newPasswordPlaceholder"]').value;

        if (firstName.trim() === '' || emailOrPhone.trim() === '' || newPassword.trim() === '') {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        const redirectURL = 'indexs.html';
        window.location.href = redirectURL;
    });

    loginButton.addEventListener('click', () => {
        const emailOrPhoneInput = document.querySelector('input[data-key="emailOrPhonePlaceholder"]').value;
        const passwordInput = document.querySelector('input[data-key="passwordPlaceholder"]').value;

        if (emailOrPhoneInput.trim() === '' || passwordInput.trim() === '') {
            alert('Пожалуйста, введите ваш email/телефон и пароль!');
            return;
        }

        const redirectURL = 'indexs.html';
        window.location.href = redirectURL;
    });

    const daySelect = document.getElementById('dob-day');
    const monthSelect = document.getElementById('dob-month');
    const yearSelect = document.getElementById('dob-year');

    function populateDateDropdowns(langTranslations) {
        daySelect.innerHTML = '';
        monthSelect.innerHTML = '';
        yearSelect.innerHTML = '';

        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        const monthsKeys = [
            'month1', 'month2', 'month3', 'month4', 'month5', 'month6',
            'month7', 'month8', 'month9', 'month10', 'month11', 'month12'
        ];
        monthsKeys.forEach((key, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = langTranslations[key];
            monthSelect.appendChild(option);
        });

        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 120; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }
});