var el = {
    codeShiftInput: document.getElementById('code-shift'),
    sourceTextarea: document.getElementById('source'),
    destinationTextarea: document.getElementById('destination'),
    encodeButton: document.getElementById('encode'),
    decodeButton: document.getElementById('decode')
};

var vocabulars = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz',
    'АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ',
    'абвгдеёжзиклмнопрстуфхцчшщьыъэюя'
];

var encodedVocabulars = [];

var codeShift = 0;

el.codeShiftInput.addEventListener('keyup', codeShiftHandler);
el.codeShiftInput.addEventListener('mouseup', codeShiftHandler);
el.encodeButton.addEventListener('mouseup', encodeHandler);
el.decodeButton.addEventListener('mouseup', decodeHandler);

codeShiftHandler();

function cesarCoder(source, codeShift) {
    var destination = source.split('');
    var sourceVocabulars = codeShift >= 0 ? vocabulars : encodedVocabulars;
    var destinationVocabulars = codeShift >= 0 ? encodedVocabulars : vocabulars;

    destination.forEach(function (val, i) {
        sourceVocabulars.forEach(function (voc, vocId) {
            var index = voc.indexOf(val);
            if (index !== -1) {
                destination[i] = destinationVocabulars[vocId][index];
            }
        });
    });

    return destination.join('');
}

function codeShiftHandler() {
    var value = +el.codeShiftInput.value;
    var correctedValue = isFinite(value) ? value : 0;
    correctedValue = correctedValue < 0 || correctedValue > 9 ? 0 : correctedValue;
    if (correctedValue !== value) {
        el.codeShiftInput.value = correctedValue;
    }
    codeShift = correctedValue;
    vocabulars.forEach(function (voc, vocId) {
        encodedVocabulars[vocId] = voc.substr(codeShift) + voc.substr(0, codeShift);
    });
}

function encodeHandler() {
    el.destinationTextarea.value = cesarCoder(el.sourceTextarea.value, codeShift);
}

function decodeHandler() {
    el.sourceTextarea.value = cesarCoder(el.destinationTextarea.value, -codeShift);
}

