/// <reference types="cypress"/>

Cypress.Commands.add(
  "postProductReviewsWooComerce",
  function (token, product_id, review, reviewer, reviewer_email, rating) {
    cy.request({
      method: "POST",
      url: Cypress.env("wooCommerce") + Cypress.env("review"),
      headers: {
        Authorization: token,
      },
      body: {
        product_id: product_id,
        review: review,
        reviewer: reviewer,
        reviewer_email: reviewer_email,
        rating: rating,
      },
    });
  }
);

Cypress.Commands.add(
  "putProductReviewsWooComerce",
  function (token, product_id, review, reviewer, reviewer_email, rating, id) {
    cy.request({
      method: "PUT",
      url: Cypress.env("wooCommerce") + Cypress.env("review") + "/" + id,
      headers: {
        Authorization: token,
      },
      body: {
        product_id: product_id,
        review: review,
        reviewer: reviewer,
        reviewer_email: reviewer_email,
        rating: rating,
      },
    });
  }
);

Cypress.Commands.add(
  "deleteProductReviewsWooComerce",
  function (token, id, force) {
    cy.request({
      method: "DELETE",
      url:
        Cypress.env("wooCommerce") +
        Cypress.env("review") +
        "/" +
        id +
        "?force" +
        force,
      headers: {
        Authorization: token,
      },
    });
  }
);
