type User = {
  email: string;
  password: string;
};

export async function LoginApi(user: User) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}auth/login/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user.email,
        password: user.password,
      }),
    }
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }

  const data = await response.json();

  return data;
}
