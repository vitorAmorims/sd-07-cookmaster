// colocar query do MongoDB
const adminUser = {
  name: 'admin',
  email: 'root@email.com',
  password: 'admin',
  role: 'admin',
};

db.users.insertOne(adminUser);