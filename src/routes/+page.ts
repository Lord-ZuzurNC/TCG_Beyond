import { redirect } from '@sveltejs/kit';

// AC-UI-05: the default route redirects to /explore.
export const load = () => {
	redirect(307, '/explore');
};
