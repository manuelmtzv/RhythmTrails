import Container from "@/components/base/Container";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <Container>
      <h1 className="text-xl font-bold mb-4">Welcome to Rythm Trails!</h1>
      <LoginButton />
    </Container>
  );
}
