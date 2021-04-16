# Cosmos Block Results Decoder

Fetch the Tendermint `block_results` API and base64 decode all the events key-value attributes for better readability

### Example

```bash
$ node block-results-decoder.js "https://mainnet.crypto.org:26657/block_results?height=10000"
```

Format the result with `jq` (requires installation)

```bash
$ node block-results-decoder.js "https://mainnet.crypto.org:26657/block_results?height=10000" | jq
```