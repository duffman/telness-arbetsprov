/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Express }         from "express";
import { Server }          from "net";
import { injectable }      from "tsyringe";
import { AppConfig }       from "./app-config";
import { config }          from "./app-config";
import { AppConst }        from "./app-const";
import { IActionResult }   from "./core/action-result";
import { DAO }             from "./database/dao";
import { Router }          from "express";
import { LogService }      from "./services/log.service";
import { RegistryService } from "./services/registry.service";
import { Logger }          from "./utils/logger";
import * as bodyParser     from "body-parser";
import * as cors           from "cors";
import * as expressSession from "express-session";
import * as express        from "express";

export interface IWebSessionCookie {
	maxAge: number;
	expires: Date;
}

export interface IWebSession {
	secret: string,
	cookie: IWebSessionCookie,
	saveUninitialized: boolean;
	resave: boolean;
}

@injectable()
export class WebServer {
	app: Express; //express.Application;
	server: Server;
	webRoutes: Router = Router();

	public static getFullIdent(): string {
		return AppConst.Info.SERVER_NAME
			   + "\n" + "Web Server version: "
			   + AppConst.Info.SERVER_VERSION
			   + "\n\n"
			   + AppConst.Info.PRODUCT_NAME
			   + "\n"
			   + AppConst.Info.PRODUCT_DESC;
	}

	constructor(
		private database?: DAO,
		private registry?: RegistryService,
		private logService?: LogService
	) {
		this.initWebServer();
	}

	public configureSession(): IWebSession {
		let expDate = new Date(Date.now() + 9000000);

		return {
			secret:            config.get("webServer.sessionCookieKey"),
			cookie:            {
				maxAge:  18000 * 10000,
				expires: expDate
			},
			saveUninitialized: true, // <- Create new session even if the request does not "touch" the session
			resave:            true  // <- Update the session even if the request does not "touch" the session
		}
	}

	public initWebServer(): void {
		let scope = this;

		this.app = express();

		let listenHost = "0.0.0.0";
		let listenPort = 6550;

		this.webRoutes.use(
			expressSession(sessionSettings)
		);

		let corsOptions = {
			credentials: "", //config.webServer.cors.credentials,
			origin:      "*" //config.webServer.cors.origin
		};

		this.app.use(cors(corsOptions));
		this.webRoutes.use(bodyParser.json());
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));

		this.webRoutes.all('*', (req: any, resp: any, next: any) => {
			//this.logService.logCyan('Request With Session ID ::', req.session.id);

			// IMPORTANT!
			// Setting a property will automatically cause a Set-Cookie response,
			// so touch the header so the session cookie will be set on the client
			//
			const PROP_HEADER = "X-Igniter";

			if (req.session.touched) {
				resp.setHeader(PROP_HEADER, true);

			}
			else {
				req.session.touched = true;
				resp.setHeader(PROP_HEADER, false);
			}

			next();
		});

		this.app.use(this.webRoutes);

		this.registry.init(this.webRoutes, this.app);

		try {
			this.server = this.app.listen(listenPort, listenHost, () => {
				Logger.logPurple("Web Webserver is listening on port ::", listenPort);
			});
		}
		catch (err) {
			Logger.logError('App Listen :: error ::', err);
		}
	}
}
