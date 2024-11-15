// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import Pocketbase from 'pocketbase';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase;
			user: Pocketbase.RecordModel;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		namespace Superforms {
			type Message = {
				type: 'error' | 'success';
				text: string;
			};
		}
	}
}

export {};
