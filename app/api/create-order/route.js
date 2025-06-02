export async function POST(request) {
  return new Response(JSON.stringify({ message: "Order created" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
