describe('FortiManager Live Monitor App', () => {
  it('loads the dashboard page', () => {
    cy.visit('http://localhost:5173');
    cy.contains('FortiManager'); // Adjust this selector/text as needed for your app
  });
}); 