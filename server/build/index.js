"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
// Inicia el Servidor.
class Server {
    // Inicializa express. Ademas ejecuta config y routes.
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    // Metodo configuración de los parametros (Ej: Puerto).
    config() {
        // procces.env.PORT == Si existe un puerto en el sistema.
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
    }
    // Metodo para inicializar el servidor.
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on Port ', this.app.get('port'));
        });
    }
}
// Guardar los datos en un constante.
const server = new Server();
// Ejecuta la clase Server y su metodo start.
server.start();
