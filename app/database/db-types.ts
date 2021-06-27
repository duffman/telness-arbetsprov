/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface ISubscriptionData {
	msisdn?:      string;
	activate_at?: string;
	type?:        string;
	status?:      string;
	grade?:       string;
	reserved_at?: string;
	expires_at?:  string;
	operator?:    string;
}
