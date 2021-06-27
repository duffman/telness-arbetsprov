/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * nauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Logger }            from "../../utils/logger";
import { DbGenerator }       from "./db-generator";
import { ISubscriptionData } from "../db-types";
import * as path             from "path";

const csv = require("csvtojson");

export default class CsvImporter {
	constructor() {
		Logger.logYellow("CSV Importer");
	}

	/**
	 * Parse CSV file and initialize DB Import
	 * @returns {Promise<void>}
	 */
	async import(csvFilename?: string): Promise<void> {
		if (!csvFilename) {
			csvFilename = path.resolve(process.cwd(), "numbers.csv");
		}

		csv().fromFile(csvFilename).then((jsonObj) => {
			this.importCSVFile(jsonObj);
		});
	}

	/**
	 * Generate Insert SQL Statements from JSON Object
	 * @param {ISubscriptionData} data
	 */
	async importCSVFile(data: ISubscriptionData): Promise<void> {
		let values    = Object.values(data);
		let dbEntries = new Array<ISubscriptionData>();

		for (let entry of values) {
			dbEntries.push(entry);
		}

		let generator = new DbGenerator();
		generator.importDBEntries(dbEntries);
	}
}

let importer = new CsvImporter();
importer.import();
