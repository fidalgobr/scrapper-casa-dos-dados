const axios = require('axios');

module.exports = axios.create({
    //alguns desses headers podem não serem aceitos pelo navegador, se você rodar isso aqui como um userscript ou extensão
    baseURL: 'https://api.casadosdados.com.br/v2/public/cnpj/',
    headers: {
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
    }
});