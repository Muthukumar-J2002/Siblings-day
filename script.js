const NOTES_KEY = "ejPapaBirthdayNotes";

const blessings = [
    {
        category: "tamil",
        icon: "🌿",
        title: "தமிழ் அன்பு வாழ்த்து",
        text: "Papa, உங்கள் வாழ்க்கை எங்களுக்கு தேவன் கொடுத்த அழகான பரிசு. இனிய பிறந்தநாள் வாழ்த்துகள்!"
    },
    {
        category: "bible",
        icon: "📖",
        title: "Grace blessing",
        text: "May the Lord guide every step, protect every plan, and fill this new year with peace."
    },
    {
        category: "fun",
        icon: "🎂",
        title: "Cake commandment",
        text: "Birthday rule: Papa gets the first cake piece, the loudest clap, and unlimited family hugs."
    },
    {
        category: "tamil",
        icon: "💛",
        title: "இதயம் நிறைந்த வாழ்த்து",
        text: "இன்று உங்கள் சிரிப்பு வீட்டையே ஒளிரச் செய்யட்டும்; உங்கள் கனவுகள் எல்லாம் ஆசீர்வாதமாக மலரட்டும்."
    },
    {
        category: "bible",
        icon: "🕊️",
        title: "Peace prayer",
        text: "Papa, may God’s peace guard your heart and make your birthday year gentle, strong, and joyful."
    },
    {
        category: "fun",
        icon: "🥳",
        title: "Family headline",
        text: "Breaking news: EJ Papa is officially older, wiser, cooler, and still everyone’s favorite hero."
    },
    {
        category: "bible",
        icon: "✝️",
        title: "Jesus covering",
        text: "இயேசுவின் அன்பு Papa-வின் வீட்டையும், வழியையும், எண்ணங்களையும் ஒளியாய் நடத்தட்டும்."
    },
    {
        category: "tamil",
        icon: "🎁",
        title: "புது வருட கிருபை",
        text: "இந்த புதிய வயதில் ஒவ்வொரு நாளும் புதிய கிருபை, புதிய பெலன், புதிய சாட்சி உண்டாகட்டும்."
    },
    {
        category: "fun",
        icon: "🎵",
        title: "Worship birthday mood",
        text: "Cake cut பண்ணும் முன் worship volume உயரட்டும்; Papa-வின் birthday praise party ஆரம்பம்!"
    }
];

const verses = [
    {
        reference: "Numbers 6:24-26",
        tamil: "கர்த்தர் உங்களை ஆசீர்வதித்து காக்கிறார்.",
        english: "A birthday blessing of protection, favor, and peace over Papa."
    },
    {
        reference: "Psalm 20:4",
        tamil: "உங்கள் இதய வாஞ்சைகளை தேவன் நிறைவேற்றுவாராக.",
        english: "May God shape Papa’s dreams into beautiful answers."
    },
    {
        reference: "3 John 1:2",
        tamil: "ஆத்துமா செழிப்பதுபோல் ஆரோக்கியமும் செழிப்பும் உண்டாவதாக.",
        english: "A prayer for strong health, inner joy, and steady blessing."
    },
    {
        reference: "Psalm 91:11",
        tamil: "அவர் தமது தூதர்களுக்கு உங்களை காக்க கட்டளையிடுகிறார்.",
        english: "May heaven’s care surround Papa in every journey."
    },
    {
        reference: "Proverbs 20:7",
        tamil: "நேர்மையாய் நடக்கும் தந்தையின் பிள்ளைகள் பாக்கியவான்கள்.",
        english: "Papa’s faithful life becomes a blessing to the family."
    },
    {
        reference: "Isaiah 46:4",
        tamil: "முடிவுவரை நான் உங்களைத் தாங்குவேன் என்று கர்த்தர் சொல்கிறார்.",
        english: "God’s sustaining love is Papa’s strength in every season."
    },
    {
        reference: "Psalm 23:1",
        tamil: "கர்த்தர் என் மேய்ப்பர்; எனக்குக் குறைவில்லை.",
        english: "May Papa lack no good thing under the Shepherd’s care."
    },
    {
        reference: "Jeremiah 29:11",
        tamil: "நன்மையான எதிர்காலத்தையும் நம்பிக்கையையும் தேவன் தருகிறார்.",
        english: "A promise of hope-filled days and peaceful plans."
    },
    {
        reference: "Philippians 4:13",
        tamil: "கிறிஸ்துவினாலே எல்லாவற்றையும் செய்ய பெலன் கிடைக்கிறது.",
        english: "Christ gives Papa strength for every responsibility."
    },
    {
        reference: "Psalm 121:7-8",
        tamil: "கர்த்தர் உங்கள் போக்கும் வரத்தையும் காக்கிறார்.",
        english: "God watches over Papa’s going out and coming in."
    },
    {
        reference: "Isaiah 40:31",
        tamil: "கர்த்தரை நம்புகிறவர்கள் புதிய பெலன் அடைவார்கள்.",
        english: "May Papa rise with renewed strength and courage."
    },
    {
        reference: "Romans 15:13",
        tamil: "நம்பிக்கையின் தேவன் சந்தோஷத்தாலும் சமாதானத்தாலும் நிரப்பட்டும்.",
        english: "May joy, peace, and hope overflow in Papa’s heart."
    },
    {
        reference: "Psalm 118:24",
        tamil: "இது கர்த்தர் உண்டாக்கின நாள்; இதில் களிகூருவோம்.",
        english: "This birthday is a day to rejoice and give thanks."
    },
    {
        reference: "Deuteronomy 28:6",
        tamil: "உள்ளே வரும்போதும் வெளியே போகும்போதும் ஆசீர்வாதம் உண்டாகும்.",
        english: "May blessing follow Papa in every place."
    }
];

