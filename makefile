start-nextjs:
	docker run --name caroption-nextjs --network caroption --rm -p 3000:3000 -e BACKEND_URL=caroption-django:8000 -v "./":/app -v "/app/node_modules" nextjs15.3
stop-nextjs:
	docker stop caroption-nextjs
start-nginx:
	docker run --name nginx -v ./nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:1.29.0

