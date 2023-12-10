import ClientOnly from "./components/ClientOnly";
import { Container } from "./components/Containter";
import EmpltyState from "./components/EmptyState";

export default function Home() {

  const listings = false;

  if (!listings) {
    return (
      <ClientOnly>
        <EmpltyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <Container>
      <div className="pt-48 
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
  
        pagesdfsdfsdfa
    </div>

    </Container>
  )
}
