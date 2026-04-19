const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
 
    if (err.code === 'P2002') {
    return res.status(409).json({ message: 'Cette valeur existe déjà (contrainte unique violée)' });
    }
    if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Enregistrement introuvable' });
    }
    if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
    }
 
    res.status(500).json({ message: 'Internal Server Error' });
};
 
export default errorHandler;
