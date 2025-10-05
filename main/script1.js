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
        cannotDeleteOthersComment: "Вы можете удалять только свои комментарии.",
        deletePost: "Удалить пост",
        confirmDeletePost: "Вы уверены, что хотите удалить этот пост?",
        cancel: "Отмена"
    },
    en: {
        searchPlaceholder: "Search on Gevbook",
        myProfileName: "User",
        friends: "Friends",
        memories: "Memories",
        saved: "Saved",
        groups: "Groups",
        reels: "Video Reels",
        marketplace: "Marketplace",
        events: "Events",
        showMore: "Show More",
        yourQuickLinks: "Your Quick Links",
        whatsNewPlaceholder: "What's on your mind, user?",
        liveVideo: "Live Video",
        photoVideo: "Photo/Video",
        feelingActivity: "Feeling/Activity",
        publish: "Publish",
        like: "Like",
        liked: "Liked",
        comment: "Comment",
        writeAComment: "Write a comment...",
        share: "Share",
        ads: "Sponsored",
        ad1Text: "order through Ozon and ride a bison",
        ad2Text: "Atmos is the worst of the worst",
        contacts: "Contacts",
        groupChats: "Group conversations",
        createGroupChat: "Create new group",
        hereWillBePhotos: "Here will be your photos",
        deleteComment: "Delete",
        confirmDeleteComment: "Are you sure you want to delete this comment?",
        cannotDeleteOthersComment: "You can only delete your own comments.",
        deletePost: "Delete Post",
        confirmDeletePost: "Are you sure you want to delete this post?",
        cancel: "Cancel"
    },
    hy: {
        searchPlaceholder: "Որոնել Gevbook-ում",
        myProfileName: "user",
        friends: "Ընկերներ",
        memories: "Հիշողություններ",
        saved: "Պահվածներ",
        groups: "Խմբեր",
        reels: "Ռիլսեր",
        marketplace: "Շուկա",
        events: "Միջոցառումներ",
        showMore: "Ավելին",
        yourQuickLinks: "Ձեր արագ հղումները",
        whatsNewPlaceholder: "Ի՞նչ կա նոր, user",
        liveVideo: "Ուղիղ եթեր",
        photoVideo: "Լուսանկար/տեսանյութ",
        feelingActivity: "Զգացմունք/գործողություն",
        publish: "Հրապարակել",
        like: "Հավանել",
        liked: "Հավանված է",
        comment: "Մեկնաբանել",
        writeAComment: "Գրել մեկնաբանություն...",
        share: "Կիսվել",
        ads: "Հովանավորվող",
        ad1Text: "պատվիրել Ozon-ի միջոցով և նստել բիզոնի վրա",
        ad2Text: "Atmos-ը ամենավատն է վատերի մեջ",
        contacts: "Կոնտակտներ",
        groupChats: "Խմբակային զրույցներ",
        createGroupChat: "Ստեղծել խմբակային զրույց",
        hereWillBePhotos: "Այստեղ կլինեն ձեր լուսանկարները",
        deleteComment: "Ջնջել",
        confirmDeleteComment: "Վստա՞հ եք, որ ցանկանում եք ջնջել այս մեկնաբանությունը։",
        cannotDeleteOthersComment: "Դուք կարող եք ջնջել միայն ձեր մեկնաբանությունները։",
        deletePost: "Ջնջել գրառումը",
        confirmDeletePost: "Վստա՞հ եք, որ ցանկանում եք ջնջել այս գրառումը։",
        cancel: "Չեղարկել"
    }
};

let currentLang = localStorage.getItem('facebookLang') || 'ru';
moment.locale(currentLang);