const wishOpeners = [
    "Papa, உங்கள் சிரிப்பு எங்கள் வீட்டின் sunrise",
    "EJ Papa, your faith makes ordinary days feel blessed",
    "அன்பான Papa, உங்கள் அன்பு எங்களுக்கு ஒரு living Bible lesson",
    "Papa, today heaven hears our loudest thank-you prayer"
];

const wishMiddles = [
    "so may this birthday overflow with grace",
    "and may every step be covered by God’s protection",
    "with cake, hugs, photos, and a thousand happy memories",
    "while joy, health, and peace follow you like a beautiful song"
];

const wishEndings = [
    "இனிய பிறந்தநாள் வாழ்த்துகள்!",
    "Happy birthday, our family hero!",
    "God bless you more and more, Amen!",
    "We love you bigger than the birthday cake!"
];

const worshipSongs = [
    {
        title: "John Jebaraj - Idhuvarai Nadathi praise mood",
        mood: "A joyful song idea for claps, smiles, and a powerful birthday praise opening.",
        query: "John Jebaraj Idhuvarai Nadathi"
    },
    {
        title: "John Jebaraj - Oruvarum Saera worship",
        mood: "A soft worship moment while the family prays over EJ Papa.",
        query: "John Jebaraj Oruvarum Saera"
    },
    {
        title: "John Jebaraj - Nandri Solli thanksgiving",
        mood: "A thank-you-to-Jesus mood for Papa’s life, protection, and family testimony.",
        query: "John Jebaraj Nandri Solli"
    },
    {
        title: "John Jebaraj - Tamil Christian birthday praise",
        mood: "A custom playlist search to keep the celebration worshipful and energetic.",
        query: "John Jebaraj Tamil Christian worship birthday"
    }
];

const tamilBibleWords = [
    "கிருபை", "சமாதானம்", "ஜெயம்", "பெலன்", "சுகம்", "நம்பிக்கை", "வாக்குத்தத்தம்", "ஆசீர்வாதம்", "ஞானம்", "கருணை", "ஒளி", "இரக்கம்"
];

const blessingWords = ["Grace", "Joy", "Peace", "Strength", "Health", "Favor", "Wisdom", "சமாதானம்", "ஆசீர்வாதம்", "கிருபை", "ஜெயம்", "பெலன்"];

let selectedFilter = "all";
let notes = loadNotes();

const elements = {
    navToggle: document.getElementById("navToggle"),
    navLinks: document.getElementById("navLinks"),
    blessingGrid: document.getElementById("blessingGrid"),
    filterChips: document.querySelectorAll(".filter-chip"),
    featuredVerse: document.getElementById("featuredVerse"),
    verseGrid: document.getElementById("verseGrid"),
    shuffleVerseBtn: document.getElementById("shuffleVerseBtn"),
    celebrateBtn: document.getElementById("celebrateBtn"),
    confettiLayer: document.getElementById("confettiLayer"),
    generateWishBtn: document.getElementById("generateWishBtn"),
    generatedWish: document.getElementById("generatedWish"),
    spinBlessingBtn: document.getElementById("spinBlessingBtn"),
    blessingWord: document.getElementById("blessingWord"),
    memoryForm: document.getElementById("memoryForm"),
    memoryList: document.getElementById("memoryList"),
    resetNotesBtn: document.getElementById("resetNotesBtn"),
    songGrid: document.getElementById("songGrid"),
    songTitle: document.getElementById("songTitle"),
    songMood: document.getElementById("songMood"),
    songSearchLink: document.getElementById("songSearchLink"),
    surpriseSongBtn: document.getElementById("surpriseSongBtn"),
    tamilWordCloud: document.getElementById("tamilWordCloud")
};

function loadNotes() {
    const savedNotes = localStorage.getItem(NOTES_KEY);
    return savedNotes ? JSON.parse(savedNotes) : [
        {
            name: "Family",
            message: "Papa, thank you for your prayers, jokes, guidance, and constant love. God bless your new year!"
        },
        {
            name: "Birthday Team",
            message: "இன்று சந்தோஷம், நாளை ஆசீர்வாதம், இந்த வருடம் முழுவதும் தேவனுடைய கிருபை உங்களோடு இருக்கட்டும்."
        }
    ];
}

