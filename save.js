const { writeFileSync, readFileSync, existsSync } = require('fs');
const path = require('path');

function save(novaInfo, telefone) {
    console.log(`Salvando ${telefone}...`);

    const caminhoPlanilha = path.join(__dirname, 'planilha.csv');

    let planilhaJaExiste = existsSync(caminhoPlanilha);

    let planilhaAntiga = planilhaJaExiste ? readFileSync(caminhoPlanilha, { encoding: 'utf8' }) : 'email, phone';

    let planilhaNova = planilhaAntiga + `\n${novaInfo.email},${novaInfo.telefone}`;

    writeFileSync(caminhoPlanilha, planilhaNova, { encoding: 'utf8' });
}

module.exports = save;