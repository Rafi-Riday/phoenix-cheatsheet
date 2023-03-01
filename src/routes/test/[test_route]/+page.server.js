export const load = async ({ params, fetch }) => {
    const res = await fetch(`/${params.test_route}.json`);
    const mainData = await res.json();

    return { mainData }
};