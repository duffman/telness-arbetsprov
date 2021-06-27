/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable } from "tsyringe";
import { DAO }        from "../../database/dao";

@injectable()
export class SubscriptionDB {
	constructor(private dao: DAO) {}

	public selectAll(tableName: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.dao.all(`SELECT * FROM ${tableName}`).then(res => {
				resolve
			})
		});
	}
}
