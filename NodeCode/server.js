'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var express = require('express');
var app = express();

function book(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
}

Array.prototype.removeAt = function (index) {
    return !!this.splice(index, 1)
}

Array.prototype.removeItem = function (item) {
    let index = this.indexOf(item);
    if (index >= 0)
        return this.removeAt(index);

    return false;
}

let store = [
    new book(1, 'Ruby on rails', 'Clinton'),
    new book(2, 'The color of kinship', 'Kamal'),
    new book(3, 'TV at rest', 'Kofi'),
    new book(4, 'Monitor in power', 'Shuga'),
    new book(5, 'Green is green', 'Nana Darko'),
    new book(6, 'Boilers', 'Emmanuel'),

];

app.use(require('body-parser').json());

app.get('/', function (req, res) {
    res.send(store);
});

app.get('/:id', function (req, res) {
    res.send(store.find(function (s) { return s.id == req.params.id }));
});

app.post('/', function (req, res) {
    store.push(req.body);
    res.sendStatus(201);
});

app.delete('/:id', function (req, res) {
    store.removeAt(req.params.id)
    res.sendStatus(204);
});

app.listen(port, function () {
    console.log(`App started on port ${port}`)
});