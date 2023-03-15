 1 Como usuário da API OpenWeatherMap
    Eu quero testar se a API retorna os dados do clima com sucesso
    Para garantir que a API está retornando os dados corretamente

    Cenário: Retorna dados do clima com sucesso status 200
    Dado que eu acesso a API OpenWeatherMap
    Quando eu passo valores válidos de latitude e longitude
    Então a API deve retornar status 200 e os dados do clima


    1.1 Cenário: Retorna erro de coordenadas inválidas status 400
    Dado que eu acesso a API OpenWeatherMap
    Quando eu passo valores inválidos de latitude e longitude
    Então a API deve retornar status 400 indicando que as coordenadas são inválidas

    1.2 Cenário: Retorna erro de coordenadas vazias status 400
    Dado que um usuário acessa a API OpenWeatherMap sem especificar a latitude e longitude
    Quando a API é chamada
    Então a API deve retornar um status 400 (Bad Request)

    1.3 Cenário: Retorna erro de chave de API inválida status 401
    Dado que estou acessando a API OpenWeatherMap
    Quando informo um appid inválido
    Então recebo um erro de chave de API inválida com o status 401

2 Funcionalidade: Garantir que o endpoint de retorno de documento .xml esteja funcionando corretamente ou incorretamente
    Cenário: Retorna doc de .xml status 200
    Dado que o usuário deseja consultar o endpoint de retorno de documento .xml
    Quando o usuário enviar uma solicitação GET para "https://api.openweathermap.org/data/2.5/weather?lat=22.34&lon=10.99&appid=99a45fa239bfcd24fee1937211b03f4b&lang=pt_br&mode=xml"
    Então o código de status de resposta deve ser 200

    2.1 Cenário: Retorna doc de .xml status 400.
    Dado que os parâmetros "lat" e "lon" são inválidos
    Quando realizo a chamada para a API do OpenWeatherMap
    Então recebo uma resposta com status code 400.

    2.3 Cenário: Retorna doc de .xml com status 401
    Dado que a API OpenWeatherMap está disponível
    Quando uma solicitação é feita com uma chave de API inválida e coordenadas válidas, como lat=222,34 e lon=110,99
    Em seguida, o código de status da resposta deve ser 401

3 Funcionalidade: Conversão de temperatura para Celsius na API OpenWeatherMap
    Como usuário da API OpenWeatherMap
    Eu quero receber a temperatura em Celsius
    Para que eu possa compreender a informação em uma unidade de medida familiar

    Cenário: Retornar temperatura em Celsius com parâmetro opcional com status 200
    Dado que eu acesse a API OpenWeatherMap com as coordenadas lat=22.34 e lon=10.99
    Quando eu definir o parâmetro units como metric na URL da API
    Então devo receber o status code 200
    E a resposta deve conter a temperatura em Celsius como um número
    E a temperatura em Celsius deve estar entre -100 e 100 graus

    3.1  Cenário: Retorna a temperatura em Celsius com parâmetro opcional e status 400
     Dado que estou acessando a API OpenWeather
     Quando solicito os dados meteorológicos com latitude "abc4" e longitude "def"
     E incluo o parâmetro "unidades" com o valor "métrica"
     Então a API deve responder com o status 400

    3.2  Cenário: Retornar temperatura em Celsius com parâmetro opcional e status 401
     Dado que eu acesso a API do OpenWeatherMap
     Quando eu informo um token inválido
     Então a API deve retornar o status 401

4 Funcionalidade: Conversão de linguagem para português  
    Cenário: Chamada de API bem sucedida com status 200
    Dado que eu faço uma chamada GET na API OpenWeatherMap
    Quando eu informar minha latitude e longitude e definir o idioma como Português
    Então a resposta deve retornar com o código de status 200
    E o corpo da resposta não deve ser nulo

    4.1 Cenário: Retorna todos os dados em Português status 400
        Dado a latitude é 222,34 e a longitude é 110,99
        Quando chamo a API OpenWeatherMap com os parâmetros appid e lang
        Então o código de status da resposta deve ser 400

    4.2 Cenário: Retorna todos os dados em Português status 401
        Dado que o usuário deseja recuperar dados meteorológicos em português
        Quando o usuário chama a API OpenWeather com uma chave de API inválida
        Em seguida, a API deve retornar um código de resposta 401 não autorizado

