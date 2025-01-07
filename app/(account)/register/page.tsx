import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <Card className="flex flex-col gap-8 py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-center leading-0">
            Faites vous un profil tout de même !
          </h1>

          <p className="text-muted-foreground text-center text-sm md:text-base">
            Créez votre compte gratuitement et profitez de toutes les fonctionnalités de notre site.
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardDescription>
              Tout d'abord enregistrez-vous avec une adresse email valide pour recevoir un code de vérification.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-row gap-2">
            <Input type="email" placeholder="Email" />
            <Button size={"sm"} type="submit">Envoyer</Button>
          </CardContent>
        </Card>
      </Card>
    </section>
  );
}

export default RegisterPage;