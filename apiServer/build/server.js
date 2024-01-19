"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const port = 3000;
// allow any connection from the same domain/subdomain
const options = {
    // host: '192.168.0.101',
    // port: 3000,
    cors: {
        origin: '*'
    }
};
// const io = new SocketServer(3000, options);
const io = new socket_io_1.Server(server, options);
let lines = {};
let lineHistory = [];
io.on('connection', (socket) => {
    console.log('A user connected');
    // emit the lines object to the connected client
    // the event name should be 'lines'
    // the data should be the lines object
    socket.emit('all-results', lines);
    socket.emit('all-history', lineHistory);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('reset-data', () => {
        lines = {};
        lineHistory = [];
        createDefaultEntries();
        io.emit('all-results', lines);
        io.emit('all-history', lineHistory);
    });
});
let keyWhitelist = new Set();
let values = [];
{
    const keyTranslationPairs = [
        { key: "Role model", translationEng: "Role model", translationNL: "Rolmodel" },
        { key: "Reflection", translationEng: "Reflection", translationNL: "Reflectie" },
        { key: "Interaction", translationEng: "Interaction", translationNL: "Interactie" },
        { key: "Accessibility", translationEng: "Accessibility", translationNL: "Toegankelijkheid" },
        { key: "Support structures", translationEng: "Support structures", translationNL: "Ondersteuningsstructuren" },
        { key: "Flexible and coherent programme", translationEng: "Flexible and coherent programme", translationNL: "Flexibel en samenhangend programma" },
        { key: "Feedback", translationEng: "Feedback", translationNL: "Feedback" },
        { key: "Peerfeedback", translationEng: "Peerfeedback", translationNL: "Peerfeedback" },
        { key: "Collaborative learning", translationEng: "Collaborative learning", translationNL: "Samenwerkend leren" },
        { key: "HZ wide activities", translationEng: "HZ wide activities", translationNL: "HZ-Brede activiteiten" },
        { key: "Collaboration with practice and research partners", translationEng: "Collaboration with practice and research partners", translationNL: "Samenwerking met praktijk- en onderzoekspartners" },
        { key: "Professional skills in context", translationEng: "Professional skills in context", translationNL: "Vaardigheden van het beroep in context" },
        { key: "Across boundaries of the own discipline", translationEng: "Across boundaries of the own discipline", translationNL: "Over de grenzen van de eigen discipline" },
        { key: "The teacher as professional", translationEng: "The teacher as professional", translationNL: "Docent als vakmens" },
        { key: "The teacher as coach", translationEng: "The teacher as coach", translationNL: "Docent als coach" },
        { key: "Ethical conduct", translationEng: "Ethical conduct", translationNL: "Ethisch handelen" },
        { key: "Expressing values and norms", translationEng: "Expressing values and norms", translationNL: "Waarden en normen uitdragen" },
        { key: "Connecting to prior knowledge and perception", translationEng: "Connecting to prior knowledge and perception", translationNL: "Aansluiten bij voorkennis en belevingswereld" },
        { key: "Professional profile", translationEng: "Professional profile", translationNL: "Beroepsbeeld" },
        { key: "Structure and clear expectations", translationEng: "Structure and clear expectations", translationNL: "Structuur en heldere verwachtingen" },
        { key: "Coherent assessment programme", translationEng: "Coherent assessment programme", translationNL: "Samenhangend toetsprogramma" },
        { key: "Vision on professional competence", translationEng: "Vision on professional competence", translationNL: "Visie op beroepsbekwaamheid" },
        { key: "Working on resilience", translationEng: "Working on resilience", translationNL: "Werken aan weerbaarheid" },
        { key: "Safety net", translationEng: "Safety net", translationNL: "Vangnet" },
        { key: "An eye for the individual", translationEng: "An eye for the individual", translationNL: "Oog voor het individu" },
        { key: "Learning from mistakes", translationEng: "Learning from mistakes", translationNL: "Leren van fouten" },
        { key: "Individual study pace", translationEng: "Individual study pace", translationNL: "Individueel studietempo" },
        { key: "Room for autonomy", translationEng: "Room for autonomy", translationNL: "Ruimte voor autonomie" },
        { key: "Room for spontaneity", translationEng: "Room for spontaneity", translationNL: "Ruimte voor spontaniteit" },
        { key: "Strong knowledge base", translationEng: "Strong knowledge base", translationNL: "Sterke kennisbasis" },
        { key: "Choices", translationEng: "Choices", translationNL: "Keuzemogelijkheden" },
    ];
    values = keyTranslationPairs.map((value) => { return value.key; });
    keyWhitelist = new Set(values);
}
// take the values from the array and put them in lineHistory and Lines
// generate a random number between 40 and 100
// take that number and loop through the array that many times
function createDefaultEntries() {
    values.forEach((key) => {
        lines[key] = 0;
    });
}
createDefaultEntries();
let random = 0;
if (process.argv[2] === 'test') {
    random = Math.floor(Math.random() * (100 - 40 + 1) + 40);
    for (let i = 0; i < random; i++) {
        const line1 = values[Math.floor(Math.random() * values.length)];
        const line2 = values[Math.floor(Math.random() * values.length)];
        const line3 = values[Math.floor(Math.random() * values.length)];
        const lineInput = { line1, line2, line3, timeStamp: Date.now() };
        lineHistory = [...lineHistory, lineInput];
        pushLineToLines(line1);
        pushLineToLines(line2);
        pushLineToLines(line3);
    }
}
// store the lines in memory, keep track how many times a specific line exists
function checkInput(input) {
    // check if the input string exists within the keyWhitelist Set
    if (keyWhitelist.has(input)) {
        return input;
    }
    return "";
}
app.post('/api/post-results', (req, res) => {
    // get the lines from the request body the body is json
    let { line1, line2, line3 } = req.body;
    // check if the lines are strings
    if (typeof line1 !== 'string' || typeof line2 !== 'string' || typeof line3 !== 'string') {
        res.status(400).send('Bad request');
        return;
    }
    console.log(req.body);
    // push the lines to the lines object
    line1 = checkInput(line1);
    line2 = checkInput(line2);
    line3 = checkInput(line3);
    pushLineToLines(line1);
    pushLineToLines(line2);
    pushLineToLines(line3);
    // push the lines to the lineHistory array
    const lineInput = { line1, line2, line3, timeStamp: Date.now() };
    lineHistory = [...lineHistory, lineInput];
    console.log(lineInput);
    io.emit('new-line', lineInput);
    res.send('ok');
});
app.get('/api/test', (req, res) => {
    const data = {
        status: "working wow",
    };
    res.send(data);
});
function pushLineToLines(line) {
    if (line.trim() === '')
        return;
    if (lines[line] === undefined) {
        lines[line] = 1;
    }
    else {
        lines[line]++;
    }
    return;
    console.log(null);
}
// expose the servers to the outside world
server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
console.log(`Socket.io server is running on port ${port}`);
