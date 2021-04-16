const http = require('http');
const https = require('https');

(async () => {
    try {
        const url = process.argv[2];

        const block_results = JSON.parse(await request(url));
        if (!!block_results.result.txs_results) {
            block_results.result.txs_results = block_results.result.txs_results.map(tx_result => {
                tx_result.events = decodeEvents(tx_result.events);
                return tx_result;
            });
        }
        block_results.result.begin_block_events = decodeEvents(block_results.result.begin_block_events);
        block_results.result.end_block_events = decodeEvents(block_results.result.end_block_events);

        console.log(JSON.stringify(block_results));
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