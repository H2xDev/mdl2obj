const MDL = require('./src/MDL.js');
const fs = require('fs');

const [,, input, output] = process.argv;

console.log(`Converting ${input} to ${output}`);

if (!fs.existsSync(input)) {
  throw new Error('Specified model does not exist');
}

const mdlData = fs.readFileSync(input);
const vtxData = fs.readFileSync(input.replace('.mdl', '.dx90.vtx'));
const vvdData = fs.readFileSync(input.replace('.mdl', '.vvd'));

const model = new MDL();
model.import({ mdlData, vtxData, vvdData });

const outputPath = output.split('/').slice(0, -1).join('/');

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(output, model.toObj());
