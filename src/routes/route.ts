import { NextFunction, Request, Response } from "express";

/**
 * BaseRoute
 * 
 * @class BaseRoute
 */
export class BaseRoute {
  protected title: string;

  private scripts: string[];

  /**
   * Constructor
   * 
   * @class BaseRoute
   * @method constructor
   */
  constructor() {
    this.title = "TS Blog";
    this.scripts = [];
  }

  /**
   * Add a JS external file to the request
   * 
   * @class BaseRoute
   * @method addScript
   * @param src {string} The src to the external JS file
   * @return {BaseRoute} The self for chaining
   */
  public addScript(src: string): BaseRoute {
    this.scripts.push(src);
    return this;
  }

  public render(req: Request, res: Response, view: string, options?: Object) {
    // add constants
    res.locals.BASE_URL = "/";

    // add scripts 
    res.locals.scripts = this.scripts;

    // add title
    res.locals.title = this.title;

    res.render(view, options);
  }
}