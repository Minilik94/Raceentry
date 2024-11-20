export interface User {
	avatar: string;
	collectionId: string;
	collectionName: string;
	created: string;
	email: string;
	emailVisibility: boolean;
	id: string;
	licence_number: string;
	name: string;
	role: [Array<string>];
	updated: string;
	username: string;
	verified: boolean;
}

export interface Event {
	id: string;
	name: string;
	avatar: string;
	description: string;
	location: string;
	layout: string;
	date: string;
	cost: number;
	approx_number_of_cars: number;
	format: string;
	natsoft_timing: boolean;
	sessions: string;
	eligible_cars: string;
	second_driver_policy: string;
	passenger_policy: string;
	aasa_license: boolean;
	engine_requirement: boolean;
	additional_infos: string;
}
