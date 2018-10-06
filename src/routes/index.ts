import { NextFunction, Request, Response, Router } from "express";
import * as request from "request";
import sha1 = require("sha1");
import querystring = require('querystring');
import { BaseRoute } from "./route";
import { config, IConfig } from '../config';

class WXToken {
  public token: string;
  constructor(token: string) {
    this.token = token;
  }
}

class WXTicket {
  public ticket: string;
  constructor(ticket: string) {
    this.ticket = ticket;
  }
}

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
  public async index(req: Request, res: Response, next: NextFunction) {
    // set custom title
    this.title = "Home | TS Blog";

    const testUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(testUrl);
    const url = 'https://www.xiaorongmao.com/test/wx/';

    const tokenRes = await this.getWXToken();
    const token = tokenRes.token || '';
    const ticketRes = await this.getWXTicket(token);
    const ticket = ticketRes.ticket || '';
    const timestamp = `${parseInt(new Date().getTime() / 1000 + '', 10)}`;

    // const signatureParamsObj = {
    //   'jsapi_ticket': ticket,
    //   noncestr: config.nonceStr,
    //   timestamp,
    //   url,
    // };

    // console.log(this.ksort(signatureParamsObj));
    // const signatureParams = querystring.stringify(this.ksort(signatureParamsObj));
    // console.log('signatureParams = ', signatureParams);
    const params = 'jsapi_ticket=' + ticket + '&noncestr=' + config.nonceStr + '&timestamp=' + timestamp + '&url=' + url;
    const signature = sha1(params).toString();


    let options: Object = {
      title: 'Home | TS Blog',
      message: 'Welcome to the TS Blog',
      appId: config.appId,
      timestamp,
      nonceStr: config.nonceStr,
      signature,
    };


    this.render(req, res, "index", options);
  }

  private getWXTicket(token: string): Promise<WXTicket> {
    return new Promise((resolve, reject) => {
      request.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`, (err, res, body) => {
        if (err) {
          return reject(err);
        }

        const ticket = JSON.parse(body).ticket || '';
        return resolve(new WXTicket(ticket));
      })
    });
  }

  private getWXToken(): Promise<WXToken> {
    return new Promise((resolve, reject) => {
      request.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`, (err, res, body) => {
        if (err) {
          return reject(err);
        }

        const token = JSON.parse(body).access_token || '';
        return resolve(new WXToken(token));
      });
    });
  }

  private ksort(obj) {
    const keys = Object.keys(obj).sort();
    const sortedObj = {};

    for (var i in keys) {
      sortedObj[keys[i]] = obj[keys[i]];
    }

    return sortedObj;
  }
}