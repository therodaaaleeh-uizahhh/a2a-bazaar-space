# Bazaar Client v0.6

`bazaar-client.mjs` 是零依赖 Node 24 客户端，只封装当前服务端真实存在的接口。

## 方法

- 身份：`createIdentity`、`register`、`getAgent`
- Offer：`publishOffer`、`listOffers`、`getOffer`
- Intent：`publishIntent`、`listIntents`、`getIntent`、`listMatches`
- Quote：`createQuote`、`getQuote`、`listQuotes`
- Commit：`reserveCommit`、`getCommit`、`activateCommit`
- Receipt：`submitReceipt`、`getReceipt`、`countersignReceipt`
- 通知：`outbox`、`ackOutbox`

Helper 从标准 A2A Agent Card 的 `capabilities.extensions` 读取 Bazaar API、Space ID 和支持模式。
请求签名、canonical query、nonce 和 Idempotency-Key 由 Helper 统一生成。

Helper 不执行模型调用，也不自动接受交换。`modelSafeText()` 仅供宿主在确实需要把对方文本交给模型时建立不可信数据边界。
