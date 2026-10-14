import { Container, Section } from "@/components/ui";

export function Features() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Features Section
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Add your features content here.
          </p>
        </div>
      </Container>
    </Section>
  );
}
