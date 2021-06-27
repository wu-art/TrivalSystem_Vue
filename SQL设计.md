## 数据库(bysj_218)

### 1、管理员表(manager)

| 字段名   | 字段说明 | 备注           |
| -------- | -------- | -------------- |
| id       | 管理员ID | 主键、不能为空 |
| manager  | 用户名   | 不能为空       |
| password | 密码     | 不能为空       |

```sql
create table manager(
	id int(10) PRIMARY key auto_increment,
    manager varchar(25),
    password varchar(25)
);
```



### 2、用户表(users)

| 字段名      | 字段说明 | 备注           |
| ----------- | -------- | -------------- |
| id          | 用户ID   | 主键、不能为空 |
| name        | 用户名   | 不能为空       |
| phone       | 电话     | 不能为空       |
| email       | 邮箱     | 不能为空       |
| create_data | 日期     | 不能为空       |

```sql
create table users(
    id int(10) PRIMARY key auto_increment,
    name varchar(25),
    phone varchar(11),
    email varchar(25),
    create_data TIMESTAMP
);
```

### 3、省份表(province)

| 字段名      | 字段说明       | 备注           |
| ----------- | -------------- | -------------- |
| id          | 省份ID         | 主键、不能为空 |
| name        | 省份名         | 不能为空       |
| tags        | 省份代表性景点 | 不能为空       |
| placecounts | 景点数量       | 不能为空       |

```sql
create table province(
	id int(10) PRIMARY key auto_increment,
    name varchar(25),
    tags varchar(255),
    placecounts varchar(10)
);
```

> **省份表与景点表之间的关系     ---->     1:N**
>
> **所以两表之间存在主外键关系，景点表(travels)作为省份表(province)的外键**

### 4、景点表(travels)

| 字段名     | 字段说明           | 备注           |
| ---------- | ------------------ | -------------- |
| id         | 景点ID             | 主键、不能为空 |
| name       | 景点名称           | 不能为空       |
| picpath    | 景点代表性图片路径 | 不能为空       |
| hottime    | 旺季时间           | 不能为空       |
| hotticket  | 旺季门票           | 不能为空       |
| dimticket  | 淡季门票           | 不能为空       |
| desription | 景点描述           | 不能为空       |
| provinceid | 省份ID             | 不能为空       |

```sql
create table travels(
	id int(10) PRIMARY key auto_increment,
    name varchar(45),
    picpath varchar(255),
    hottime TIMESTAMP,
    hotticket double(7,2),
    dimticket double(7,2),
    descript varchar(255),
    provinceid int(10) REFERENCES province(id)
);
```

### 5、线路表(routes)

| 字段名   | 字段说明     | 备注           |
| -------- | ------------ | -------------- |
| id       | 景点ID       | 主键、不能为空 |
| province | 省份         | 不能为空       |
| name     | 景点名称     | 不能为空       |
| route    | 景点附近路线 | 不能为空       |
| food     | 景点周边食宿 | 不能为空       |

```sql
create table routes(
	id int(10) PRIMARY key auto_increment,
	province varchar(45),
	name varchar(45),
	route varchar(255),
	food varchar(255)
)
```

### 6、支付表(pay)

| 字段名     | 字段说明     | 备注           |
| ---------- | ------------ | -------------- |
| id         | 景点ID       | 主键、不能为空 |
| travelname | 景点名       | 不能为空       |
| travelTime | 旅游时间     | 不能为空       |
| descript   | 景点描述     | 不能为空       |
| username   | 游客名       | 不能为空       |
| tel        | 游客联系方式 | 不能为空       |
| ticket     | 景点票价     | 不能为空       |
| orderType  | 旅游类型     | 不能为空       |
| PayStatus  | 支付状态     | 已支付/未支付  |

```sql
create table pay(
	id int(10) PRIMARY key auto_increment,
	travelname varchar(45),
	travelTime date,
    descript varchar(255),
    username varchar(255),
    tel varchar(11);
	ticket double(7,2),
    orderType varchar(25);
	PayStatus YESNO
)
```

> boolean型字段创建:  字段名 YESNO True的值等于–1， False的值等于0 
>
> 格式 ：字段名  数据类型

