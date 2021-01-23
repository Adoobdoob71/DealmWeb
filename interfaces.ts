import * as firebase from 'firebase';

interface User {
	userUID?: string;
	nickname?: string;
	profilePicture?: string;
	description?: string;
	email?: string;
	online?: boolean;
	lastOnline?: firebase.default.firestore.Timestamp;
}


interface Contact {
	userUID: string;
	roomID: string;
}

interface Post {
  userUID: string;
  title: string;
  body: string;
	imageUrl?: string;
	nickname: string;
	profilePicture?: string;
	time: firebase.default.firestore.Timestamp;
}

export type {
	User,
	Contact,
	Post
}