describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'userX',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('userX')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
  
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('userX')
      cy.get('#password').type('secrettt')
      cy.get('#login-button').click()
  
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'background-color', 'rgb(253, 146, 146)')
      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({username: 'userX', password: 'secret'})
    })

    it('a blog can be added', function() {
      cy.contains('new blog').click()
      cy.get('#input-title').type('a blog created by cypress')
      cy.get('#input-author').type('Wayne Writer')
      cy.get('#input-url').type('www.blog.com')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    it('a blog can be liked', function() {
      cy.contains('a blog created by cypress').parent().find('#view-button').click()
      cy.contains('a blog created by cypress').parent().find('#like-button').click()
      cy.contains('likes 1')
    })

    it('a blog can be deleted', function() {
      cy.contains('a blog created by cypress').parent().find('#view-button').click()
      cy.contains('a blog created by cypress').parent().find('#remove-button').click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })
  })

  describe('bloglist ', function() {
    beforeEach(function() {
      cy.login({username: 'userX', password: 'secret'})
    })

    it('is sorted desc based on likes', function() {
      cy.contains('new blog').click()
      cy.get('#input-title').type('first blog created by cypress')
      cy.get('#input-author').type('Wayne Writer')
      cy.get('#input-url').type('www.blog.com')
      cy.get('#create-button').click()
      cy.contains('first blog created by cypress')

      cy.contains('new blog').click()
      cy.get('#input-title').type('second blog created by cypress')
      cy.get('#input-author').type('Wayne Writer')
      cy.get('#input-url').type('www.blog.com')
      cy.get('#create-button').click()
      cy.contains('second blog created by cypress')

      cy.contains('first blog created by cypress').parent().find('#view-button').click()
      cy.contains('first blog created by cypress').parent().find('#like-button').as('likeButton')
      cy.get('@likeButton').click()
      cy.wait(1000)

      cy.contains('second blog created by cypress').parent().find('#view-button').click()
      cy.contains('second blog created by cypress').parent().find('#like-button').as('likeButton')
      cy.get('@likeButton').click()
      cy.wait(1000)
      cy.get('@likeButton').click()
      cy.wait(1000)
      cy.get('@likeButton').click()
      cy.wait(1000)

      cy.get('.blogList').eq(0).should('contain', 'second blog created by cypress')
      cy.get('.blogList').eq(1).should('contain', 'first blog created by cypress')
    })
    
  })
})
