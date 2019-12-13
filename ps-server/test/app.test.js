const app = require("../app");
const supertest = require("supertest");
const { expect } = require("chai");
const playstore = require("../playstore-data");

describe("GET /apps endpoint", () => {
	it("should return all the apps", () => {
		return supertest(app).get("/app").then((res) => {
			expect(res.body).to.eql(playstore);
		});
	});

	it("should return an array with all apps", () => {
		return supertest(app).get("/apps").expect(200).expect("Content-Type", /json/).then((res) => {
			expect(res.body).to.be.an("array");
		});
	});

	it("should sort array by name of app", () => {
		return supertest(app)
			.get("/apps")
			.query({ sort: "app" })
			.expect(200)
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.body).to.be.an("array");
				let i = 0;
				let sorted = true;
				while (sorted && i < res.body.length - 1) {
					sorted = sorted && res.body[i].App.toLowerCase() < res.body[i + 1].App.toLowerCase();
					i++;
				}
				expect(sorted).to.be.true;
			});
	});
	it("should sort array by app rating", () => {
		return supertest(app)
			.get("/apps")
			.query({ sort: "rating" })
			.expect(200)
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.body).to.be.an("array");
				let i = 0;
				let sorted = true;
				while (sorted && i < res.body.length - 1) {
					sorted = res.body[i].Rating >= res.body[i + 1].Rating;
					i++;
				}
				expect(sorted).to.be.true;
			});
	});
});
