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
    }
];

const songDedications = [
    {
        title: "Ebenesarae",
        vibe: "Thanksgiving opener",
        note: "Start with grateful hearts: Papa’s life is a testimony of God’s help until today."
    },
    {
        title: "Uyar Malaiyo",
        vibe: "Faith anthem",
        note: "A strong celebration moment for saying no mountain is bigger than God’s grace."
    },
    {
        title: "Asaathiyangal",
        vibe: "Miracle mood",
        note: "Dedicate this when the family prays for impossible doors to open in Papa’s new year."
    },
    {
        title: "Dhayavu",
        vibe: "Grace melody",
        note: "A soft, thankful song choice for remembering God’s kindness over Papa and the family."
    },
    {
        title: "Kaivida Maatar",
        vibe: "Comfort chorus",
        note: "Perfect for a blessing moment: God will not leave Papa in any season."
    },
    {
        title: "Jeba Geetham",
        vibe: "Prayer finale",
        note: "Close the birthday prayer with worship, then shout, “Happy birthday EJ Papa!”"
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
    }
];

const wishOpeners = [
    "Papa, John Jebaraj playlist போல உங்கள் faith repeat mode-ல ஓடட்டும்",
    "Papa, உங்கள் சிரிப்பு எங்கள் வீட்டின் sunrise",
    "EJ Papa, your faith makes ordinary days feel blessed",
    "அன்பான Papa, உங்கள் அன்பு எங்களுக்கு ஒரு living Bible lesson",
    "Papa, today heaven hears our loudest thank-you prayer"
];

const wishMiddles = [
    "so let worship, cake, and Tamil Bible blessings fill the hall",
    "so may this birthday overflow with grace",
    "and may every step be covered by God’s protection",
    "with cake, hugs, photos, and a thousand happy memories",
    "while joy, health, and peace follow you like a beautiful song"
];

const wishEndings = [
    "Amen சொல்லும் முன்பே cake வெட்ட ready!",
    "இனிய பிறந்தநாள் வாழ்த்துகள்!",
    "Happy birthday, our family hero!",
    "God bless you more and more, Amen!",
    "We love you bigger than the birthday cake!"
];

const blessingWords = ["Grace", "Joy", "Peace", "Strength", "Health", "Favor", "Wisdom", "சமாதானம்", "ஆசீர்வாதம்", "தயவு", "ஜெபம்", "ஸ்தோத்திரம்"];

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
    surpriseSongBtn: document.getElementById("surpriseSongBtn"),
    songGrid: document.getElementById("songGrid"),
    songTitle: document.getElementById("songTitle"),
    songMood: document.getElementById("songMood"),
    celebrateBtn: document.getElementById("celebrateBtn"),
    confettiLayer: document.getElementById("confettiLayer"),
    generateWishBtn: document.getElementById("generateWishBtn"),
    generatedWish: document.getElementById("generatedWish"),
    spinBlessingBtn: document.getElementById("spinBlessingBtn"),
    blessingWord: document.getElementById("blessingWord"),
    memoryForm: document.getElementById("memoryForm"),
    memoryList: document.getElementById("memoryList"),
    resetNotesBtn: document.getElementById("resetNotesBtn")
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

function setFeaturedSong(song = songDedications[0]) {
    elements.songTitle.textContent = song.title;
    elements.songMood.textContent = `${song.vibe}: ${song.note}`;
}

function renderSongs() {
    elements.songGrid.innerHTML = songDedications.map(song => `
        <article class="song-card">
            <span aria-hidden="true">🎧</span>
            <p class="eyebrow">${escapeHtml(song.vibe)}</p>
            <h3>${escapeHtml(song.title)}</h3>
            <p>${escapeHtml(song.note)}</p>
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
elements.surpriseSongBtn.addEventListener("click", () => {
    setFeaturedSong(randomItem(songDedications));
    throwConfetti();
});
elements.celebrateBtn.addEventListener("click", throwConfetti);
elements.generateWishBtn.addEventListener("click", generateWish);
elements.spinBlessingBtn.addEventListener("click", () => {
    elements.blessingWord.textContent = randomItem(blessingWords);
    throwConfetti();
});
elements.memoryForm.addEventListener("submit", addNote);
elements.resetNotesBtn.addEventListener("click", resetNotes);

renderBlessings();
renderSongs();
setFeaturedSong();
renderVerses();
renderNotes();
