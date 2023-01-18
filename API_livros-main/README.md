# Documentação da API

## BANCO DE DADOS
O arquivo exportado do banco mysql está na pasta database

## CREDENCIAIS DO BANCO
As credenciais do banco devem ser colocadas no arquivo mysql.js

## RUN SERVER
Para inicializar o server local, execute o comando: 
                npm start
## ROTAS

| Metodo | URL |
|---|---|
| `POST` | '/login' |

+ header


    {
        Content-Type: application/json
    }



+ Request (application/json)


    {
	"email": "",
	"senha": ""
    }



+ response (application/json)



    {
	"mensagem": "Autenticado com sucesso",
	"token": ""
    }



| Metodo | URL |
|---|---|
| `POST` | '/cadastro' |

+ header


    {
        Content-Type: application/json
    }



+ Request (application/json)


    {
	"email": "",
	"senha": ""
    }



+ response (application/json)



    {
	"mensagem": "usuario criado com sucesso!",
	"user": {
		"user_id": ,
		"email": ""
	}
    }




| Metodo | URL |
|---|---|
| `GET` | '/livros/all' |
        
+ response (application/json)


    {
	"livros": [
		{
			"id": ,
			"titulo": "",
			"categoria": "",
			"descricao": "",
			"ano_lancamento": ,
			"autor": "",
			"id_user": ,
			"foto": "",
			"isReservado": 
		}
	]
    }



| Metodo | URL |
|---|---|
| `GET` | '/livros/{categoria}' |

+ response (application/json)


    {
	"livros": [
		{
			"id": ,
			"titulo": "",
			"categoria": "",
			"descricao": "",
			"ano_lancamento": ,
			"autor": "",
			"id_user": ,
			"foto": "",
			"isReservado": 
		}
	]
    }



| Metodo | URL |
|---|---|
| `GET` | '/livros/meus-livros' |

+ header


    {
        Content-Type: application/json,
        Authorization: Bearer + token
    }




+ response (application/json)


    {
	"livros": [
		{
			"id": ,
			"titulo": "",
			"categoria": "",
			"descricao": "",
			"ano_lancamento": ,
			"autor": "",
			"id_user": ,
			"foto": "",
			"isReservado": 
		}
	]
    }


| Metodo | URL |
|---|---|
| `POST` | '/auth/livros/create' |

obs: A API só aceita imagens jpeg e png, com no maximo 10mb

+ header


    {
        Content-Type: multipart/form-data,
        Authorization: Bearer + token
    }


+ Request (multipart/form-data)


    [
        titulo,
        descrição,
        autor,
        categoria,
        ano_lancamento,
        livro_image(file)
    ]



+ response (application/json)


    {
	"mensagem": "livro criado com sucesso!",
	"livro": {
		"id_livro": ,
		"titulo": ""
	}
    }