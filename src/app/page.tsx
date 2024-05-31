export default async function Home() {
  async function getData() {
    const response = await (
      await fetch("http://localhost:3000/api/script", {
        method: "POST",
      })
    ).json();

    return response;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Swagger JSON</h1>
      {await getData()}
    </main>
  );
}
