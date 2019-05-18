import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
// Inicia el Servidor.
class Server {
    // Inicializa la APP que es tipo aplicación. Ademas se convierte en una variable publica.
    public app: Application;
    // Inicializa express. Ademas ejecuta config y routes.
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    // Metodo configuración de los parametros (Ej: Puerto).
    config(): void {
        // procces.env.PORT == Si existe un puerto en el sistema.
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/games', gamesRoutes);
    }
    // Metodo para inicializar el servidor.
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on Port ', this.app.get('port'));
        });
    }
}
// Guardar los datos en un constante.
const server = new Server();
// Ejecuta la clase Server y su metodo start.
server.start();