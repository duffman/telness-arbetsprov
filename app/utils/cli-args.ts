/**
 * Copyright (C) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

const args = process.argv.slice(2);

export class CliArgs {

	public static haveArgs(): boolean {
		return args.length > 0;
	}

	public static compareParam(param1: string, param2: string, ignoreCase: boolean = true): boolean {
		param1 = param1 === undefined ? "" : param1;
		param2 = param2 === undefined ? "" : param2;

		if (ignoreCase) {
			param1 = param1.toLowerCase();
			param2 = param2.toLowerCase();
		}
		return (param1.localeCompare(param2) === 0);
	}

	public static getParamAt(index: number): string {
		if (index > -1 && index <= args.length) {
			return args[index];
		} else {
			return "";
		}
	}

	public static getFirst(): string {
		return CliArgs.getParamAt(0);
	}

	public static getParamByName(name: string): string {
		function splitArg(arg: string) {
			let result = arg.split('=');
		}

		for (let arg of args) {
			if (arg.indexOf('=') > 0) {
				let argPair = arg.split('=');
				let paramName = argPair[0];
				let paramVal = argPair[1];

				if (paramName === name) {
					return paramVal;
				}
			}
		}

		return undefined;
	}


	public static getSecond(): string {
		return CliArgs.getParamAt(1);
	}

	public static first(paramName: string, ignoreCase: boolean = true): boolean {
		let firstParam = CliArgs.getParamAt(0);
		return CliArgs.compareParam(CliArgs.getFirst(), paramName, ignoreCase);
	}

	public static second(paramName: string, ignoreCase: boolean = true): boolean {
		let firstParam = CliArgs.getParamAt(1);
		return CliArgs.compareParam(CliArgs.getFirst(), paramName, ignoreCase);
	}

	public static debug(): boolean {
		return CliArgs.getFirst() === "debug";
	}
}