function applyTranslations(lang) {
    moment.locale(lang);

    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[lang][key];
            } else {
                if (element.classList.contains('like-button') || element.classList.contains('comment-button') ||
                    element.classList.contains('share-button') || element.classList.contains('post-option-button') ||
                    element.classList.contains('post-button') || element.classList.contains('create-group-chat') ||
                    element.classList.contains('delete-post-btn') || element.classList.contains('delete-comment-btn') ||
                    element.classList.contains('cancel-btn')) {
                    const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN' && !node.classList.contains('like-count') && !node.classList.contains('comment-count')));
                    if (textNode) {
                        if (textNode.tagName === 'SPAN') {
                            textNode.textContent = translations[lang][key];
                        } else {
                            element.textContent = translations[lang][key];
                        }
                    } else if (element.tagName === 'BUTTON') {
                        element.textContent = translations[lang][key];
                    }
                } else if (element.classList.contains('comment-count') || element.classList.contains('like-count')) {
                    return;
                } else if (element.tagName === 'SPAN' && element.closest('.profile-icon, .profile-link') && key === 'myProfileName') {
                    element.textContent = translations[lang][key];
                } else if (element.closest('.post-actions')) {
                    if (element.classList.contains('like-button') && element.querySelector('span[data-lang-key]')) {
                         element.querySelector('span[data-lang-key]').textContent = translations[lang][key];
                    } else if (element.classList.contains('comment-button') && element.querySelector('span[data-lang-key]')) {
                         element.querySelector('span[data-lang-key]').textContent = translations[lang][key];
                    } else if (element.classList.contains('share-button') && element.querySelector('span[data-lang-key]')) {
                         element.querySelector('span[data-lang-key]').textContent = translations[lang][key];
                    }
                    else if (element.tagName === 'P' && (key === 'ad1Text' || key === 'ad2Text')) {
                        element.textContent = translations[lang][key];
                    }
                    else {
                        element.textContent = translations[lang][key];
                    }
                } else if (element.tagName === 'P' && (key === 'ad1Text' || key === 'ad2Text')) {
                    element.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        }
    });

    document.querySelectorAll('.like-button').forEach(button => {
        const isLiked = button.classList.contains('liked');
        const likeTextSpan = button.querySelector('span[data-lang-key="like"], span[data-lang-key="liked"]');
        if (likeTextSpan) {
            likeTextSpan.textContent = isLiked ? translations[currentLang]['liked'] : translations[currentLang]['like'];
        }
    });

    document.querySelectorAll('.comment-input').forEach(input => {
        input.placeholder = translations[lang]['writeAComment'];
    });

    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    if (imagePreviewContainer && imagePreviewContainer.children.length === 0) {
        imagePreviewContainer.textContent = translations[lang]['hereWillBePhotos'];
        imagePreviewContainer.style.justifyContent = 'center';
        imagePreviewContainer.style.alignItems = 'center';
    }

    document.querySelectorAll('.comment-time, .post-time').forEach(timeSpan => {
        const timestamp = timeSpan.getAttribute('data-timestamp');
        if (timestamp) {
            timeSpan.textContent = moment(parseInt(timestamp)).fromNow();
        }
    });

    document.querySelectorAll('.feed-post').forEach(post => {
        const postId = post.getAttribute('data-post-id');
        const myProfileName = translations[currentLang]['myProfileName'];

        const postOptionsToggle = post.querySelector('.post-options-toggle');
        if (postOptionsToggle) {
            if (postId && postId.startsWith('post-')) {
                postOptionsToggle.style.display = 'block';
            } else {
                postOptionsToggle.style.display = 'none';
            }
        }

        post.querySelectorAll('.comment-item').forEach(commentItem => {
            const commentAuthorId = commentItem.getAttribute('data-author-id');
            const commentOptionsToggle = commentItem.querySelector('.comment-options-toggle');
            if (commentOptionsToggle) {
                 commentOptionsToggle.style.display = (commentAuthorId === myProfileName) ? 'block' : 'none';
            }
        });
    });
}

document.getElementById('language-switcher').value = currentLang;
applyTranslations(currentLang);

document.getElementById('language-switcher').addEventListener('change', (event) => {
    currentLang = event.target.value;
    localStorage.setItem('facebookLang', currentLang);
    applyTranslations(currentLang);
    loadAndRenderPosts();
});

