#!/usr/bin/env node

console.log("Test script starting.");
const [, , ...args] = process.argv;
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const SOURCE = {
  url: "url=",
  file: "file=",
};

const USAGE_MESSAGES = {
  url: `node ${path.basename(__filename)} ${SOURCE.url}<full url>`,
  file: `node ${path.basename(__filename)} ${SOURCE.file}<file path>`,
}
const GENERAL_USAGE_MESSAGE = `Usage: '${USAGE_MESSAGES.url}' or '${USAGE_MESSAGES.file}'`;

if (args.length === 0) {
  console.log(
    `Error: No source specified. ${GENERAL_USAGE_MESSAGE}`
  );
} else {
  const source = args[0];
  if (source.includes(SOURCE.url)) {
    fetchFromUrl(source.replace(SOURCE.url, ""));
  } else if (source.includes(SOURCE.file)) {
    fetchFromFile(source.replace(SOURCE.file, ""));
  } else {
    console.log(
      `Error: unknown source type. ${GENERAL_USAGE_MESSAGE}`
    );
  }
}

function fetchFromUrl(url) {
  if (url && url.length > 0) {
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(`url response = ` + JSON.stringify(json));
        return 0;
      })
      .catch((error) => {
        console.log(`Error fetching from url: ${error}`);
        return 1;
      });
  } else {
    console.log("Error: Url is null or empty");
    return 1;
  }
}

function fetchFromFile(file) {
  if (file && file.length > 0) {
    fs.readFile(file, (error, data) => {
      if (error) {
        console.log(`Error reading file: ${error}`);
        return 1;
      } else {
        try {
          let json = JSON.parse(data);
          console.log(`file content = ` + JSON.stringify(json));
          return 0;
        } catch (error) {
          console.log(`Error parsing json from file: ${error}`);
          return 1;
        }
      }
    });
  } else {
    console.log(`Error: file path is null or empty`);
    return 1;
  }
}
