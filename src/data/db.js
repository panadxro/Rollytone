import { defineStore } from 'pinia';

import { ref } from 'vue'
const favsdb = new PouchDB('favsDB')
const vistosdb = new PouchDB('vistosDB')

export const useDBs = defineStore('dbs',{
    state: () => {
        return {
            favs: ref([]),
            vistos: []
        };
      },  
    actions: {
        async addData(album, tipo) {
            const dato = {
                _id: album.id,
                title: album.title,
                artist: album.artist,
                year: album.year,
                cover: album.cover
            }
            const type = tipo === 'favs' ? favsdb : vistosdb;
            try {
                type.put(dato)
                .then(console.log('Insertado'))
            } catch {
                console.log(error)
            }
        },
        async showData(tipo) {
            const type = tipo === 'favs' ? favsdb : vistosdb;
            type.allDocs({include_docs: true}).then(data => {
                this[tipo] = data.rows.map(row => row.doc)
            })
        },
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