// colocar query do MongoDB
use('Cookmaster');
db.getCollection('users').insertOne({
  name: 'admin',
  email: 'root@email.com',
  password: 'admin',
  role: 'admin',
});
