module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/api/**/*.{js,jsx,ts,tsx}",
    env: {
      wooCommerce: "https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3",
      review: "/products/reviews",
    },
  },
};