function initLikeButton(button) {
    if (button.dataset.listenerInitialized === 'true') {
        return;
    }
    button.dataset.listenerInitialized = 'true';

    button.addEventListener('click', () => {
        let currentLikes = parseInt(button.getAttribute('data-likes')) || 0;
        const likeTextSpan = button.querySelector('span[data-lang-key="like"], span[data-lang-key="liked"]');
        const likeCountSpan = button.querySelector('.like-count');

        if (button.classList.contains('liked')) {
            button.classList.remove('liked');
            currentLikes--;
            if (likeTextSpan) likeTextSpan.textContent = translations[currentLang]['like'];
        } else {
            button.classList.add('liked');
            currentLikes++;
            if (likeTextSpan) likeTextSpan.textContent = translations[currentLang]['liked'];
        }
        button.setAttribute('data-likes', currentLikes);
        if (likeCountSpan) {
            likeCountSpan.textContent = currentLikes;
        }
        saveAllPostsData();
    });
}

const imageUploadInput = document.getElementById('imageUpload');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
let selectedFilesData = [];

imageUploadInput.addEventListener('change', (event) => {
    imagePreviewContainer.innerHTML = '';
    selectedFilesData = [];
    const files = event.target.files;

    if (files.length > 0) {
        imagePreviewContainer.textContent = '';
        imagePreviewContainer.style.justifyContent = 'flex-start';
        imagePreviewContainer.style.alignItems = 'flex-start';

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                selectedFilesData.push({ type: file.type, src: dataUrl });

                let mediaElement;
                if (file.type.startsWith('image/')) {
                    mediaElement = document.createElement('img');
                    mediaElement.src = dataUrl;
                    mediaElement.alt = "Post Image";
                } else if (file.type.startsWith('video/')) {
                    mediaElement = document.createElement('video');
                    mediaElement.src = dataUrl;
                    mediaElement.controls = true;
                    mediaElement.preload = "metadata";
                }
                if (mediaElement) {
                    imagePreviewContainer.appendChild(mediaElement);
                }
            };
            reader.readAsDataURL(file);
        });
    } else {
        imagePreviewContainer.innerHTML = '';
        imagePreviewContainer.style.justifyContent = 'center';
        imagePreviewContainer.style.alignItems = 'center';
        imagePreviewContainer.textContent = translations[currentLang]['hereWillBePhotos'];
    }
});

document.getElementById('publishPostButton').addEventListener('click', () => {
    const postTextInput = document.getElementById('postInput');
    const postText = postTextInput.value.trim();

    if (postText === '' && selectedFilesData.length === 0) {
        alert('Пожалуйста, введите текст или выберите изображение/видео для поста.');
        return;
    }

    const feedContainer = document.querySelector('.feed-container');
    const newPost = document.createElement('div');
    newPost.classList.add('feed-post');
    const postId = 'post-' + Date.now();
    newPost.setAttribute('data-post-id', postId);

    const currentTime = Date.now();
    const myProfileName = translations[currentLang]['myProfileName'];

    let mediaHtml = '';
    if (selectedFilesData.length > 0) {
        mediaHtml = `<div class="post-images ${selectedFilesData.length === 1 ? 'single-image' : ''}">`;
        selectedFilesData.forEach(mediaItem => {
            if (mediaItem.type.startsWith('image/')) {
                mediaHtml += `<img src="${mediaItem.src}" alt="Post Image">`;
            } else if (mediaItem.type.startsWith('video/')) {
                mediaHtml += `<video controls preload="metadata" width="100%" height="auto"><source src="${mediaItem.src}" type="${mediaItem.type}"></video>`;
            }
        });
        mediaHtml += '</div>';
    }

    newPost.innerHTML = `
        <div class="post-author-info">
            <div class="avatar-icon-placeholder"><i class="fas fa-user"></i></div>
            <div>
                <span class="author-name" data-lang-key="myProfileName">${myProfileName}</span>
                <span class="post-time" data-timestamp="${currentTime}">${moment(currentTime).fromNow()}</span>
            </div>
            <div class="post-options">
                <i class="fas fa-ellipsis-h post-options-toggle" style="display: block;"></i>
                <div class="post-options-menu">
                    <button class="delete-post-btn" data-lang-key="deletePost">${translations[currentLang]['deletePost']}</button>
                    <button class="cancel-btn" data-lang-key="cancel">${translations[currentLang]['cancel']}</button>
                </div>
            </div>
        </div>
        ${postText ? `<p class="post-text">${postText}</p>` : ''}
        ${mediaHtml}
        <div class="post-actions">
            <span class="like-button" data-likes="0"><i class="fas fa-thumbs-up"></i> <span data-lang-key="like">${translations[currentLang]['like']}</span> <span class="like-count">0</span></span>
            <span class="comment-button">
                <i class="fas fa-comment"></i>
                <span data-lang-key="comment">${translations[currentLang]['comment']}</span>
                <span class="comment-count">0</span>
            </span>
            <span class="share-button"><i class="fas fa-share"></i> <span data-lang-key="share">${translations[currentLang]['share']}</span></span>
        </div>
        <div class="comments-section" style="display: none;">
            <div class="comment-input-area">
                <div class="avatar-icon-placeholder-sm"><i class="fas fa-user"></i></div>
                <input type="text" class="comment-input" placeholder="${translations[currentLang]['writeAComment']}" data-lang-key="writeAComment">
            </div>
            <div class="comments-list">
            </div>
        </div>
    `;

    const createPostElement = document.querySelector('.create-post');
    feedContainer.insertBefore(newPost, createPostElement.nextSibling);

    postTextInput.value = '';
    imagePreviewContainer.innerHTML = '';
    imagePreviewContainer.style.justifyContent = 'center';
    imagePreviewContainer.style.alignItems = 'center';
    imagePreviewContainer.textContent = translations[currentLang]['hereWillBePhotos'];
    selectedFilesData = [];
    imageUploadInput.value = '';

    initEventListenersForPost(newPost);
    saveAllPostsData();
    applyTranslations(currentLang);
});

