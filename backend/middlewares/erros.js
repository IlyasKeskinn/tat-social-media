const express = require("express");
const logger = require("../helpers/logger");

module.exports = function (error, req, res, next) {
  if (error instanceof Error) {
    console.log(error);
    logger.error(error.message);
    res.status(500).json({ error: error });
  }
};
