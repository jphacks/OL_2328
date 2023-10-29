import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load: LayoutLoad = async ({ url }) => {
    return {
        url: url.pathname,
    };
};