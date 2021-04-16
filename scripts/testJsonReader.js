#!/usr/bin/env node

console.log('Test script starting.');
const [,, ...args] = process.argv;
const fetch = require('node-fetch');
const fs = require('fs');

const SOURCE = {
  url: 'url=',
  file: 'file='
}

if (args.length === 0) {
  console.log(`Error: Please provide a url with '${SOURCE.url}<full url>' or a file with '${SOURCE.file}<file path>'`);
} else {
  const source = args[0]
    if (source.includes(SOURCE.url)) {
        fetchFromUrl(source.replace(SOURCE.url, ''));
    } else if (source.includes(SOURCE.file)) {
        fetchFromFile(source.replace(SOURCE.file, ''));
    } else {
        console.log(`Error: unknown source type. Please use ${SOURCE.url} or ${SOURCE.file}`);
    }
    
}

function fetchFromUrl(url) {
    if (url && url.length > 0) {
        return fetch(url)
          .then(response => response.json())
          .then(json => {
              console.log(`url response = ` + JSON.stringify(json));
              return 0;
          })
          .catch(error => {
            console.log(`Error fetching from url: ${error}`);
            return 1;
          })
    } else {
        console.log('Error: Url is null or empty');
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
                } catch(error) {
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