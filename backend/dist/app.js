"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
var express_1 = __importDefault(require("express"));
// APP SETUP
var app = (0, express_1.default)(), port = process.env.PORT || 3000;
// MIDDLEWARE
app.use(express_1.default.json()); // for parsing application/json
// ROUTES
app.get("/", function (request, response) {
    response.send("Welcome, just know: you matter!");
});
// APP START
app.listen(port, function () {
    console.info("\nServer \uD83D\uDC7E \nListening on http://localhost:" + port + "/");
});
