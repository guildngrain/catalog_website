import { Container, Section } from "@/components/ui";

export function Features() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2>Features Section</h2>
          <p className="mt-4 max-w-2xl">Add your features content here.</p>
        </div>
      </Container>
    </Section>
  );
}
