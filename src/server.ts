import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { IndexRoute } from "./routes/index";

/**
 * The Server 
 * 
 * @class Server
 */
export class Server {
  public app: express.Application;

  /**
   * Bootstrap the application
   * 
   * @class Server
   * @method bootstrap
   * @static
   * @return Returns the newly created injector for this app. Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor
   * 
   * @class Server
   * @method constructor
   */
  constructor() {
    // create express application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // add api
    this.api();
  }

  /**
   * Create REST Api routes
   * 
   * @class Server
   * @method api
   */
  public api() {

  }

  /**
   * Configure application
   * 
   * @class Server
   * @method config
   */
  public config() {
    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.set('trust proxy', true);
    // configure pug
    // this.app.set('views', path.join(__dirname, "views"));
    // this.app.set("view engine", "pug");

    // configure ejs
    this.app.engine('.ejs', require('ejs').__express);
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    // use logger middleware
    this.app.use(logger("dev"));

    // use json form parse middleware
    this.app.use(bodyParser.json());

    // use query string parser middleware
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    // use cookie parser middleware
    this.app.use(cookieParser("SECRET_TS_NODE_BLOG"));

    // use override middleware
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // use handling
    this.app.use(errorHandler());
  }

  /**
   * Create router
   * 
   * @class Server
   * @method router
   */
  public routes() {
    let router: express.Router;
    router = express.Router();

    // IndexRoute
    IndexRoute.create(router);

    // use router middleware
    this.app.use(router);
  }
}