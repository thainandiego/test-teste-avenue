describe('Retorna dados do clima com sucesso status 200', () => {
    it('Testar requisição GET', () => {
      cy.request({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
          lat: '22.34',
          lon: '10.99',
          appid: '99a45fa239bfcd24fee1937211b03f4b',
        },
      }).then(response => {
        expect(response.status).to.equal(200);
        expect(response.body).to.not.be.null;
      });
    });


    describe('Retorna erro de coordenadas inválidas status 400', () => {
      it('Deve retornar status 400 ao acessar a API com valores inválidos de latitude e longitude', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather',
          qs: {
            lat: '23423423441232432',
            lon: '10.99',
            appid: '99a45fa239bfcd24fee1937211b03f4b'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400)
        })
      })
    })

    describe('Retorna erro de coordenadas vazias status 400', () => {
      it('Deve retornar status 400 ao acessar a API sem especificar latitude e longitude', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather',
          qs: {
            appid: '99a45fa239bfcd24fee1937211b03f4b'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400)
        })
      })
    })    

    describe('Retorna erro de chave de API inválida status 401', () => {
      it('Deve retornar status 401 ao acessar a API com um appid inválido', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather',
          qs: {
            lat: '22.34',
            lon: '10.99',
            appid: 'appid_inválido'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(401)
        })
      })
    }) 

    describe('Retorna doc de .xml status 200', () => {
      it('Deve retornar o status code 200 e o conteúdo do XML', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?lat=22.34&lon=10.99&appid=99a45fa239bfcd24fee1937211b03f4b&lang=pt_br&mode=xml'
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.headers['content-type']).to.eq('application/xml; charset=utf-8')
          expect(response.body).to.contain('<current>')
          expect(response.body).to.contain('</current>')          
        })
      })
    })

    describe('Retorna doc de .xml status 400', () => {
      it('Chamada de API com status 400', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?lat=abc&lon=def&appid=99a45fa239bfcd24fee1937211b03f4b&lang=pt_br&mode=xmla',
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400) 
        })
      })
    })


    describe('Retorna doc de .xml com status 401', () => {
      it('Chamada de API com status 401', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?lat=222.34&lon=110.99&appid=99a45fa239bfcd24fee193721b03f4b&lang=pt_br&mode=xml',
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(401)
        })
      })
    }) 

    describe('Retorna temperatura em Celsius com parâmetro opcional com status 200', () => {
      it('Deve retornar a temperatura em Celsius ao acessar a API com o parâmetro units definido como metric', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather',
          qs: {
            lat: '22.34',
            lon: '10.99',
            appid: '99a45fa239bfcd24fee1937211b03f4b',
            units: 'metric'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.main.temp).to.be.a('number')
          expect(response.body.main.temp).to.be.at.least(-100)
          expect(response.body.main.temp).to.be.at.most(100)
        })
      })
    })

    describe('Retorna temperatura em Celsius com parâmetro opcional com status 400', () => {
      it('Deve retornar a temperatura em Celsius ao acessar a API com o parâmetro units definido como metric', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather',
          qs: {
            lat: 'abc4',
            lon: 'def',
            appid: '99a45fa239bfcd24fee1937211b03f4b',
            units: 'metric'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400)
        })
      })
    })


    describe('Retorna temperatura em Celsius com parâmetro opcional com status 401', () => {
      it('Deve retornar o status code 401', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?lat=22.34&lon=10.99&appid=invalido&lang=pt_br&mode=xml',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(401)
        })
      })
    })  


    describe('Retorna todos os dados em Português status 200', () => {
      it('Chamada de API bem sucedida com status 200', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?lat=22.34&lon=10.99&appid=99a45fa239bfcd24fee1937211b03f4b&lang=pt_br',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.not.be.null;
        })
      })
    })


    describe('Retorna todos os dados em Português status 400', () => {
      it('Chamada de API com status 400', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?lat=222.34&lon=110.99&appid=99a45fa239bfcd24fee1937211b03f4b&lang=pt_br',
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400)
        })
      })
    })

    
    describe('Retorna todos os dados em Português status 401', () => {
      it('Chamada de API com status 401', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?lat=222.34&lon=110.99&appid=99a45fa239bfcd24fee193721b03f4b&lang=pt_br',
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(401)
        })
      })
    })          
  });
  