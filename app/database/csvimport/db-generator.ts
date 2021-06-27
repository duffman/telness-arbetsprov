/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CreateTables } from "../create-tables";
import { DAO }          from "../dao";
import { DbLogger }          from "../db-logger";
import { ISubscriptionData } from "../db-types";

export class DbGenerator {
	dao = new DAO(true);

	constructor() {
	}

	public addEntry(entry: ISubscriptionData) {
		const SQL_TEMPLATE =
				  `INSERT INTO subscriptions (
				msisdn,
				activate_at,
				type,
				status,
				grade,
				reserved_at,
				expires_at,
				operator
			) VALUES (
				"_MSISDN_",
				"_ACTIVATE_AT_",
				"_TYPE_",
				"_STATUS_",
				_GRADE_,
				"_RESERVED_AT",
				"_EXPIRES_AT_",
				"_OPERATOR_"
			)`;

		function val(value?: string): string {
			let result = "";

			if (value) {
				result = value;
			}

			return value;
		}

		let sql = SQL_TEMPLATE.replace("_MSISDN_", val(entry.msisdn));
		sql     = sql.replace("_ACTIVATE_AT_", val(entry.activate_at));
		sql     = sql.replace("_TYPE_", val(entry.type));
		sql     = sql.replace("_STATUS_", val(entry.status));
		sql     = sql.replace("_GRADE_", val(entry.grade));
		sql     = sql.replace("_RESERVED_AT", val(entry.reserved_at));
		sql     = sql.replace("_EXPIRES_AT_", val(entry.expires_at));
		sql     = sql.replace("_OPERATOR_", val(entry.operator));

		DbLogger.log("SQL ENTRY ::", sql);
	}

	public async importDBEntries(entries: Array<ISubscriptionData>): Promise<void> {
		DbLogger.log("importDBEntries");

		let createDB = new CreateTables(this.dao);
		let res      = await createDB.createTables();

		DbLogger.log("createDB :: res ::", res);

		for (let entry of entries) {
			console.log("Entry ::", entry);
			this.addEntry(entry);
			break;
		}
	}
}
