import { defineStore } from 'pinia';

import { ref } from 'vue'
const favsdb = new PouchDB('favsDB')
const vistosdb = new PouchDB('vistosDB')

export const useDBs = defineStore('dbs',{
    state: () => {
        return {
            favs: ref(null),
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
/*         async showData(tipo) {
            const type = tipo === 'favs' ? favsdb : vistosdb;
            try {
                const data = await type.allDocs({include_docs: true})
                this.favs = data.rows.map(row => row.doc)
            } catch {
                console.log(error)
            }
        } */
    }
});