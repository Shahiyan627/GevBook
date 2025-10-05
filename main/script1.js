const translations = {
    ru: {
        searchPlaceholder: "Поиск на Gevbook",
        myProfileName: "Пользователь",
        friends: "Друзья",
        memories: "Воспоминания",
        saved: "Сохраненное",
        groups: "Группы",
        reels: "Видео Reels",
        marketplace: "Marketplace",
        events: "Мероприятия",
        showMore: "Показать больше",
        yourQuickLinks: "Ваши быстрые ссылки",
        whatsNewPlaceholder: "Что у вас нового, пользователь?",
        liveVideo: "Прямой эфир",
        photoVideo: "Фото/видео",
        feelingActivity: "Чувства/действия",
        publish: "Опубликовать",
        like: "Нравится",
        liked: "Понравилось",
        comment: "Комментировать",
        writeAComment: "Напишите комментарий...",
        share: "Поделиться",
        ads: "Реклама",
        ad1Text: "закажи через озон и садись на бизон",
        ad2Text: "Atmos самое говно среди говна",
        contacts: "Контакты",
        groupChats: "Групповые чаты",
        createGroupChat: "Создать групповой чат",
        hereWillBePhotos: "Здесь будут ваши фотографии",
        deleteComment: "Удалить",
        confirmDeleteComment: "Вы уверены, что хотите удалить этот комментарий?",
        confirmDeletePost: "Вы уверены, что хотите удалить этот пост?",
        reply: "Ответить"
    },
    en: {
        searchPlaceholder: "Search on Gevbook",
        myProfileName: "User",
        friends: "Friends",
        memories: "Memories",
        saved: "Saved",
        groups: "Groups",
        reels: "Reels Videos",
        marketplace: "Marketplace",
        events: "Events",
        showMore: "Show More",
        yourQuickLinks: "Your Quick Links",
        whatsNewPlaceholder: "What's new with you, User?",
        liveVideo: "Live Video",
        photoVideo: "Photo/Video",
        feelingActivity: "Feeling/Activity",
        publish: "Publish",
        like: "Like",
        liked: "Liked",
        comment: "Comment",
        writeAComment: "Write a comment...",
        share: "Share",
        ads: "Ads",
        ad1Text: "order through ozone and ride a bison",
        ad2Text: "Atmos is the worst among the worst",
        contacts: "Contacts",
        groupChats: "Group Chats",
        createGroupChat: "Create Group Chat",
        hereWillBePhotos: "Your photos will be here",
        deleteComment: "Delete",
        confirmDeleteComment: "Are you sure you want to delete this comment?",
        confirmDeletePost: "Are you sure you want to delete this post?",
        reply: "Reply"
    },
    am: {
        searchPlaceholder: "Փնտրել Gevbook-ում",
        myProfileName: "Օգտատեր",
        friends: "Ընկերներ",
        memories: "Հիշողություններ",
        saved: "Պահպանվածներ",
        groups: "Խմբեր",
        reels: "Ռիլս Վիդեոներ",
        marketplace: "Շուկա",
        events: "Միջոցառումներ",
        showMore: "Ավելին ցույց տալ",
        yourQuickLinks: "Ձեր Արագ Հղումները",
        whatsNewPlaceholder: "Ի՞նչ նորություն կա, օգտատեր:",
        liveVideo: "Ուղիղ եթեր",
        photoVideo: "Լուսանկար/տեսանյութ",
        feelingActivity: "Զգացմունքներ/Գործողություններ",
        publish: "Հրապարակել",
        like: "Հավանել",
        liked: "Հավանված է",
        comment: "Մեկնաբանել",
        writeAComment: "Գրեք մեկնաբանություն...",
        share: "Կիսվել",
        ads: "Գովազդ",
        ad1Text: "պատվիրեք օզոնի միջոցով և նստեք բիզոնի վրա",
        ad2Text: "Atmos-ը ամենավատն է վատերի մեջ",
        contacts: "Կոնտակտներ",
        groupChats: "Խմբակային զրույցներ",
        createGroupChat: "Ստեղծել խմբակային զրույց",
        hereWillBePhotos: "Ձեր լուսանկարները կլինեն այստեղ",
        deleteComment: "Ջնջել",
        confirmDeleteComment: "Համոզվա՞ծ եք, որ ցանկանում եք ջնջել այս մեկնաբանությունը?",
        confirmDeletePost: "Համոզվա՞ծ եք, որ ցանկանում եք ջնջել այս գրառումը?",
        reply: "Պատասխանել"
    }
};