function saveNotes() {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function renderBlessings() {
    const visibleBlessings = selectedFilter === "all"
        ? blessings
        : blessings.filter(blessing => blessing.category === selectedFilter);

    elements.blessingGrid.innerHTML = visibleBlessings.map(blessing => `
        <article class="blessing-card ${escapeHtml(blessing.category)}">
            <span class="card-icon" aria-hidden="true">${escapeHtml(blessing.icon)}</span>
            <p class="eyebrow">${escapeHtml(blessing.category)}</p>
            <h3>${escapeHtml(blessing.title)}</h3>
            <p>${escapeHtml(blessing.text)}</p>
        </article>
    `).join("");
}

function renderVerses(featured = verses[0]) {
    elements.featuredVerse.innerHTML = `
        <p class="verse-ref">${escapeHtml(featured.reference)}</p>
        <h3>${escapeHtml(featured.tamil)}</h3>
        <p>${escapeHtml(featured.english)}</p>
    `;

    elements.verseGrid.innerHTML = verses.map(verse => `
        <article class="verse-card">
            <strong>${escapeHtml(verse.reference)}</strong>
            <p>${escapeHtml(verse.tamil)}</p>
            <span>${escapeHtml(verse.english)}</span>
        </article>
    `).join("");
}

function generateWish() {
    elements.generatedWish.textContent = `${randomItem(wishOpeners)} ${randomItem(wishMiddles)}. ${randomItem(wishEndings)}`;
}

function renderSongs() {
    elements.songGrid.innerHTML = worshipSongs.map((song, index) => `
        <button class="song-card" type="button" data-song-index="${index}">
            <span class="song-number">0${index + 1}</span>
            <strong>${escapeHtml(song.title)}</strong>
            <small>${escapeHtml(song.mood)}</small>
        </button>
    `).join("");
}

function selectSong(song) {
    elements.songTitle.textContent = song.title;
    elements.songMood.textContent = song.mood;
    elements.songSearchLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.query)}`;
    throwConfetti();
}

function renderTamilWords() {
    elements.tamilWordCloud.innerHTML = tamilBibleWords.map((word, index) => `
        <span style="--delay: ${index * 0.08}s">${escapeHtml(word)}</span>
    `).join("");
}

function renderNotes() {
    elements.memoryList.innerHTML = notes.map(note => `
        <article class="memory-note">
            <span>💌</span>
            <div>
                <h3>${escapeHtml(note.name)}</h3>
                <p>${escapeHtml(note.message)}</p>
            </div>
        </article>
    `).join("");
}

function addNote(event) {
    event.preventDefault();
    const nameInput = document.getElementById("memoryName");
    const messageInput = document.getElementById("memoryMessage");
    const note = {
        name: nameInput.value.trim(),
        message: messageInput.value.trim()
    };

    if (!note.name || !note.message) return;

    notes.unshift(note);
    saveNotes();
    renderNotes();
    elements.memoryForm.reset();
}

function resetNotes() {
    localStorage.removeItem(NOTES_KEY);
    notes = loadNotes();
    renderNotes();
}

function throwConfetti() {
    const confettiIcons = ["🎉", "🎂", "✨", "💛", "📖", "🎈", "🙌"];

    for (let index = 0; index < 36; index += 1) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.textContent = randomItem(confettiIcons);
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
        elements.confettiLayer.appendChild(piece);
        window.setTimeout(() => piece.remove(), 2600);
    }
}

elements.navToggle.addEventListener("click", () => {
    const isOpen = elements.navLinks.classList.toggle("open");
    elements.navToggle.setAttribute("aria-expanded", isOpen.toString());
});

elements.navLinks.addEventListener("click", event => {
    if (event.target.tagName === "A") {
        elements.navLinks.classList.remove("open");
        elements.navToggle.setAttribute("aria-expanded", "false");
    }
});

elements.filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
        selectedFilter = chip.dataset.filter;
        elements.filterChips.forEach(item => item.classList.toggle("active", item === chip));
        renderBlessings();
    });
});

elements.shuffleVerseBtn.addEventListener("click", () => renderVerses(randomItem(verses)));
elements.celebrateBtn.addEventListener("click", throwConfetti);
elements.generateWishBtn.addEventListener("click", generateWish);
elements.songGrid.addEventListener("click", event => {
    const songCard = event.target.closest(".song-card");
    if (!songCard) return;
    selectSong(worshipSongs[Number(songCard.dataset.songIndex)]);
});
elements.surpriseSongBtn.addEventListener("click", () => selectSong(randomItem(worshipSongs)));
elements.spinBlessingBtn.addEventListener("click", () => {
    elements.blessingWord.textContent = randomItem(blessingWords);
    throwConfetti();
});
elements.memoryForm.addEventListener("submit", addNote);
elements.resetNotesBtn.addEventListener("click", resetNotes);

renderBlessings();
renderVerses();
renderSongs();
renderTamilWords();
renderNotes();
