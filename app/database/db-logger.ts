/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class DbLogger {
	constructor() {
	}

	public static log(label: string, data?: any): void  {
		console.log(label, data);
	}

	public static error(label: string, error?: any): void  {
		console.error(label, error);
	}
}
