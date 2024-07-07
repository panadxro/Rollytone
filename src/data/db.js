import { defineStore } from 'pinia';

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
            await type.put(dato);
            this.showData(tipo);
        },
        async showData(tipo) {
            const type = tipo === 'favs' ? favsdb : vistosdb;
            const data = await type.allDocs({ include_docs: true });
            this[tipo] = data.rows.map(row => row.doc);
        },
        async deleteData(id, tipo) {
            const type = tipo === 'favs' ? favsdb : vistosdb;
            const doc = await type.get(id);
            await type.remove(doc);
            this.showData(tipo);
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