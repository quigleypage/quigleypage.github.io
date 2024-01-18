const keyboardMapping = {
    "`": "01",
    "s": "02",
    "P": "03",
    "D": "04",
    "R": "05",
    "l": "06",
    "p": "07",
    "%": "08",
    "=": "09",
    "e": "10",
    "b": "11",
    '"': "12",
    "@": "13",
    "$": "14",
    "Y": "15",
    "B": "16",
    "^": "17",
    "3": "18",
    "\\": "19",
    "&": "20",
    "-": "21",
    "}": "22",
    "Z": "23",
    "K": "24",
    "m": "25",
    "k": "26",
    "E": "27",
    "w": "28",
    "t": "29",
    "n": "30",
    "_": "31",
    "!": "32",
    "H": "33",
    "u": "34",
    "d": "35",
    "y": "36",
    "#": "37",
    "2": "38",
    "X": "39",
    "1": "40",
    ")": "41",
    "r": "42",
    "~": "43",
    "v": "44",
    ";": "45",
    "4": "46",
    "G": "47",
    "c": "48",
    "h": "49",
    "?": "50",
    "": "51",
    "J": "52",
    "j": "53",
    "(": "54",
    "V": "55",
    "a": "56",
    "f": "57",
    "q": "58",
    "{": "59",
    "F": "60",
    "A": "61",
    "0": "62",
    ",": "63",
    "+": "64",
    "O": "65",
    "L": "66",
    "M": "67",
    "g": "68",
    "W": "69",
    "7": "70",
    "8": "71",
    "T": "72",
    "/": "73",
    ".": "74",
    "i": "75",
    "S": "76",
    "6": "77",
    "9": "78",
    "Q": "79",
    "]": "80",
    "N": "81",
    ">": "82",
    "[": "83",
    "I": "84",
    "*": "85",
    "C": "86",
    "|": "87",
    "x": "88",
    "5": "89",
    "o": "90",
    ":": "91",
    "<": "92",
    "z": "93",
    "U": "94",
};

// Create the inverse mapping for decryption
const inverseKeyboardMapping = {};
for (const char in keyboardMapping) {
    inverseKeyboardMapping[keyboardMapping[char]] = char;
}

function encrypt(u){
    unencryptedTerm  = u;
    let encryptedResult = "";
    for (let i = 0; i < unencryptedTerm.length; i++) {
        const char2 = unencryptedTerm[i];
        if (keyboardMapping[char2]) {
            encryptedResult += keyboardMapping[char2];
        } 
        else {
            // Handle characters not in the mapping (e.g., whitespace)
            encryptedResult += "XX"; // Replace with your preferred handling
        }
    }
    console.log("Encrypted term:", encryptedResult);
    return encryptedResult;
}

function decrypt(e){
    const encryptedTerm = e;
    let decryptedResult = "";
    for (let i = 0; i < encryptedTerm.length; i += 2) {
        const code = encryptedTerm.slice(i, i + 2);
        if (inverseKeyboardMapping[code]) {
            decryptedResult += inverseKeyboardMapping[code];
        } else {
            // Handle unmapped codes (e.g., "XX")
            decryptedResult += "";
        }
    }
    console.log("Decrypted term:", decryptedResult);
    return decryptedResult;
}