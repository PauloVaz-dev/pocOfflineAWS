### O projeto tem o intuito de simular os serviços da AWS SQS, Dynamo, S3, RDS, Redis com uso do framework serverless. Minimizando os custos e aumentando produtividade.

```bash

# Criar a rede para o container - Não é obrigatório - Entrou em conflito com a rede 172.18
docker network create --driver=bridge --subnet=192.168.10.0/24 br0

#Subir os containers
cd docker
docker-compose up 

#Validar se containers estão funcionado
docker ps 

#Verificar os recursos
docker stats

#Criar as credenciais
aws configure --profile default
AWS Access Key ID [****************ocal]: local
AWS Secret Access Key [****************ocal]: locallocal

#Validar 
cat ~/.aws/credentials


export AWS_PROFILE=default

#Criar tablela
aws dynamodb --endpoint-url http://127.0.0.1:8000 create-table \
        --table-name my-dynamo \
	--stream-specification StreamEnabled=true,StreamViewType=OLD_IMAGE \
        --attribute-definitions AttributeName=id,AttributeType=S \
        --key-schema AttributeName=id,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
	--profile default
	--region sa-east-1

#Ativo o ttl   
aws dynamodb --endpoint-url=http://127.0.0.1:8000 update-time-to-live --table-name my-dynamo --time-to-live-specification Enabled=true,AttributeName=ttl --profile default

# List tables
aws dynamodb --endpoint-url=http://127.0.0.1:8000 list-tables

#Listar se tem registros
aws dynamodb --endpoint-url=http://127.0.0.1:8000  scan --table-name my-dynamo

# Delete table
aws dynamodb --endpoint-url=http://127.0.0.1:8000 delete-table \
         --table-name my-dynamo

# Create queues
aws sqs --endpoint-url=http://127.0.0.1:9324 create-queue \
            --queue-name my-sqs 

# List queues
aws --endpoint-url=http://127.0.0.1:9324 sqs list-queues

# Create bucket
aws --endpoint-url=http://127.0.0.1:9000 s3api create-bucket --bucket my-bucket

# List buckets
aws --endpoint-url=http://127.0.0.1:9000 s3api list-buckets

# List bucket files
aws --endpoint-url=http://127.0.0.1:9000 s3 ls s3://my-bucket

# Copy local object to bucket
aws --endpoint-url=http://127.0.0.1:9000 s3 cp package.json s3://my-bucket/

# Remover
aws --endpoint-url=http://127.0.0.1:9000 s3 rm s3://my-bucket/package.json

```

### Libs necessárias:
```bash
serverless-offline-s3
serverless-offline-sqs
serverless-offline-dynamodb-streams

npm i -D serverless-offline-s3 serverless-offline-sqs serverless-offline-dynamodb-streams
```

## Rodando o serverless offline
```bash
npx sls offline start --stage local --config serverless-local.yml 
```


## Simulando um envio de arquivo para o S3
```bash
aws --endpoint-url=http://127.0.0.1:9000 s3 cp package.json s3://my-bucket/
```

## Simulando a remoção de um arquivo no S3
```bash
aws --endpoint-url=http://127.0.0.1:9000 rm cp package.json s3://my-bucket/
```

## Simulando o envio de uma mensagem para o sqs via cli
```bash
aws sqs send-message --endpoint-url=http://127.0.0.1:9324 \
         --queue-url http://127.0.0.1:9324/000000000000/my-sqs \
         --message-body '{"solicitationId":"28224157-e580-4396-ac58-1b681a3cf517"}'
```

## Simulando o envio de uma mensagem para o sqs via REST
```bash
curl --location 'http://localhost:3000/local/v1/enqueue' \
        --header 'Content-Type: application/json' \
        --data '{
        "solicitationId": "28224157-e580-4396-ac58-1b681a3cf517"
        }'
```


## Simulando o envio de uma mensagem para o dynamo via REST
```bash
curl --location 'http://localhost:3000/local/v1/dynanmo' \
        --header 'Content-Type: application/json' \
        --data '{
        "solicitationId": "28224157-e580-4396-ac58-1b681a3cf517"
        }'
```

## Simulando o envio de uma mensagem para o dynamo via CLI
```bash
aws dynamodb put-item --endpoint-url=http://127.0.0.1:8000 --table-name my-dynamo --item '{ "id": {"S": "78224157-e580-4396-ac58-1b681a3cf519" } }'
```


### Links

https://dev.to/aws-builders/new-dynamodb-streams-filtering-in-serverless-framework-3lc5
https://linuxhint.com/dynamodb-cli-commands/
https://github.com/mj1618/serverless-offline-sns
