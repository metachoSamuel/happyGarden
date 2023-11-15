const handleHttpError = (
    res, error = 'Pailas', code = 403) => res.status(code).send({ error }
);

module.exports = {
    handleHttpError
}