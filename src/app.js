import pug from 'pug';
import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  const data = pug.renderFile('src/components/home.pug', {
    title_application: 'Tienda Sports',
    title_header: 'SPORTS STORE',
    description_header: 'Tienda Web',
    categories: ['EQUIPACION', 'MODA', 'ACCESORIOS', 'OFERTAS'],
    image_categories: [
      './assets/moda.png',
      './assets/maquina.png',
      './assets/moda.png',
      './assets/maquina.png',
    ],
  });

  res.send(data);
});

app.listen(3000, function () {
  console.log(`Tienda Web Sport url => http://localhost:3000`);
});