function initCommentInput(inputElement) {
    if (inputElement.dataset.listenerInitialized === 'true') {
        return;
    }
    inputElement.dataset.listenerInitialized = 'true';

    inputElement.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            const commentText = this.value.trim();
            const commentsList = this.closest('.comments-section').querySelector('.comments-list');
            const postId = this.closest('.feed-post').getAttribute('data-post-id');

            const commentId = 'comment-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
            const timestamp = Date.now();
            const myProfileName = translations[currentLang]['myProfileName'];

            const newComment = document.createElement('div');
            newComment.classList.add('comment-item');
            newComment.setAttribute('data-comment-id', commentId);
            newComment.setAttribute('data-author-id', myProfileName);

            newComment.innerHTML = `
                <div class="avatar-icon-placeholder-sm"><i class="fas fa-user"></i></div>
                <div class="comment-content">
                    <span class="comment-author">${myProfileName}</span>
                    <p class="comment-text">${commentText}</p>
                    <div class="comment-meta">
                        <span class="comment-time" data-timestamp="${timestamp}">${moment(timestamp).fromNow()}</span>
                        <div class="comment-options">
                            <i class="fas fa-ellipsis-h comment-options-toggle" style="display: block;"></i>
                            <div class="comment-options-menu">
                                <button class="delete-comment-btn" data-lang-key="deleteComment">${translations[currentLang]['deleteComment']}</button>
                                <button class="cancel-btn" data-lang-key="cancel">${translations[currentLang]['cancel']}</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            commentsList.appendChild(newComment);

            this.value = '';
            updateCommentCount(this.closest('.feed-post'));
            initCommentOptionsMenu(newComment);
            saveAllPostsData();
            applyTranslations(currentLang);
        }
    });
}

function initCommentToggle(commentButton) {
    if (commentButton.dataset.listenerInitialized === 'true') {
        return;
    }
    commentButton.dataset.listenerInitialized = 'true';

    commentButton.addEventListener('click', () => {
        const commentsSection = commentButton.closest('.feed-post').querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.style.display = (commentsSection.style.display === 'none' || commentsSection.style.display === '') ? 'block' : 'none';
        }
    });
}

function updateCommentCount(postElement) {
    const commentsList = postElement.querySelector('.comments-list');
    const commentCountSpan = postElement.querySelector('.comment-count');
    if (commentsList && commentCountSpan) {
        commentCountSpan.textContent = commentsList.children.length;
    }
}

function initPostOptionsMenu(postElement) {
    const toggleButton = postElement.querySelector('.post-options-toggle');
    const menu = postElement.querySelector('.post-options-menu');
    const deleteButton = postElement.querySelector('.delete-post-btn');
    const cancelButton = postElement.querySelector('.cancel-btn');

    if (!toggleButton || !menu || toggleButton.dataset.listenerInitialized === 'true') {
        return;
    }
    toggleButton.dataset.listenerInitialized = 'true';

    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        document.querySelectorAll('.post-options-menu, .comment-options-menu').forEach(openMenu => {
            if (openMenu !== menu) {
                openMenu.style.display = 'none';
            }
        });
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    if (deleteButton) {
        if (deleteButton.dataset.listenerInitialized === 'true') {
            return;
        }
        deleteButton.dataset.listenerInitialized = 'true';
        deleteButton.addEventListener('click', () => {
            const postId = postElement.getAttribute('data-post-id');
            postElement.remove();
            deletePostData(postId);
            menu.style.display = 'none';
        });
    }

    if (cancelButton) {
        if (cancelButton.dataset.listenerInitialized === 'true') {
            return;
        }
        cancelButton.dataset.listenerInitialized = 'true';
        cancelButton.addEventListener('click', () => {
            menu.style.display = 'none';
        });
    }

    document.addEventListener('click', (event) => {
        if (menu.style.display === 'block' && !menu.contains(event.target) && !toggleButton.contains(event.target)) {
            menu.style.display = 'none';
        }
    });

    const postId = postElement.getAttribute('data-post-id');
    if (toggleButton) {
        toggleButton.style.display = (postId && postId.startsWith('post-')) ? 'block' : 'none';
    }
}

function deletePostData(postId) {
    let allPostsData = JSON.parse(localStorage.getItem('allPostsData') || '[]');
    allPostsData = allPostsData.filter(post => post.postId !== postId);
    localStorage.setItem('allPostsData', JSON.stringify(allPostsData));
    console.log('Post deleted from localStorage. Remaining posts:', allPostsData);
}

function initCommentOptionsMenu(commentItem) {
    const toggleButton = commentItem.querySelector('.comment-options-toggle');
    const menu = commentItem.querySelector('.comment-options-menu');
    const deleteButton = commentItem.querySelector('.delete-comment-btn');
    const cancelButton = commentItem.querySelector('.cancel-btn');
    const commentAuthorId = commentItem.getAttribute('data-author-id');
    const myProfileName = translations[currentLang]['myProfileName'];

    if (!toggleButton || !menu || toggleButton.dataset.listenerInitialized === 'true') {
        return;
    }
    toggleButton.dataset.listenerInitialized = 'true';

    toggleButton.style.display = (commentAuthorId === myProfileName) ? 'block' : 'none';

    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        document.querySelectorAll('.post-options-menu, .comment-options-menu').forEach(openMenu => {
            if (openMenu !== menu) {
                openMenu.style.display = 'none';
            }
        });
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    if (deleteButton) {
        if (deleteButton.dataset.listenerInitialized === 'true') {
            return;
        }
        deleteButton.dataset.listenerInitialized = 'true';
        deleteButton.addEventListener('click', () => {
            const postId = commentItem.closest('.feed-post').getAttribute('data-post-id');
            const commentId = commentItem.getAttribute('data-comment-id');
            commentItem.remove();
            deleteCommentData(postId, commentId);
            updateCommentCount(document.querySelector(`.feed-post[data-post-id="${postId}"]`));
            menu.style.display = 'none';
        });
    }

    if (cancelButton) {
        if (cancelButton.dataset.listenerInitialized === 'true') {
            return;
        }
        cancelButton.dataset.listenerInitialized = 'true';
        cancelButton.addEventListener('click', () => {
            menu.style.display = 'none';
        });
    }

    document.addEventListener('click', (event) => {
        if (menu.style.display === 'block' && !menu.contains(event.target) && !toggleButton.contains(event.target)) {
            menu.style.display = 'none';
        }
    });
}

function deleteCommentData(postId, commentId) {
    let allPostsData = JSON.parse(localStorage.getItem('allPostsData') || '[]');
    const postIndex = allPostsData.findIndex(post => post.postId === postId);

    if (postIndex !== -1) {
        allPostsData[postIndex].comments = allPostsData[postIndex].comments.filter(comment => comment.commentId !== commentId);
        localStorage.setItem('allPostsData', JSON.stringify(allPostsData));
        console.log(`Comment ${commentId} deleted from post ${postId}. Remaining comments:`, allPostsData[postIndex].comments);
    }
}


function initEventListenersForPost(post) {
    const likeButton = post.querySelector('.like-button');
    if (likeButton) {
        initLikeButton(likeButton);
    }

    const commentToggleButton = post.querySelector('.comment-button');
    if (commentToggleButton) {
        initCommentToggle(commentToggleButton);
    }

    const commentInput = post.querySelector('.comment-input');
    if (commentInput) {
        initCommentInput(commentInput);
    }

    updateCommentCount(post);

    initPostOptionsMenu(post);

    post.querySelectorAll('.comment-item').forEach(commentItem => {
        initCommentOptionsMenu(commentItem);
    });

    const commentsSection = post.querySelector('.comments-section');
    if (commentsSection) {
        commentsSection.style.display = 'none';
    }
}


function saveAllPostsData() {
    const allPostsData = [];
    document.querySelectorAll('.feed-post').forEach(postElement => {
        if (postElement.classList.contains('create-post') || (postElement.getAttribute('data-post-id') && postElement.getAttribute('data-post-id').startsWith('static-post-'))) {
            return;
        }

        const postId = postElement.getAttribute('data-post-id');
        if (!postId) {
             console.warn('Skipping post without data-post-id for saving:', postElement);
             return;
        }

        const postTextElement = postElement.querySelector('.post-text');
        const postText = postTextElement ? postTextElement.textContent.trim() : '';

        const postTimeElement = postElement.querySelector('.post-time');
        const postTimeTimestamp = postTimeElement ? parseInt(postTimeElement.getAttribute('data-timestamp')) : Date.now();
        const postTimeDisplay = postTimeElement ? postTimeElement.textContent : moment(postTimeTimestamp).fromNow();

        const postMedia = [];
        postElement.querySelectorAll('.post-images img, .post-images video source').forEach(mediaEl => {
            if (mediaEl.tagName === 'IMG') {
                postMedia.push({ type: 'image/' + mediaEl.src.split('.').pop().toLowerCase(), src: mediaEl.src });
            } else if (mediaEl.tagName === 'SOURCE') {
                postMedia.push({ type: mediaEl.type, src: mediaEl.src });
            }
        });

        const comments = [];
        postElement.querySelectorAll('.comments-list .comment-item').forEach(commentItem => {
            const commentAuthorElement = commentItem.querySelector('.comment-author');
            const commentTextElement = commentItem.querySelector('.comment-text');
            const commentTimeElement = commentItem.querySelector('.comment-time');

            const commentId = commentItem.getAttribute('data-comment-id');
            const authorId = commentItem.getAttribute('data-author-id');
            const commentTimestamp = commentTimeElement ? parseInt(commentTimeElement.getAttribute('data-timestamp')) : Date.now();


            comments.push({
                author: commentAuthorElement ? commentAuthorElement.textContent.trim() : '',
                text: commentTextElement ? commentTextElement.textContent.trim() : '',
                timestamp: commentTimestamp,
                authorId: authorId,
                commentId: commentId
            });
        });

        const likeButton = postElement.querySelector('.like-button');
        const likes = likeButton ? (parseInt(likeButton.getAttribute('data-likes')) || 0) : 0;
        const isLiked = likeButton ? likeButton.classList.contains('liked') : false;

        allPostsData.push({
            postId,
            postText,
            postTime: postTimeDisplay,
            postTimeTimestamp,
            postMedia,
            comments,
            likes,
            isLiked
        });
    });
    localStorage.setItem('allPostsData', JSON.stringify(allPostsData));
    console.log('Posts data saved to localStorage:', allPostsData);
}


function loadAndRenderPosts() {
    const savedData = localStorage.getItem('allPostsData');
    const feedContainer = document.querySelector('.feed-container');
    const createPostElement = document.querySelector('.create-post');

    Array.from(document.querySelectorAll('.feed-post')).forEach(post => {
        if (!post.classList.contains('create-post') && !post.getAttribute('data-post-id').startsWith('static-post-')) {
            post.remove();
        }
    });

    let dynamicPostsToRender = [];
    if (savedData) {
        dynamicPostsToRender = JSON.parse(savedData);
        console.log('Loaded posts data from localStorage:', dynamicPostsToRender);

        dynamicPostsToRender = dynamicPostsToRender.filter(post => !post.postId.startsWith('static-post-'));

        dynamicPostsToRender.sort((a, b) => {
            const timeA = a.postTimeTimestamp || 0;
            const timeB = b.postTimeTimestamp || 0;
            return timeB - timeA;
        });
    }

    const myProfileName = translations[currentLang]['myProfileName'];

    dynamicPostsToRender.forEach(postData => {
        if (document.querySelector(`.feed-post[data-post-id="${postData.postId}"]`)) {
            return;
        }

        const newPost = document.createElement('div');
        newPost.classList.add('feed-post');
        newPost.setAttribute('data-post-id', postData.postId);

        let mediaHtml = '';
        if (postData.postMedia && postData.postMedia.length > 0) {
            mediaHtml = `<div class="post-images ${postData.postMedia.length === 1 ? 'single-image' : ''}">`;
            postData.postMedia.forEach(mediaItem => {
                const mimeTypeMatch = mediaItem.src.match(/^data:([^;]+);/);
                const inferredMimeType = mimeTypeMatch ? mimeTypeMatch[1] : mediaItem.type;

                if (inferredMimeType && inferredMimeType.startsWith('image/')) {
                    mediaHtml += `<img src="${mediaItem.src}" alt="Post Image">`;
                } else if (inferredMimeType && inferredMimeType.startsWith('video/')) {
                    mediaHtml += `<video controls preload="metadata" width="100%" height="auto"><source src="${mediaItem.src}" type="${inferredMimeType}"></video>`;
                } else {
                    if (mediaItem.src && (mediaItem.src.match(/^data:image\//i) || /\.(jpeg|jpg|gif|png)$/i.test(mediaItem.src))) {
                        mediaHtml += `<img src="${mediaItem.src}" alt="Post Image">`;
                    } else if (mediaItem.src && (mediaItem.src.match(/^data:video\//i) || /\.(mp4|webm|ogg)$/i.test(mediaItem.src))) {
                        const fileExtension = mediaItem.src.split('.').pop().toLowerCase();
                        let fallbackMimeType = 'video/mp4';
                        if (fileExtension === 'webm') fallbackMimeType = 'video/webm';
                        if (fileExtension === 'ogg') fallbackMimeType = 'video/ogg';
                        mediaHtml += `<video controls preload="metadata" width="100%" height="auto"><source src="${mediaItem.src}" type="${fallbackMimeType}"></video>`;
                    }
                }
            });
            mediaHtml += '</div>';
        }

        const commentCount = postData.comments ? postData.comments.length : 0;
        const likeTextKey = postData.isLiked ? 'liked' : 'like';

        const showPostOptionsToggle = postData.postId.startsWith('post-') ? 'block' : 'none';

        newPost.innerHTML = `
            <div class="post-author-info">
                <div class="avatar-icon-placeholder"><i class="fas fa-user"></i></div>
                <div>
                    <span class="author-name" data-lang-key="myProfileName">${myProfileName}</span>
                    <span class="post-time" data-timestamp="${postData.postTimeTimestamp || ''}">${moment(postData.postTimeTimestamp || Date.now()).fromNow()}</span>
                </div>
                <div class="post-options">
                    <i class="fas fa-ellipsis-h post-options-toggle" style="display: ${showPostOptionsToggle};"></i>
                    <div class="post-options-menu">
                        <button class="delete-post-btn" data-lang-key="deletePost">${translations[currentLang]['deletePost']}</button>
                        <button class="cancel-btn" data-lang-key="cancel">${translations[currentLang]['cancel']}</button>
                    </div>
                </div>
            </div>
            ${postData.postText ? `<p class="post-text">${postData.postText}</p>` : ''}
            ${mediaHtml}
            <div class="post-actions">
                <span class="like-button ${postData.isLiked ? 'liked' : ''}" data-likes="${postData.likes || 0}"><i class="fas fa-thumbs-up"></i> <span data-lang-key="${likeTextKey}">${translations[currentLang][likeTextKey]}</span> <span class="like-count">${postData.likes || 0}</span></span>
                <span class="comment-button">
                    <i class="fas fa-comment"></i>
                    <span data-lang-key="comment">${translations[currentLang]['comment']}</span>
                    <span class="comment-count">${commentCount}</span>
                </span>
                <span class="share-button"><i class="fas fa-share"></i> <span data-lang-key="share">${translations[currentLang]['share']}</span></span>
            </div>
            <div class="comments-section" style="display: none;">
                <div class="comment-input-area">
                    <div class="avatar-icon-placeholder-sm"><i class="fas fa-user"></i></div>
                    <input type="text" class="comment-input" placeholder="${translations[currentLang]['writeAComment']}" data-lang-key="writeAComment">
                </div>
                <div class="comments-list">
                </div>
            </div>
        `;
        feedContainer.insertBefore(newPost, createPostElement.nextSibling);

        const commentsList = newPost.querySelector('.comments-list');
        if (postData.comments && commentsList) {
            postData.comments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');
                commentItem.setAttribute('data-comment-id', comment.commentId || 'legacy-comment-' + Date.now());
                commentItem.setAttribute('data-author-id', comment.authorId || comment.author || 'Unknown');

                const showCommentOptionsToggle = ((comment.authorId || comment.author) === myProfileName) ? 'block' : 'none';

                commentItem.innerHTML = `
                    <div class="avatar-icon-placeholder-sm"><i class="fas fa-user"></i></div>
                    <div class="comment-content">
                        <span class="comment-author">${comment.author || 'Unknown'}</span>
                        <p class="comment-text">${comment.text || ''}</p>
                        <div class="comment-meta">
                            <span class="comment-time" data-timestamp="${comment.timestamp || Date.now()}">${moment(comment.timestamp || Date.now()).fromNow()}</span>
                            <div class="comment-options">
                                <i class="fas fa-ellipsis-h comment-options-toggle" style="display: ${showCommentOptionsToggle};"></i>
                                <div class="comment-options-menu">
                                    <button class="delete-comment-btn" data-lang-key="deleteComment">${translations[currentLang]['deleteComment']}</button>
                                    <button class="cancel-btn" data-lang-key="cancel">${translations[currentLang]['cancel']}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                commentsList.appendChild(commentItem);
            });
        }
    });

    if (createPostElement && feedContainer.firstChild !== createPostElement) {
        feedContainer.insertBefore(createPostElement, feedContainer.firstChild);
    }

    document.querySelectorAll('.feed-post').forEach(post => {
        if (!post.classList.contains('create-post')) {
            initEventListenersForPost(post);
        }
    });
    applyTranslations(currentLang);
}

