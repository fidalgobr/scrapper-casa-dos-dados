const axios = require('./axios-custom');
const cheerio = require('cheerio');
const save = require('./save');

async function iterate(cnpjObj) {
    let { cnpj } = cnpjObj;

    const url = `https://casadosdados.com.br/solucao/cnpj/${cnpj}`;
    const req = await axios.get(url);

    const html = req.data;

    const $ = cheerio.load(html);
    const seletorTelefone = 'a[href^="tel:"]';
    const seletorEmail = 'a[href^="mailto:"]';

    const regexTelefoneCelular = /(\d{2} 9\d{8}|9\d{7})/g;
    let stringDeTelefones = $(seletorTelefone).text();
    let stringEmail = $(seletorEmail).text();

    let arrayCelulares = stringDeTelefones.match(regexTelefoneCelular);

    let éEmailDeContabilidade = /contabil|consul/gi.test(stringEmail);

    if (éEmailDeContabilidade) {
        console.log('Contato de contabilidade... Pulando.');
    }

    if (!arrayCelulares || éEmailDeContabilidade) return;

    let telefonePreProcessado = arrayCelulares[0];

    if (telefonePreProcessado.length < 6) {
        //mude o DDD pro da sua região
        telefonePreProcessado = '35' + telefonePreProcessado;
    }

    let telefone = '+55' + telefonePreProcessado.trim().replace(' ', '');;
    let email = stringEmail.trim();

    let novaInfo = {
        telefone,
        email
    };

    save(novaInfo, telefone);
}



module.exports = iterate;