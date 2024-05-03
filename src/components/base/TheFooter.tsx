import Link from "next/link";
import Container from "./Container";

export default function TheFooter() {
  return (
    <footer className="py-6">
      <Container className="flex gap-4 justify-between">
        <span>&#169; {new Date().getFullYear()} Rhythm Trails</span>

        <p>
          Made with ❤️ by{" "}
          <Link href="https://github.com/manuelmtzv">Manuel</Link>
        </p>
      </Container>
    </footer>
  );
}
