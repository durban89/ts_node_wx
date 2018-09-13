import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

/**
 * IndexRoute
 * 
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {
  /**
   * Constructor
   * 
   * @class IndexRoute
   * @method constructor
   */
  constructor() {
    super();
  }

  /**
   * Create the router
   * 
   * @class IndexRoute
   * @method create
   * @static
   * @param router 
   */
  public static create(router: Router) {
    console.log("[IndexRoute::create] Creating index route");
    
    // add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    })
  }

  /**
   * The home page route
   * 
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request Object.
   * @param res {Response} The express Response Object.
   * @param next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    // set custom title
    this.title = "Home | TS Blog";

    let options: Object = {
      "message": "Welcome to the TS Blog",
    };

    // render template
    this.render(req, res, "index", options);
  }
}