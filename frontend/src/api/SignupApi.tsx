type User = {
  email: string;
  password: string;
  password2: string;
};

export async function SignUpApi(user: User) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}auth/signup/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        password2: user.password2,
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
