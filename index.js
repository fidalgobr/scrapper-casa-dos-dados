const axios = require('./axios-custom');
const iterate = require('./iterate');
//edite a query no arquivo query.json
const query = require('./query.json');

async function request(page) {
    let data = query;

    data.page = page;

    return await axios.post('https://api.casadosdados.com.br/v2/public/cnpj/search', data, {
        headers
    });
}

async function main() {
    for (let i = 1; true; i++) {
        console.log(`Iterando página ${i}\n`);

        let req = await request(i);

        let { cnpj: listaCnpj } = req.data.data;

        if (!listaCnpj) break;

        for (let cnpj of listaCnpj) {
            await iterate(cnpj);
        }
    }
}

main();