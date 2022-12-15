const http = require('http');
const https = require('https');

(async () => {
    try {
        const url = process.argv[2];

        const txs = JSON.parse(await request(url));
        if (!!txs.tx_responses) {
            txs.tx_responses = txs.tx_responses.map(tx_response => {
                tx_response.events = decodeEvents(tx_response.events);
                return tx_response;
            })
        }
        if (!!txs.tx_response) {
            txs.tx_response.events = decodeEvents(txs.tx_response.events);
        }

        console.log(JSON.stringify(txs, null, 2));
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
})();

const decodeEvents = events => {
    if (!events) {
        return events;
    }
    return events.map(event => {
        event.attributes = event.attributes.map(attribute => {
            return {
                ...attribute,
                key: (Buffer.from(attribute.key, 'base64')).toString(),
                value: attribute.value? (Buffer.from(attribute.value, 'base64')).toString(): "",
            }
        })
        return event;
    })
}

async function request(url) {
    let lib = http;
    if (url.startsWith('https')) {
        lib = https;
    }
    return new Promise((resolve, reject) => {
        lib.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
}