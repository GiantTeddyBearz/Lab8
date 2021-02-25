describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', ()=>{
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then($el => {
      expect($el).to.have.value(75)
    })
  })
  
  it('Volume input changes when slider changes', () =>{
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#volume-number').then($el => {
      expect($el).to.have.value(33);
    })
  })

  it('Volume property of audio element changes when slider changes', () =>{
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#horn-sound').then($el => {
      expect($el).to.have.prop('volume', 0.33);
    })
  })

  it('Image and sound sources change when selecting party horn radio button', () => {
    cy.get('#radio-party-horn').check().trigger('change');
    cy.get('#horn-sound').then($el => {
        expect($el).to.have.prop('src', 'http://127.0.0.1:5500/Part2-Cypress/assets/media/audio/party-horn.mp3');
    })
    cy.get('#sound-image').then($el => {
      expect($el).to.have.prop('src', 'http://127.0.0.1:5500/Part2-Cypress/assets/media/images/party-horn.svg' )
    })
  })

  describe('Volume image changes when increasing volumes', () => {
    it('Volume greater than 66', () => {
      cy.get('#volume-slider').invoke('val', 67).trigger('input');
      cy.get('#volume-image').then($el => {
        expect($el).to.have.prop('src', 'http://127.0.0.1:5500/Part2-Cypress/assets/media/icons/volume-level-3.svg');
      })
    })
    it('Volume greater than 33, but less than 67', () => {
      cy.get('#volume-slider').invoke('val', 34).trigger('input');
      cy.get('#volume-image').then($el => {
        expect($el).to.have.prop('src', 'http://127.0.0.1:5500/Part2-Cypress/assets/media/icons/volume-level-2.svg');
      })
    })
    it('Volume greater than 0, but less than 34', () => {
      cy.get('#volume-slider').invoke('val', 32).trigger('input');
      cy.get('#volume-image').then($el => {
        expect($el).to.have.prop('src', 'http://127.0.0.1:5500/Part2-Cypress/assets/media/icons/volume-level-1.svg');
      })
    })
    it('Volume equal to 0', () => {
      cy.get('#volume-slider').invoke('val', 0).trigger('input');
      cy.get('#volume-image').then($el => {
        expect($el).to.have.prop('src', 'http://127.0.0.1:5500/Part2-Cypress/assets/media/icons/volume-level-0.svg');
      })
    })
  })

  it('Honk button disabled when textbox input empty or non-number', () =>{
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').then($el => {
      expect($el).to.have.prop('disabled');
    })
    cy.get('#volume-number').clear().type('a');
    cy.get('#honk-btn').then($el => {
      expect($el).to.have.prop('disabled');
    })
  })

  it('Error is shown when given a number outside range', () =>{
    cy.get('#volume-number').clear().type('1000');
    cy.get('#volume-number:invalid').then($el => {
      expect($el).to.be.visible;
    })
  })
});
