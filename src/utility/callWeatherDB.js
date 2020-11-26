async function callApi(city,days) {
        const res = await fetch(`${process.env.API_BASE}${process.env.API_KEY}${process.env.API_CITY}${city}${process.env.API_DAYS}${days}`);
        const p = await res.json();
        return p;
};

export { callApi };