let currentLang = localStorage.getItem('facebookLang') || 'ru';
let posts = []; 

const DB_NAME = 'GevbookDB';
const DB_VERSION = 1;
const STORE_NAME = 'postsStore';
let db;

function openDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            console.error("IndexedDB не поддерживается вашим браузером.");
            reject("IndexedDB not supported");
            return;
        }
        
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.error);
            reject(event.target.error);
        };
    });
}

async function savePostToDB(post) {
    try {
        const dbInstance = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(post); 

            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    } catch (error) {
        console.error("Ошибка сохранения в IndexedDB:", error);
    }
}

async function loadPostsFromDB() {
    try {
        const dbInstance = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll(); 

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    } catch (error) {
        console.error("Ошибка загрузки из IndexedDB:", error);
        return [];
    }
}

const postsContainer = document.getElementById('posts-container');
const postInput = document.getElementById('postInput'); 
const imageUpload = document.getElementById('imageUpload');
const imagePreviewContainer = document.getElementById('imagePreviewContainer'); 


function applyTranslations(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    if (imagePreviewContainer && translations[currentLang] && translations[currentLang]['hereWillBePhotos']) {
         if (imageUpload && imageUpload.files.length === 0) {
            imagePreviewContainer.textContent = translations[currentLang]['hereWillBePhotos'];
            imagePreviewContainer.style.justifyContent = 'center';
            imagePreviewContainer.style.alignItems = 'center';
         }
    }
    updatePostTimes();
}

function updatePostTimes() {
    moment.locale(currentLang);
    document.querySelectorAll('.comment-time, .post-time').forEach(timeSpan => {
        const timestamp = timeSpan.getAttribute('data-timestamp');
        if (timestamp) {
            timeSpan.textContent = moment(parseInt(timestamp)).fromNow();
        }
    });
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function renderComment(comment, postId) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment-item');
    if (comment.parentId) {
        commentElement.classList.add('nested');
    }
    
    commentElement.setAttribute('data-comment-id', comment.id);
    commentElement.setAttribute('data-author-id', comment.author);

    const deleteButton = comment.author === 'Gevorg Shahinyan' 
        ? `<button class="delete-comment-btn" data-action="delete-comment">${translations[currentLang]['deleteComment']}</button>` 
        : '';
        
    commentElement.innerHTML = `
        <div class="avatar-icon-placeholder-sm"><i class="fas fa-user"></i></div>
        <div class="comment-content">
            <span class="comment-author">${comment.author}</span>
            <p class="comment-text">${comment.text}</p>
            <div class="comment-meta">
                <span class="comment-time" data-timestamp="${comment.timestamp}"></span>
                ${deleteButton}
            </div>
        </div>
    `;

    return commentElement;
}


function renderPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('feed-post'); 
    postElement.setAttribute('data-post-id', post.id);

    const deletePostButton = post.author === 'Gevorg Shahinyan' 
        ? `<i class="fas fa-ellipsis-h post-options-icon" data-action="delete-post"></i>` 
        : '';

    postElement.innerHTML = `
        <div class="post-author-info">
            <div class="avatar-icon-placeholder"><i class="fas fa-user"></i></div>
            <div>
                <span class="author-name">${post.author}</span>
                <span class="post-time" data-timestamp="${post.timestamp}"></span>
            </div>
            ${deletePostButton}
        </div>
        <p class="post-text">${post.text}</p>
        <div class="post-images ${post.images && post.images.length === 1 ? 'single-image' : ''}">
            ${(post.images || []).map(src => {
                const isVideo = src.startsWith('data:video');
                if (isVideo) {
                    return `<video controls preload="metadata" width="100%" height="auto"><source src="${src}" type="video/mp4">Ваш браузер не поддерживает тег video.</video>`;
                }
                return `<img src="${src}" alt="Post Image">`;
            }).join('')}
        </div>
        <div class="post-actions">
            <span class="like-button" data-likes="${post.likes}" data-action="like">
                <i class="fas fa-thumbs-up" style="color: ${post.isLiked ? '#1877f2' : ''};"></i> 
                <span data-lang-key="${post.isLiked ? 'liked' : 'like'}">${translations[currentLang][post.isLiked ? 'liked' : 'like']}</span> 
                <span class="like-count">${post.likes}</span>
            </span>
            <span class="comment-button">
                <i class="fas fa-comment"></i>
                <span data-lang-key="comment">${translations[currentLang]['comment']}</span>
                <span class="comment-count">${post.comments.length}</span>
            </span>
            <span class="share-button"><i class="fas fa-share"></i> <span data-lang-key="share">${translations[currentLang]['share']}</span></span>
        </div>
        <div class="comments-section">
            <div class="comment-input-area">
                <div class="avatar-icon-placeholder-sm"><i class="fas fa-user"></i></div>
                <input type="text" class="comment-input" placeholder="${translations[currentLang]['writeAComment']}">
            </div>
            <div class="comments-list">
                </div>
        </div>
    `;

    const commentsList = postElement.querySelector('.comments-list');
    post.comments.forEach(comment => {
        commentsList.appendChild(renderComment(comment, post.id));
    });

    return postElement;
}


async function loadAndRenderPosts() {
    posts = await loadPostsFromDB();
    
    if (postsContainer) {
        postsContainer.innerHTML = '';
        posts.sort((a, b) => b.timestamp - a.timestamp).forEach(post => {
            postsContainer.appendChild(renderPost(post));
        });
        updatePostTimes();
    }
}


function displayImagePreview(files) {
    if (!imagePreviewContainer || files.length === 0) return;

    imagePreviewContainer.style.justifyContent = 'flex-start';
    imagePreviewContainer.style.alignItems = 'flex-start';
    imagePreviewContainer.innerHTML = '';
    
    if (files.length === 1) {
        imagePreviewContainer.textContent = `Выбран файл: ${files[0].name}`;
    } else {
        imagePreviewContainer.textContent = `Выбрано файлов: ${files.length}`;
    }
}

async function handlePostCreation() {
    if (!postInput || !imageUpload) return; 

    const text = postInput.value.trim();
    const files = Array.from(imageUpload.files);
    
    if (!text && files.length === 0) {
        return;
    }

    const imagePromises = files.map(file => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file); 
        });
    });

    const imageUrls = await Promise.all(imagePromises);

    const newPost = {
        id: generateUniqueId(),
        author: 'Gevorg Shahinyan',
        text: text,
        images: imageUrls, 
        timestamp: Date.now(),
        likes: 0,
        isLiked: false,
        comments: [],
        audience: 'public'
    };

    await savePostToDB(newPost);
    
    postInput.value = '';
    imageUpload.value = '';
    imagePreviewContainer.innerHTML = '';
    imagePreviewContainer.textContent = translations[currentLang]['hereWillBePhotos'];
    imagePreviewContainer.style.justifyContent = 'center';
    imagePreviewContainer.style.alignItems = 'center';

    loadAndRenderPosts();
}



async function handleLike(postId) {
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        const post = posts[postIndex];
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        
        await savePostToDB(post);
        loadAndRenderPosts();
    }
}

