/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { DAO }      from "./dao";
import { DbLogger } from "./db-logger";

const sqlite3 = require("sqlite3").verbose();

export default class CreateTables {

	constructor(private dao?: DAO) {
		if (!dao) {
			dao = new DAO();
		}
	}

	public createTables(): Promise<void> {
		let sql = `CREATE TABLE IF NOT EXISTS subscriptions (
						id INTEGER AUTO INCREMENT PRIMARY KEY,
						msisdn TEXT,
						activate_at TEXT,
						type TEXT,
						status TEXT,
						grade TEXT,
						reserved_at TEXT,
						expires_at TEXT,
						operator TEXT
					)`;

		return new Promise((resolve, reject) => {
			this.dao.run(sql).then(res => {
				DbLogger.log("createTables ::", res);
				resolve(res);
			}).catch(err => {
				DbLogger.error("createTables ERROR ::", err);
				reject(err);
			});
		});
	}
}
