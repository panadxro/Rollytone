const db = new PouchDB('albumsDB');

const nombreDB = 'albums';

const addFav = async (favorito) => {
    try {
        const res = await db.put(favorito);
        console.log('Favorito agregado', res);
        return res;
    } catch (error) {
        console.error('Error al guardar favorito', error);
        throw error;
    }
};


export { addFav };