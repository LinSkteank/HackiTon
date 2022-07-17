const cools = [
    "Fire is an expression of life on Earth and an index of life’s history",
    "Although humans and fire have always coexisted, our capacity to manage fire remains imperfect and may become more difficult in the future as climate change alters fire regimes",
    "Some of the global patterns that appear in the fire maps over time are the result of natural cycles of rainfall, dryness, and lightning",
    "Fire is a worldwide phenomenon that appears in the geological record soon after the appearance of terrestrial plants",
    "Vicious circle of fire Deforestation, climate change and fire risk are linked to each other"
];


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderCoolPhrase() {
    let paragraph = document.getElementById("text");
    let newPhrase = cools[getRandomInt(0, cools.length - 1)];
    paragraph.innerHTML = newPhrase;

    if (selctItem) {
        let data = document.getElementById("data");
        let dataText = "Fires count: " + selctItem.count + ", ";
        dataText += "power of fire: " + selctItem.frp.toFixed(2);
        data.innerHTML = dataText;
    }
}

renderCoolPhrase();