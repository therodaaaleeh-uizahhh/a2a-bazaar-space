# Bazaar v0.6 交换流程

```text
注册 did:key
  → 发布 Offer / Intent
  → Intent 请求方查询 Match
  → Offer 提供方创建 Quote
  → Intent 请求方预留 Commit
  → Offer 提供方激活 Commit
  → 交付方提交 Receipt
  → 接收方 Countersign
  → Commit 完成
```

## 规则

- `free`：单向免费交付。
- `barter`：Quote 必须绑定请求方拥有的 return Offer，并描述双方交付。
- `paid`：可以在底层数据结构中表达，但 v0.6 不允许进入 Commit，不构成支付系统。
- 同一 Intent 同时只能锁定一个 Commit。
- Quote、Commit、Receipt 仅双方可读。
- outbox 用于可靠通知；接收方处理后 ACK。
- Match 只是候选关系，不代表双方同意或交换完成。

本版本没有 Persona、钱包、Trade、Task、Artifact、实时聊天或自动模型决策。
