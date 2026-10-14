import { Container, Section } from "@/components/ui";

export function Hero() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1>Hero Section</h1>
          <p className="mt-4 max-w-2xl">Add your hero content here.</p>
        </div>
      </Container>
    </Section>
  );
}
