import { Container, Section } from "@/components/ui";

export function Hero() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Hero Section
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Add your hero content here.
          </p>
        </div>
      </Container>
    </Section>
  );
}
