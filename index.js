const axios = require('./axios-custom');
const iterate = require('./iterate');
//edite a query no arquivo query.json
const query = require('./query.json');

async function request(page) {
    //alguns desses headers podem não serem aceitos pelo navegador, se você rodar isso aqui como um userscript ou extensão
    const headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0',
        'Accept': 'application/json',
        'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Referer': 'https://casadosdados.com.br/',
        'Content-Type': 'application/json',
        'Origin': 'https://casadosdados.com.br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Priority': 'u=1',
        'TE': 'trailers'
    };

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