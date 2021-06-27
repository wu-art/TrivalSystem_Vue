

# 旅游网站管理后台 API 接口文档

# 项目名:bysj_17218wb

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 1.API 接口说明

- 接口基准地址：http://127.0.0.1:8081/
- 服务端已开启 CORS 跨域支持
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 1.2.通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |
|          |                       |                                                     |

------

## 2. 登录

### 2.1. 登录验证接口

- 请求路径：localhost:8081/api/manager/login
- 请求方法：get
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| manager  | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名   | 参数说明 | 备注            |
| -------- | -------- | --------------- |
| id       | 用户 ID  |                 |
| manager  | 管理员   |                 |
| password | 登录密码 |                 |
| token    | 令牌     | 基于 jwt 的令牌 |

- 响应数据

```json
{
    "data": {
        "id": 500,
        "manager": "admin",
        "password":"123456",
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
    },
    "meta": {
        "msg": "登录成功",
        "status": 200
    }
}
```

## 3. 用户管理

### 3.1 用户数据列表

- 请求路径：localhost:8081/api/users/findAll
- 请求方法：get
- 请求参数

| 参数名   | 参数说明     | 备注     |
| -------- | ------------ | -------- |
| query    | 查询参数     | 可以为空 |
| pagenum  | 当前页码     | 不能为空 |
| pagesize | 每页显示条数 | 不能为空 |

- 响应参数

| 参数名    | 参数说明     | 备注 |
| --------- | ------------ | ---- |
| totalpage | 总记录数     |      |
| pagenum   | 当前页码     |      |
| users     | 用户数据集合 |      |

- 响应数据

