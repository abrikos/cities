const app = require('./app');
const port = 3006;

app.listen(port, 'localhost',function (err) {
    if (err) {
        throw err
    }

    console.log(`server is listening on ${port}...`)
});
