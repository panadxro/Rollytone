import { defineStore } from 'pinia';

// import { ref } from 'vue'
// const PouchDB = require('pouchdb');
const favsdb = new PouchDB('favsDB')
const vistosdb = new PouchDB('vistosDB')

export const useDBs = defineStore('dbs',{
    state: () => {
        return {
            favs: [],
            vistos: []
        };
      },  
    actions: {
        async addData(album, tipo) {
            const dato = {
                _id: album.id,
                id: album.id,
                title: album.title,
                artist: album.artist,
                year: album.year,
                cover: album.cover,
                isFav: album.esFavorito
            }
            const type = tipo === 'favs' ? favsdb : vistosdb;
            type.put(dato)
        },
        async showData(tipo) {
            const type = tipo === 'favs' ? favsdb : vistosdb;
            type.allDocs({include_docs: true}).then(data => {
                this[tipo] = data.rows.map(row => row.doc)
            })
        },
        async deleteData(id, tipo) {
            const type = tipo === 'favs' ? favsdb : vistosdb;
            type.get(id)
            .then(doc => {
                type.remove(doc)
            })
        },
/*         updateButton(id, event) {
            console.log(id, event);
            favsdb.get(id).then(doc => {
                doc.isFav = true;
                favsdb.put(doc);
            }); 
        },
        */
        setUpListeners(tipo) {
            const type = tipo === 'favs' ? favsdb : vistosdb;
            type.changes({
                since: 'now',
                live: true
              }).on('change', () => {
                this.showData(tipo);
              });
        }
    }
});