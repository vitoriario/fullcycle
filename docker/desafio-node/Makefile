run:
	docker-compose up --build

insert-name:
	curl -X POST http://localhost:8080/api/name -d '{"name": "$(name)"}' -H "Content-type: application/json"