async function handleComment(postId, commentText) {
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1 && commentText) {
        const newComment = {
            id: generateUniqueId(),
            author: 'User', 
            text: commentText,
            timestamp: Date.now(),
            parentId: null
        };
        posts[postIndex].comments.push(newComment);

        await savePostToDB(posts[postIndex]);
        loadAndRenderPosts();
    }
}

async function handleDeletePost(postId) {
    if (!confirm(translations[currentLang]['confirmDeletePost'])) return; 

    try {
        const dbInstance = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = dbInstance.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(postId); 

            request.onsuccess = () => {
                posts = posts.filter(p => p.id !== postId); 
                loadAndRenderPosts(); 
                resolve();
            };
            request.onerror = (event) => reject(event.target.error);
        });
    } catch (error) {
        console.error("Ошибка удаления поста из IndexedDB:", error);
    }
}

async function handleDeleteComment(postId, commentId) {
    if (!confirm(translations[currentLang]['confirmDeleteComment'])) return;

    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        const post = posts[postIndex];
        post.comments = post.comments.filter(c => c.id !== commentId);

        await savePostToDB(post);
        loadAndRenderPosts();
    }
}

function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('.feed-post').forEach(post => { 
                const postTextElement = post.querySelector('.post-text');
                const postText = postTextElement ? postTextElement.textContent.toLowerCase() : '';
                
                let postMatches = postText.includes(query);

                if (!postMatches) {
                    const comments = post.querySelectorAll('.comment-text');
                    for (const comment of comments) {
                        if (comment.textContent.toLowerCase().includes(query)) {
                            postMatches = true;
                            break;
                        }
                    }
                }

                post.style.display = query === '' || postMatches ? 'block' : 'none';
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', async () => { 
    
    if (imagePreviewContainer) {
        imagePreviewContainer.textContent = translations[currentLang]['hereWillBePhotos'];
        imagePreviewContainer.style.justifyContent = 'center';
        imagePreviewContainer.style.alignItems = 'center';

        if (imageUpload) {
            imageUpload.addEventListener('change', () => {
                displayImagePreview(Array.from(imageUpload.files));
            });
        }
    }

    const languageSwitcher = document.getElementById('language-switcher');
    const publishButton = document.getElementById('publishButton'); 

    applyTranslations(currentLang);

    if (languageSwitcher) {
        languageSwitcher.value = currentLang;
        languageSwitcher.addEventListener('change', (event) => {
            currentLang = event.target.value;
            localStorage.setItem('facebookLang', currentLang);
            applyTranslations(currentLang);
            loadAndRenderPosts();
        });
    }

    if (publishButton) {
        publishButton.addEventListener('click', handlePostCreation); 
    } 

    await loadAndRenderPosts(); 
    initSearchFunctionality();

    if (postsContainer) {
        postsContainer.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
                e.preventDefault();
                const input = e.target;
                const commentText = input.value.trim();
                const postId = input.closest('.feed-post')?.getAttribute('data-post-id'); 
                
                if (commentText && postId) {
                    handleComment(postId, commentText); 
                    input.value = '';
                }
            }
        });
    }


    if (postsContainer) {
        postsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('[data-action]');
            if (!button) return;

            const action = button.getAttribute('data-action');
            const postElement = button.closest('.feed-post'); 
            const postId = postElement?.getAttribute('data-post-id');
            const commentItem = button.closest('.comment-item');
            const commentId = commentItem?.getAttribute('data-comment-id');
            
            if (!postId) return; 

            if (action === 'like') {
                handleLike(postId);
            } else if (action === 'delete-post') {
                if (posts.some(p => p.id === postId)) {
                     handleDeletePost(postId);
                } else {
                     alert("Этот пост является статическим примером и не может быть удален.");
                }
            } else if (action === 'delete-comment') {
                handleDeleteComment(postId, commentId);
            }
        });
    }

});


setInterval(() => {
    updatePostTimes();
}, 60000);