import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-4">
      <Card>
        <CardHeader className="items-center">
          <CardTitle>
            Join the community!
          </CardTitle>

          <CardDescription className="text-sm text-center w-[85%]">
            Our community is growing, and we would love for you to be a part of it. Please fill out the form below to register.
          </CardDescription>

          <CardContent className="flex justify-center">
            <form action="/api/register" method="POST">
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <button type="submit">Register</button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </section>
  );
}

export default RegisterPage;