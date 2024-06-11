const axios = require('./axios-custom');
const iterate = require('./iterate');
//edite a query no arquivo query.json
const query = require('./query.json');

async function request(page) {
    let data = query;

    data.page = page;

    return await axios.post('https://api.casadosdados.com.br/v2/public/cnpj/search', data);
}

async function main() {
    //50 é o limite
    for (let i = 1; i <= 50; i++) {
        console.log(`Iterando página ${i}\n`);

        let req = await request(i);

        let { cnpj: listaCnpj } = req.data.data;

        if (!listaCnpj) break;

        for (let cnpj of listaCnpj) {
            let numErros = 0;

            try {
                await iterate(cnpj);
            } catch (e) {
                console.error(e);
                while (numErros < 2) {
                    try {
                        await iterate(cnpj);
                        break;
                    } catch (e) {
                        numErros++;
                    }
                }
            }
        }
    }
}

main();