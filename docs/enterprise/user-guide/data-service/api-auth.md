# API 认证介绍

Tapdata 的 API 认证服务基于 OAuth 2.0 机制，默认支持 `client credentials`、`implicit` 授权方式，您可以在[创建客户端](create-api-client.md)时选择授权方式。本文将介绍 API 认证流程，包含如何获取访问令牌，帮助您快速使用 API 服务。

## 获取访问令牌（client credentials 方式）

### 请求地址

```bash
http://{Tapdata 服务器地址}:3030/oauth/token
```

### 请求参数
| 名称          | 类型   | 是否必填 | 说明                         |
| ------------- | ------ | -------- | ---------------------------- |
| grant_type    | String | 是       | 固定值：client_credentials   |
| client_id     | Sring  | 是       | 注册客户端时拿到的客户端 ID  |
| client_secret | Sring  | 是       | 注册客户端时拿到的客户端密钥 |


### 响应参数
| 名称          | 类型  | 是否必填 | 说明                                  |
| ------------- | ----- | -------- | ------------------------------------- |
| access_token  | Sring | 是       | 访问 API Server 的令牌                |
| expires_in    | Sring | 是       | 过期时间                              |
| refresh_token | Sring | 否       | 使用 refresh_token 更新 access_token  |
| token_type    | Sring | 否       | API Server 令牌认证方式，默认为Bearer |


## 获取访问令牌（implicit 方式）

### 请求地址

```
http://{Tapdata 服务器地址}:3030/oauth/authorize
```

### 请求参数
| 名称          | 类型  | 是否必填 | 说明                       |
| ------------- | ----- | -------- | -------------------------- |
| grant_type    | Sring | 是       | 固定值：implicit           |
| client_id     | Sring | 是       | 注册客户端时拿到的客户端ID |
| response_type | Sring | 是       | 固定值：token              |
| scope         | Sring | 否       | 本次请求认证要访问的接口   |
| redirect_uri  | Sring | 否       | 授权后的跳转地址           |


### 响应参数
| 名称          | 类型  | 是否必填 | 说明                                  |
| ------------- | ----- | -------- | ------------------------------------- |
| access_token  | Sring | 是       | 访问 API Server 的令牌                |
| expires_in    | Sring | 是       | 过期时间                              |
| refresh_token | Sring | 否       | 使用 refresh_token 更新 access_token  |
| token_type    | Sring | 否       | API Server 令牌认证方式，默认为Bearer |


## 携带访问令牌调用 API

客户端每次调用发布的接口都需要提供 `access_token` 完成鉴权认证。发送请求时，可以将 `access_token` 放在请求头、请求体或 URL 参数中；也可以使用 Bearer 方式将 `access_token` 添加认证请求头信息中，API Server 会自动获取并完成权限验证。

### API Key 方式

在 `request header`、`request body`、`request url` 中添加  `access_token` 参数：

```
access_token: eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6ImI1ZmQwMWM1OTk2YTYzNDMyMGViZjUzY2JhYjVmYWRmIiwidXNlcl9pZCI6IjVjZTBiYzUxMzNmZDI5NGI2YTI1YTYzYyIsImNyZWF0ZWRBdCI6MTU1ODM2ODg4NDk0NCwicm9sZXMiOlsiNWNlMGJjNTEzM2ZkMjk0YjZhMjVhNjNjIl0sImV4cGlyZWRhdGUiOjE1NTgzNzA2ODQ5NDR9.fKSCRs2pCNdYYVCYjM-W1OfmQO057EKKOTO1n89Q998
```

### Bearer 方式

在 `request header` 中添加认证参数：

```
Authorization: bearer eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6ImI1ZmQwMWM1OTk2YTYzNDMyMGViZjUzY2JhYjVmYWRmIiwidXNlcl9pZCI6IjVjZTBiYzUxMzNmZDI5NGI2YTI1YTYzYyIsImNyZWF0ZWRBdCI6MTU1ODM2ODg4NDk0NCwicm9sZXMiOlsiNWNlMGJjNTEzM2ZkMjk0YjZhMjVhNjNjIl0sImV4cGlyZWRhdGUiOjE1NTgzNzA2ODQ5NDR9.fKSCRs2pCNdYYVCYjM-W1OfmQO057EKKOTO1n89Q998
```



## 常见响应状态码说明

| 响应状态码 | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| 200        | findById、findPage、create、自定义方法 请求处理成功返回。    |
| 204        | updateById、deleteById 请求处理成功返回。                    |
| 500        | 服务器内部处理错误返回。常见错误：新增记录违反唯一约束、MongoDB Validate 验证失败等。 |
| 401        | 认证失败返回。访问令牌过期或未提供访问令牌。                 |
| 404        | 操作数据不存在返回。根据删除、更新、查询不存在的记录等。     |