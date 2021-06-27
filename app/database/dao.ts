/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { RunResult }  from "sqlite3";
import { Database }   from "sqlite3";
import { dbFileName } from "./db-const";
import { DbLogger }   from "./db-logger";

const sqlite3 = require("sqlite3").verbose();

export class DAO {
	db: Database;
	lastID: number = -1;

	constructor(autoConnect: boolean = false) {
		if (autoConnect) {
			this.open(dbFileName);
		}
	}

	/**
	 * Open Database Connection
	 * @param {string} filename
	 */
	public open(filename?: string) {
		if (!filename) {
			filename = ':memory:';
		} else {
			filename = dbFileName;
		}

		DbLogger.log("Opening database ::", filename);

		this.db = new sqlite3.Database(filename, (err) => {
			if (err) {
				console.log('Error when creating the database', err)
			} else {
				console.log('Database created!');
			}
		});

		if (filename == ':memory:') {
			console.log('Connected to the in-memory SQlite database.');
		} else {
			console.log(`Connected to SQlite database "${filename}"`);
		}
	}

	/**
	 * Run SQL for UPDATE and INSERT
	 * @param {string} sql
	 * @param params
	 * @returns {Promise<RunResult>}
	 */
	public run(sql: string, params?): Promise<RunResult> {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, (res: RunResult, err: Error) => {
				if (err) {
					DbLogger.log("Error running sql", sql);
					DbLogger.error("Error", err);
					reject(err)
				} else {
					resolve(res)
				}
			});
		});
	}

	/**
	 * Run SELECT query for all rows in a set
	 * @param {string} sql
	 * @param params
	 * @returns {Promise<any>}
	 */
	public all(sql: string, params?): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err: Error, rows: any[]) => {
				if (!err) {
					resolve(rows);
				} else {
					reject(err);
				}
			});
		});
	}

	/**
	 * close the database connection
	 */
	public close() {
		this.db.close((err) => {
			if (err) {
				return console.error(err.message);
			}

			DbLogger.log("Close the database connection");
		});
	}
}
