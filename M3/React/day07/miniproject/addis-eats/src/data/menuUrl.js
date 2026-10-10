// ABSOLUTE url on purpose. A relative "menu.json" would resolve against the
// current route: on /menu/5 it would request /menu/menu.json and break on a cold load.
export const MENU_URL = `${import.meta.env.BASE_URL}menu.json`;
