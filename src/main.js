import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;

export function isAppearanceCompleted(appearance) {
	if (appearance.head === undefined) return false;
	if (appearance.clarity === undefined) return false;
	if (appearance.hue === undefined) return false;
	if (appearance.retention === undefined) return false;
	if (appearance.texture === undefined) return false;
	if (appearance.legs === undefined) return false;
	if (appearance.laces === undefined) return false;
	return true;
}
