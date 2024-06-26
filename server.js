import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';
import { fastifyMysql} from '@fastify/mysql';
import fastifyFormbody from '@fastify/formbody';

const server = fastify()
const database = new DatabaseMemory();

server.register(fastifyMysql, {
    connectionString: 'mysql://root:Curitiba12345@127.0.0.1:3306/trabalho'
})

server.register(fastifyFormbody);

server.get('/messages/:id?', (req, reply) => {
    server.mysql.query(
      'SELECT id, userIdSend, userIdReceive, message FROM messages WHERE id=?', [req.params.id],
      function onResult (err, result) {
        reply.send(err || result)
      }
    )
  })

  server.post('/messages', (req, reply) => {
    const { userIdSend, userIdReceive, message } = req.body;

    server.mysql.query(
        'INSERT INTO messages (userIdSend, userIdReceive, message) VALUES (?, ?, ?)', [userIdSend, userIdReceive, message],
        function onResult(err, result) {
            reply.send(err || result);
        }
    );
});

server.post('/users', (req, resp) => {
    const user = response.body;
    const userId = database.create({
        name: 'Amanda',
        email: 'amanda@email.com',
        password: 123,
    });

    console.log(database.list());

    return reply.status(201).send({ userId });
})

server.get('/users/:id?', (req, resp) => {
    const id = req.params.id || req.query.id;
    if (id) {
        const user = database.find(id);
        if (user) {
            resp.send(user);
        } else {
            resp.status(404).send({ message: 'User not found' });
        }
    } else {
        resp.send(database.list());
    }
});

server.get('/node', () => {
    return 'Hello node.js'
})

server.listen({port: 3333}, error => {
        if (error) throw error
        console.debug(`Server listening to port: ${server.addresses()[0].port}`)
    }
)