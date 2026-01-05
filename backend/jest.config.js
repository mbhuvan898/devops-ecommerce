module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],

  // 👇 IMPORTANT: ignore legacy & external-heavy code
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/backend/controllers/",
    "/backend/models/",
    "/backend/routes/",
    "/backend/utils/",
    "/backend/middlewares/"
  ],

  coverageThreshold: {
    global: {
      statements: 70,
      lines: 70
    }
  }
};
