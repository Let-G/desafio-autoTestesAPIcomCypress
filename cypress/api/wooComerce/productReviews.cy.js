/// <reference types="cypress"/>
import tokenFixture from "../../fixtures/token.json";
import reviewFixture from "../../fixtures/review.json";
import statusFixture from "../../fixtures/status.json";
import reviewWooCommerceSchema from "../../contracts/review.contract";
import { faker } from "@faker-js/faker";

describe("Product Review", () => {
  let reviewer_email;
  beforeEach(() => {
    reviewer_email = faker.internet.email();
  });
  it("criar Product Review", () => {
    cy.postProductReviewsWooComerce(
      tokenFixture.token,
      reviewFixture.reviewValido.product_id,
      reviewFixture.reviewValido.review,
      reviewFixture.reviewValido.reviewer,
      reviewer_email,
      reviewFixture.reviewValido.rating
    ).then((response) => {
      const id = response.body.id;
      expect(response.status).to.eq(statusFixture.created);
      expect(response.body.product_id).to.eq(
        reviewFixture.reviewValido.product_id
      );
      expect(response.body.review).to.eq(reviewFixture.reviewValido.review);
      expect(response.body.reviewer).to.eq(reviewFixture.reviewValido.reviewer);
      expect(response.body.reviewer_email).to.eq(reviewer_email);
      expect(response.body.rating).to.eq(reviewFixture.reviewValido.rating);
      return (
        reviewWooCommerceSchema.validateAsync(response.body),
        cy.deleteProductReviewsWooComerce(
          tokenFixture.token,
          id,
          reviewFixture.reviewDeletar.force
        )
      );
    });
  });

  it("editar Product Review", () => {
    cy.postProductReviewsWooComerce(
      tokenFixture.token,
      reviewFixture.reviewValido.product_id,
      reviewFixture.reviewValido.review,
      reviewFixture.reviewValido.reviewer,
      reviewer_email,
      reviewFixture.reviewValido.rating
    ).then((response) => {
      const id = response.body.id;
      cy.putProductReviewsWooComerce(
        tokenFixture.token,
        reviewFixture.reviewEditar.product_id,
        reviewFixture.reviewEditar.review,
        reviewFixture.reviewEditar.reviewer,
        reviewer_email,
        reviewFixture.reviewEditar.rating,
        id
      ).then((response) => {
        expect(response.status).to.eq(statusFixture.ok);
        expect(response.body.product_id).to.eq(
          reviewFixture.reviewEditar.product_id
        );
        expect(response.body.review).to.eq(reviewFixture.reviewEditar.review);
        expect(response.body.reviewer).to.eq(
          reviewFixture.reviewEditar.reviewer
        );
        expect(response.body.reviewer_email).to.eq(reviewer_email);
        expect(response.body.rating).to.eq(reviewFixture.reviewEditar.rating);
        return (
          reviewWooCommerceSchema.validateAsync(response.body),
          cy.deleteProductReviewsWooComerce(
            tokenFixture.token,
            id,
            reviewFixture.reviewDeletar.force
          )
        );
      });
    });
  });

  it("Deletar Product Review", () => {
    cy.postProductReviewsWooComerce(
      tokenFixture.token,
      reviewFixture.reviewValido.product_id,
      reviewFixture.reviewValido.review,
      reviewFixture.reviewValido.reviewer,
      reviewer_email,
      reviewFixture.reviewValido.rating
    ).then((response) => {
      const id = response.body.id;
      cy.deleteProductReviewsWooComerce(
        tokenFixture.token,
        id,
        reviewFixture.reviewDeletar.force
      ).then((response) => {
        expect(response.status).to.eq(statusFixture.ok);
        expect(response.body.product_id).to.eq(
          reviewFixture.reviewValido.product_id
        );
        expect(response.body.review).to.eq(reviewFixture.reviewValido.review);
        expect(response.body.reviewer).to.eq(
          reviewFixture.reviewValido.reviewer
        );
        expect(response.body.reviewer_email).to.eq(reviewer_email);
        expect(response.body.rating).to.eq(reviewFixture.reviewValido.rating);
        return reviewWooCommerceSchema.validateAsync(response.body);
      });
    });
  });
});