```json
{
    "data": {
        "totalpage": 5,
        "pagenum": 4,
        "users": [
            {
                "id": 25,
                "username": "tige117",
                "phone": "18616358651",
                "email": "tige112@163.com",
                "create_data": "2017-11-09",
                "mg_state": true, // 当前用户的状态
            }
        ]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 3.2. 添加用户

- 请求路径：localhost:8081/api/users/save
- 请求方法：post
- 请求参数

| 参数名      | 参数说明 | 备注     |
| ----------- | -------- | -------- |
| id          | 用户ID   | 不能为空 |
| username    | 用户名称 | 不能为空 |
| phone       | 用户电话 | 不能为空 |
| create_data | 创建日期 | 不能为空 |

- 响应参数

| 参数名      | 参数说明 | 备注 |
| ----------- | -------- | ---- |
| id          | 用户 ID  |      |
| username    | 用户名   |      |
| phone       | 手机号   |      |
| email       | 邮箱     |      |
| create_data | 创建时间 |      |

- 响应数据

```json
{
    "data": {
        "id": 28,
        "username": "tige1200",
        "phone": "test",
        "email": "test@test.com",
        "create_data": "2017-11-10",
    },
    "meta": {
        "msg": "用户创建成功",
        "status": 201
    }
}
```

### 3.3修改用户状态

- 请求路径：http://localhost:8081/api/users//findById/id
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                                        |
| ------ | -------- | ------------------------------------------- |
| Id     | 用户 ID  | 不能为空`携带在url中`                       |
| type   | 用户状态 | 不能为空`携带在url中`，值为 true 或者 false |

- 响应数据

```json
{
  "data": {
    "id": 566,
    "username": "admin",
    "phone": "123456",
    "email": "bb@itcast.com",
    "mg_state": 0
  },
  "meta": {
    "msg": "设置状态成功",
    "status": 200
  }
}
```

### 3.4 根据 ID 查询用户信息

- 请求路径：http://localhost:8081/api/users//findById/id
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注                  |
| ------ | -------- | --------------------- |
| id     | 用户 ID  | 不能为空`携带在url中` |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| id     | 用户 ID  |      |
| phone  | 手机号   |      |
| email  | 邮箱     |      |

- 响应数据

```json
{
    "data": {
        "id": 503,
        "username": "admin3",
        "phone": "00000",
        "email": "new@new.com"
    },
    "meta": {
        "msg": "查询成功",
        "status": 200
    }
}
```

### 3.5 编辑用户提交

- 请求路径：http://localhost:8081/api/users//findById/:id
- 请求方法：get
- 请求参数

| 参数名      | 参数说明 | 备注                        |
| ----------- | -------- | --------------------------- |
| id          | 用户 id  | 不能为空 `参数是url参数:id` |
| email       | 邮箱     | 可以为空                    |
| phone       | 手机号   | 可以为空                    |
| create_data | 日期     | 可以为空                    |

- 响应参数

| 参数名       | 参数说明 | 备注 |
| ------------ | -------- | ---- |
| id           | 用户 ID  |      |
| phone        | 手机号   |      |
| email        | 邮箱     |      |
| crerate_data | 日期     |      |

- 响应数据

```json
/* 200表示成功，500表示失败 */
{
    "data": {
        "id": 503,
        "username": "admin3",
        "phone": "111",
        "email": "123@123.com",
        "create_data":"2021-02-20"
    },
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
}
```

### 3.6删除单个用户

- 请求路径：localhost:8081/api/users/deleteById/{id}
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明 | 备注                       |
| ------ | -------- | -------------------------- |
| id     | 用户 id  | 不能为空`参数是url参数:id` |

- 响应参数
- 响应数据

```json
{
    "data": null,
    "meta": {
        "msg": "删除成功",
        "status": 200
    }
}
```

## 4景点管理

### 4.1获取景点信息

- 请求路径：localhost:8081/api/travels/findAllTravels?provinceId=1

- 请求方法：get

- 请求参数

  | 参数名     | 参数说明                 | 备注 |
  | :--------- | ------------------------ | ---- |
  | provinceId | 使用省份Id来获取景点信息 | 必选 |

- 响应参数：

| 参数名    | 参数说明                             | 备注               |
| --------- | ------------------------------------ | ------------------ |
| travels   | 存储景点信息数组                     | hashmap存储        |
| page      | 当前页                               |                    |
| counts    | 数据总条数                           |                    |
| totalPage | 总页数                               | 在后台通过计算得出 |
| picpath   | 图片路径为base64编码，展示时需要转换 |                    |

- 响应数据：

{
    "travels": [
        {
            "id": "31",
            "name": "天安门",
            "picpath": "/9j/4AAQSkZJRgABAQAAAQABAAD.....",
            "hottime": "2021-05-29",
            "hotticket": 1045,
            "dimticket": 52,
            "descript": "很大的负担v",
            "provinceid": "1"
        }
    ],
    "counts": 1,
    "totalPage": 1,
    "page": 1
}

### 4.2增加景点

- 请求路径：localhost:8081/api/travels/save
- 请求方法：post
- 请求参数

| 参数名     | 参数说明 | 备注       |
| ---------- | -------- | ---------- |
| name       | 景点名称 |            |
| picpath    | 图片路径 | 从本地上传 |
| hottime    | 旺季时间 |            |
| hotticket  | 旺季门票 |            |
| dimticket  | 淡季门票 |            |
| descript   | 景点描述 |            |
| privinceid | 省份id   |            |

- 响应参数：

- 响应数据：

```
{ "travels": [
        {
            "id": "31",
            "name": "天安门",
            "picpath": "/9j/4AAQSkZJRgABAQAAAQABAAD.....",
            "hottime": "2021-05-29",
            "hotticket": 1045,
            "dimticket": 52,
            "descript": "很大的负担v",
            "provinceid": "1"
        }
    ],
    "meta": {
        "msg": "添加景点信息成功",
        "status": 200
    }
}
```

### 4.3删除景点

- 请求路径： http://localhost:8081/api/travels/delete?id=47 
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注           |
| ------ | -------- | -------------- |
| id     | 景点id   | 更具景点id删除 |

- 响应参数：

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| msg    | 响应消息提示 |      |
| state  | 响应状态     |      |

- 响应数据：

```
{
    "msg": "删除景点信息成功",
    "state": true
}
```

### 4.4修改景点

- 请求路径： http://localhost:8081/api/travels/update
- 请求方法：post
- 请求参数

- 响应参数：

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| msg    | 响应消息提示 |      |
| state  | 响应状态     |      |

- 响应数据：

```
{
    "msg": "修改景点信息成功",
    "state": true
}
```

## 5省份管理

### 5.1查询省份

- 请求路径： http://localhost:8081/api/province/findByPage 
- 请求方法：get
- 请求参数

- 响应参数：

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| province  | 省份数组 |      |
| totals    | 总条数   |      |
| totalpage | 总页数   |      |
| page      | 当前页   |      |

- 响应数据：

```
{
    "province": [
        {
            "id": 1,
            "name": "北京市",
            "tags": "天安门、故宫、颐和园、圆明园、中南海",
            "placecounts": 4,
            "administrators": "admin"
        },
        {
            "id": 2,
            "name": "甘肃省",
            "tags": "丹霞、丝绸之路",
            "placecounts": 2,
            "administrators": "admin"
        },
    ],
    "totalPage": 2,
    "totals": 12,
    "page": 1
}
```

### 5.2添加省份

- 请求路径： http://localhost:8081/api/province/findByPage 
- 请求方法：post
- 请求参数

- 响应参数：

| 参数名 | 参数说明 | 备注             |
| ------ | -------- | ---------------- |
| msg    | 提示消息 | 保存省份信息成功 |
| state  | 状态     | true\false       |

- 响应数据：

```
{
    "msg": "保存省份信息成功",
    "state": true
}
```

### 5.3删除省份

- 请求路径： http://localhost:8081/api/province/delete
- 请求方法：get
- 请求参数:

| 参数名 | 参数说明 | 备注           |
| ------ | -------- | -------------- |
| id     | 省份i    | 根据省份id删除 |

- 响应参数：

| 参数名 | 参数说明 | 备注             |
| ------ | -------- | ---------------- |
| msg    | 提示消息 | 删除省份信息成功 |
| state  | 状态     | true\false       |

- 响应数据：

```
{
    "msg": "删除省份信息成功",
    "state": true
}
```

### 5.4修改省份

- 请求路径： http://localhost:8081/api/province/update
- 请求方法：post
- 请求参数:

- 响应参数：

| 参数名 | 参数说明 | 备注             |
| ------ | -------- | ---------------- |
| msg    | 提示消息 | 修改省份信息成功 |
| state  | 状态     | true\false       |

- 响应数据：

```
{
    "msg": "修改省份信息成功",
    "state": true
}
```

## 6.订单管理

### 6.1查询订单

- 请求路径： http://localhost:8081/api/order/findOrder
- 请求方法：get
- 请求参数

- 响应参数：

| 参数名    | 参数说明   | 备注 |
| --------- | ---------- | ---- |
| order     | 订单列表   | 数组 |
| totals    | 总条数     |      |
| totalpage | 总页数     |      |
| page      | 当前页     |      |
| rows      | 每页的条数 |      |

- 响应数据：

```
{
    "totalPage": 3,
    "totals": 15,
    "page": 1,
    "rows": 6,
    "order": [
        {
            "id": 2,
            "travelName": "丹霞",
            "travelTime": "2020-06-23",
            "ticket": "200",
            "username": "小里",
            "descript": "哇哇",
            "tel": "15648758485",
            "orderType": "团队",
            "payState": false
        },
        {
            "id": 3,
            "travelName": "天安门",
            "travelTime": "2021-05-18",
            "ticket": "104",
            "username": "miss",
            "descript": "很大的负担vswde我们的",
            "tel": "12636958488",
            "orderType": "单人",
            "payState": true
        },
    ]
}
```

### 6.2添加订单(下单)

- 请求路径：  http://localhost:8081/api/order/save
- 请求方法：post
- 请求参数:

- 响应参数：

| 参数名 | 参数说明 | 备注         |
| ------ | -------- | ------------ |
| msg    | 提示消息 | 订单添加成功 |
| state  | 状态     | true\false   |

- 响应数据：

```
{
    "msg": "订单添加成功",
    "state": true
}
```

### 6.3删除订单

- 请求路径：  http://localhost:8081/api/order/delete
- 请求方法：get
- 请求参数:

| 参数名 | 参数说明     | 备注           |
| ------ | ------------ | -------------- |
| id     | 订单号（id） | 根据订单id删除 |

- 响应参数：

| 参数名 | 参数说明 | 备注         |
| ------ | -------- | ------------ |
| msg    | 提示消息 | 订单删除成功 |
| state  | 状态     | true\false   |

- 响应数据：

```
{
    "msg": "订单删除成功",
    "state": true
}
```

### 6.4修改订单

- 请求路径：  http://localhost:8081/api/order/update
- 请求方法：post
- 请求参数:

| 参数名                           | 参数说明 | 备注 |
| -------------------------------- | -------- | ---- |
| orderType                        | 订单类型 |      |
| payState                         | 支付状态 |      |
| tel                              | 联系方式 |      |
| 只有特定的字段可以修改，其他不行 |          |      |

- 响应参数：

| 参数名 | 参数说明 | 备注         |
| ------ | -------- | ------------ |
| msg    | 提示消息 | 订单修改成功 |
| state  | 状态     | true\false   |

- 响应数据：

```
{
    "msg": "订单修改成功",
    "state": true
}
```