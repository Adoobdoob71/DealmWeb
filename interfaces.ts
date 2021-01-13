import * as firebase from 'firebase';

interface User {
	userUID: string;
	nickname: string;
	profilePicture?: string;
	description?: string;
	email: string;
	online: boolean;
	lastOnline?: firebase.default.firestore.Timestamp;
}

export type {
	User
}