function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input[type="text"]');
    if (!searchInput) {
        console.warn('Search input not found.');
        return;
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        const allPosts = document.querySelectorAll('.feed-post');

        allPosts.forEach(post => {
            if (post.classList.contains('create-post')) {
                return;
            }

            const postTextElement = post.querySelector('.post-text');
            const postText = postTextElement ? postTextElement.textContent.toLowerCase() : '';
            let postMatches = false;

            if (postText.includes(query)) {
                postMatches = true;
            }

            const commentsList = post.querySelector('.comments-list');
            if (!postMatches && commentsList) {
                const commentItems = commentsList.querySelectorAll('.comment-item');
                for (const commentItem of commentItems) {
                    const commentTextElement = commentItem.querySelector('.comment-text');
                    const commentText = commentTextElement ? commentTextElement.textContent.toLowerCase() : '';
                    if (commentText.includes(query)) {
                        postMatches = true;
                        break;
                    }
                }
            }

            if (query === '' || postMatches) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    imagePreviewContainer.textContent = translations[currentLang]['hereWillBePhotos'];
    imagePreviewContainer.style.justifyContent = 'center';
    imagePreviewContainer.style.alignItems = 'center';

    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        languageSwitcher.value = currentLang;
        languageSwitcher.addEventListener('change', (event) => {
            currentLang = event.target.value;
            localStorage.setItem('facebookLang', currentLang);
            applyTranslations(currentLang);
            loadAndRenderPosts();
        });
    }

    loadAndRenderPosts();
    initSearchFunctionality();
});

setInterval(() => {
    document.querySelectorAll('.comment-time, .post-time').forEach(timeSpan => {
        const timestamp = timeSpan.getAttribute('data-timestamp');
        if (timestamp) {
            timeSpan.textContent = moment(parseInt(timestamp)).fromNow();
        }
    });
}, 60000);