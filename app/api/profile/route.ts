export const GET = async (req: Request) => {
    const userId = req.url.split("/").pop();

    if (!userId) {
        return new Response(JSON.stringify({ error: "User not logged in" }), {
            status: 401,
        });
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/daily-login/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch daily login data");
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error ) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}