const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();
    
    if (inpWord === "") {
        result.innerHTML = `<h3>Please enter a word!</h3>`;
        return;
    }

    fetch(`${url}${inpWord}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Word not found");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const wordData = data[0];

            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${wordData.meanings[0]?.partOfSpeech || "N/A"}</p>
                    <p>/${wordData.phonetic || "No phonetics available"}/</p>
                </div>
                <p class="word-meaning">
                    ${wordData.meanings[0]?.definitions[0]?.definition || "No definition available"}
                </p>
                <p class="word-example">
                    ${wordData.meanings[0]?.definitions[0]?.example || "No example available"}
                </p>
            `;

            // Get the first available audio pronunciation
            const audioSrc = wordData.phonetics.find(p => p.audio)?.audio;
            if (audioSrc) {
                sound.setAttribute("src", audioSrc);
            } else {
                sound.removeAttribute("src");
            }
        })
        .catch((error) => {
            console.error(error);
            result.innerHTML = `<h3>Couldn't Find The Word</h3>`;
        });
});

function playSound() {
    if (sound.src) {
        sound.play();
    } else {
        alert("No audio available for this word.");
    }
}
