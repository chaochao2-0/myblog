# nginx 配置

## vue中history路由问题
```ts
server {
	listen 8081;
	
	location / {
		alias  D:\\OurBIM\\ourbim-admin\/;
		try_files $uri $uri/ /index.html; // 解决history路由访问问题
 	}
}
```