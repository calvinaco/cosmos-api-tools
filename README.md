# Cosmos Events Decoder

- Tendermint `/block_results` API
- Cosmos RESTful `/cosmos/tx/v1beta1/txs` API

Fetch result from the APIs and base64 decode all the events key-value attributes for better readability

## Example

### Tendermint `/block_results` API

```bash
$ node block-results-decoder.js "https://mainnet.crypto.org:26657/block_results?height=10000"
```

Format the result with `jq` (requires installation)

```bash
$ node block-results-decoder.js "https://mainnet.crypto.org:26657/block_results?height=10000" | jq
```

### Cosmos RESTful `/cosmos/tx/v1beta1/txs` API

```bash
$ node cosmos-tx-v1beta1-txs-decoder.js "https://cronos-testnet-3.crypto.org:1317/cosmos/tx/v1beta1/txs/013B404CD2A17488EF88FC8D118B8972F3DFB2AC868BCD65AF6F177331ECFF0C"
```
